import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons/Icons";

function PaginationComponent({ defaultCurrent, total }) {
    const [currentPage, setCurrentPage] = useState(defaultCurrent);

    const totalPageArray = [];
    for (let i = 1; i <= total; i++) {
        totalPageArray.push(i);
    }

    return (
        <div className="flex gap-1 justify-center">
            <button className="px-4 py-3 hover:bg-[#F3F4F6] rounded-md bg-white">
                <ArrowLeftIcon />
            </button>
            {totalPageArray.length < 6 &&
                totalPageArray.map((item) => {
                    return (
                        <button
                            className={`px-4 py-3 hover:bg-[#F3F4F6] rounded-md ${
                                item === currentPage
                                    ? "bg-[#F3F4F6]"
                                    : "bg-white"
                            }`}>
                            {item}
                        </button>
                    );
                })}

            {totalPageArray.length > 5 &&
                totalPageArray.map((item, index) => {
                    if (currentPage === 1 && item < 4) {
                        return (
                            <button
                                key={index}
                                className={`px-4 py-3 hover:bg-[#F3F4F6] rounded-md bg-white ${
                                    item === currentPage
                                        ? "border-3"
                                        : "border-0"
                                }`}>
                                {item}
                            </button>
                        );
                    } else {
                        return <></>;
                    }
                })}

            {totalPageArray.length > 5 && (
                <button className="px-4 py-3 bg-white rounded-md ">...</button>
            )}

            {totalPageArray.length > 5 && (
                <button className="px-4 py-3 hover:bg-[#F3F4F6] bg-white rounded-md ">
                    {total}
                </button>
            )}

            <button className="px-4 py-3 hover:bg-[#F3F4F6] rounded-md bg-white">
                <ArrowRightIcon />
            </button>
        </div>
    );
}

export default PaginationComponent;
