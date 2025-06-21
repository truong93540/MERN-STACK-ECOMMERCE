import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Loading from "../Loading/Loading";

const TableComponent = (props) => {
    const {
        data = [],
        columns = [],
        onRowSelect,
        searchText = "",
        searchColumn = "name",
        onSearchTextChange = () => {},
        onSearchColumnChange = () => {},
        handleDeleteMany = () => {},
        isLoading,
    } = props;
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });
    const [filters, setFilters] = useState({});
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    let filteredData = data.filter((item) =>
        item[searchColumn]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    filteredData = filteredData.filter((record) =>
        columns.every((col) => {
            if (!col.filters || !col.onFilter) return true;
            const filterValue = filters[col.dataIndex];
            if (!filterValue) return true;
            return col.onFilter(filterValue, record);
        })
    );

    const handleSort = (dataIndex, sorter) => {
        if (!sorter) return;
        setSortConfig((prev) => {
            if (prev.key === dataIndex) {
                if (prev.direction === "asc")
                    return { key: dataIndex, direction: "desc" };
                if (prev.direction === "desc")
                    return { key: null, direction: null };
            }
            return { key: dataIndex, direction: "asc" };
        });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key || !sortConfig.direction) return filteredData;
        const column = columns.find((col) => col.dataIndex === sortConfig.key);
        if (!column || !column.sorter) return filteredData;
        const sorted = [...filteredData].sort(column.sorter);
        console.log("columns", columns);
        return sortConfig.direction === "asc" ? sorted : sorted.reverse();
    }, [filteredData, columns, sortConfig]);

    console.log("sortedData", sortedData);

    const handleRowSelected = (id) => {
        console.log("rowSelected", id);
        onRowSelect(id);
    };

    const handleCheckboxChange = (id) => {
        setRowSelectedKeys((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = sortedData.map((item) => item._id || item.id);
            setRowSelectedKeys(allIds);
        } else {
            setRowSelectedKeys([]);
        }
    };

    React.useEffect(() => {
        if (props.onSelectChange) {
            props.onSelectChange(rowSelectedKeys);
        }
    }, [rowSelectedKeys, props]);

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    const exportToExcel = () => {
        const exportData = sortedData.map((item) => {
            const row = {};
            columns.forEach((col) => {
                if (col.dataIndex !== "action" && col.dataIndex !== "Action") {
                    row[col.title] = item[col.dataIndex];
                }
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        saveAs(blob, "table-data.xlsx");
    };

    return (
        <>
            {/* Search box */}
            <div className="mb-2 flex items-center gap-2">
                <span>Search by: </span>
                <select
                    className="border px-2 py-2 rounded cursor-pointer"
                    value={searchColumn}
                    onChange={(e) => onSearchColumnChange(e.target.value)}>
                    {columns
                        .filter(
                            (col) =>
                                col.dataIndex !== "action" &&
                                col.dataIndex !== "Action"
                        )
                        .map((col) => (
                            <option
                                key={col.dataIndex}
                                value={col.dataIndex}
                                className="cursor-pointer ">
                                {col.title}
                            </option>
                        ))}
                </select>
                <input
                    type="text"
                    className="border px-3 py-2 rounded w-64 focus:outline-none"
                    placeholder={`Search by ${searchColumn}...`}
                    value={searchText}
                    onChange={(e) => onSearchTextChange(e.target.value)}
                />
            </div>

            {/* Filter cho từng cột */}
            <div className="flex justify-between items-center">
                <div className="mb-2 flex items-center gap-2">
                    {columns.map(
                        (col) =>
                            col.filters && (
                                <div key={col.dataIndex}>
                                    <span>Filter by: </span>
                                    <select
                                        key={col.dataIndex}
                                        className="border px-2 py-2 rounded cursor-pointer"
                                        value={filters[col.dataIndex] || ""}
                                        onChange={(e) =>
                                            setFilters((f) => ({
                                                ...f,
                                                [col.dataIndex]:
                                                    e.target.value || undefined,
                                            }))
                                        }>
                                        <option value="">
                                            All {col.title}
                                        </option>
                                        {col.filters.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}>
                                                {opt.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )
                    )}
                </div>
                <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={exportToExcel}>
                    Export Excel
                </button>
            </div>

            {/* Table */}
            <div>
                {rowSelectedKeys.length > 0 && (
                    <button
                        className="mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={handleDeleteAll}>
                        Xóa tất cả
                    </button>
                )}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Loading spinning={isLoading} tip="Đang tải...">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
                                                checked={
                                                    sortedData.length > 0 &&
                                                    rowSelectedKeys.length ===
                                                        sortedData.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                            <label
                                                htmlFor="checkbox-all-search"
                                                className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    {columns.map((column) => (
                                        <th
                                            key={column.dataIndex}
                                            scope="col"
                                            className="px-6 py-3 select-none hover:bg-gray-100"
                                            onClick={() =>
                                                handleSort(
                                                    column.dataIndex,
                                                    column.sorter
                                                )
                                            }>
                                            <span className="flex items-center gap-1 ">
                                                {column.title}
                                                {column.sorter && (
                                                    <div className="cursor-pointer p-3 hover:text-blue-600">
                                                        {sortConfig.key ===
                                                            column.dataIndex &&
                                                            sortConfig.direction ===
                                                                "asc" && (
                                                                <AiFillCaretDown />
                                                            )}
                                                        {sortConfig.key ===
                                                            column.dataIndex &&
                                                            sortConfig.direction ===
                                                                "desc" && (
                                                                <AiFillCaretUp />
                                                            )}
                                                        {sortConfig.key !==
                                                            column.dataIndex && (
                                                            <span className="opacity-30">
                                                                <AiFillCaretDown />
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {sortedData.map((item, rowIndex) => (
                                    <tr
                                        key={item._id || item.id || rowIndex}
                                        className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-2"
                                                    type="checkbox"
                                                    checked={rowSelectedKeys.includes(
                                                        item._id || item.id
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            item._id || item.id
                                                        )
                                                    }
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2 "
                                                />
                                                <label
                                                    htmlFor="checkbox-table-search-2"
                                                    className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        {columns.map((col) => (
                                            <td
                                                key={`${col.dataIndex}-${
                                                    item._id ||
                                                    item.id ||
                                                    rowIndex
                                                }`}
                                                className="px-6 py-4"
                                                onClick={() =>
                                                    handleRowSelected(item._id)
                                                }>
                                                {item[col.dataIndex]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Loading>
                </div>
                <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 ">
                            1-10
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 ">
                            1000
                        </span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg  hover:text-gray-700 ">
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                                4
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                                5
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* <Table
                rowSelection={Object.assign(
                    { type: selectionType },
                    rowSelection
                )}
                columns={columns}
                dataSource={data}
            /> */}
            </div>
        </>
    );
};

export default TableComponent;
