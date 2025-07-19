import { AiOutlineDelete, AiOutlineForm, AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../util'
import * as ProductServices from '../../services/ProductServices'
import useMutationHook from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../Loading/Loading'
import PaginationComponent from '../PaginationComponent/PaginationComponent'

const AdminProduct = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [rowSelected, setRowSelected] = useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [shouldRenderModal, setShouldRenderModal] = useState(false)
    const [isLoadingOpenDrawerUpdate, setIsLoadingOpenDrawerUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchColumn, setSearchColumn] = useState('name')
    const [typeProducts, setTypeProducts] = useState([])
    const [typeSelect, setTypeSelect] = useState('')
    const [typeSelectDetail, setTypeSelectDetail] = useState('')
    const [pageCurrent, setPageCurrent] = useState(1)
    const limitOnePage = 10
    const user = useSelector((state) => state.user)
    const queryClient = useQueryClient()
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        discount: '',
    })

    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        discoutn: '',
    })

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const mutation = useMutationHook((data) => {
        const { name, price, description, rating, image, type, countInStock, discount } = data

        return ProductServices.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount,
        })
    })

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data

        return ProductServices.updateProduct(id, token, rest)
    })

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data
        return ProductServices.deleteProduct(id, token)
    })

    const mutationDeletedMany = useMutationHook((data) => {
        const { token, ...ids } = data
        return ProductServices.deleteManyProduct(ids, token)
    })

    const getAllProduct = async (search, limit, page) => {
        const response = await ProductServices.getAllProduct(search, limit, page)
        return response
    }

    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({
            ids: ids,
            token: user.access_token,
        })
    }

    // get type product
    // ----
    const fetchAllTypeProduct = async () => {
        const res = await ProductServices.getAllType()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
        return res
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    // ---

    const { data, isPending, isSuccess, isError } = mutation
    const {
        data: dataUpdated,
        isPending: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate
    const {
        data: dataDeletedMany,
        isPending: isLoadingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany
    const {
        data: dataDeleted,
        isPending: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted

    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products', pageCurrent],
        queryFn: () => getAllProduct('', limitOnePage, pageCurrent - 1),
        refetchOnWindowFocus: false,
    })

    const handleOk = (e) => {
        e.preventDefault()
        mutation.mutate(stateProduct)
    }
    const handleCancel = () => {
        setIsModelOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        })
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        })
    }

    const handleOnChangeName = (e) => {
        setStateProduct({
            ...stateProduct,
            name: e.target.value,
        })
    }
    const handleOnChangeType = (e) => {
        const value = e.target.value

        if (value === 'add_type') {
            setTypeSelect('add_type') // hiển thị ô input
            setStateProduct((prev) => ({
                ...prev,
                type: '', // hoặc giữ nguyên nếu bạn muốn
            }))
        } else {
            setTypeSelect('') // ẩn ô input
            setStateProduct((prev) => ({
                ...prev,
                type: value,
            }))
        }
    }
    const handleOnChangeNewType = (e) => {
        const value = e.target.value
        setStateProduct((prev) => ({
            ...prev,
            type: value,
        }))
    }
    const handleOnChangePrice = (e) => {
        setStateProduct({
            ...stateProduct,
            price: e.target.value,
        })
    }
    const handleOnChangeDescription = (e) => {
        setStateProduct({
            ...stateProduct,
            description: e.target.value,
        })
    }
    const handleOnChangeCountInStock = (e) => {
        setStateProduct({
            ...stateProduct,
            countInStock: e.target.value,
        })
    }
    const handleOnChangeImage = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const base64 = await getBase64(file)
            setStateProduct({
                ...stateProduct,
                image: base64,
            })
        }
    }
    const handleOnChangeRating = (e) => {
        setStateProduct({
            ...stateProduct,
            rating: e.target.value,
        })
    }

    const handleOnChangeDiscount = (e) => {
        setStateProduct({
            ...stateProduct,
            discount: e.target.value,
        })
    }

    const handleOnChangeNameDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            name: e.target.value,
        })
    }
    const handleOnChangeTypeDetails = (e) => {
        const value = e.target.value

        if (value === 'add_type') {
            setTypeSelectDetail('add_type') // hiển thị ô input
            setStateProductDetails((prev) => ({
                ...prev,
                type: '', // hoặc giữ nguyên nếu bạn muốn
            }))
        } else {
            setTypeSelectDetail('') // ẩn ô input
            setStateProductDetails((prev) => ({
                ...prev,
                type: value,
            }))
        }
    }
    const handleOnChangeNewTypeDetail = (e) => {
        const value = e.target.value
        setStateProductDetails((prev) => ({
            ...prev,
            type: value,
        }))
    }
    const handleOnChangePriceDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            price: e.target.value,
        })
    }
    const handleOnChangeDescriptionDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            description: e.target.value,
        })
    }
    const handleOnChangeCountInStockDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            countInStock: e.target.value,
        })
    }
    const handleOnChangeImageDetails = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const base64 = await getBase64(file)
            setStateProductDetails({
                ...stateProductDetails,
                image: base64,
            })
        }
    }
    const handleOnChangeRatingDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            rating: e.target.value,
        })
    }

    const handleOnChangeDiscountDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            discount: e.target.value,
        })
    }

    const fetchGetProductDetails = async (id) => {
        setIsLoadingOpenDrawerUpdate(true)
        const res = await ProductServices.getDetailProduct(id)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data.name,
                price: res?.data.price,
                description: res?.data.description,
                rating: res?.data.rating,
                image: res?.data.image,
                type: res?.data.type,
                countInStock: res?.data.countInStock,
                discount: res?.data.discount,
            })
        }
        setIsLoadingOpenDrawerUpdate(false)
    }

    useEffect(() => {
        if (rowSelected) {
            fetchGetProductDetails(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        setTypeSelectDetail('')

        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div className="flex">
                <AiOutlineDelete
                    size={22}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                        setIsModalOpenDelete(true)
                    }}
                />
                <AiOutlineForm
                    size={22}
                    color="orange"
                    className="ml-2 cursor-pointer"
                    onClick={handleDetailsProduct}
                />
            </div>
        )
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                } else if (value === '<=') {
                    return record.price <= 50
                }
                return true
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.rating >= 3
                } else if (value === '<=') {
                    return record.rating <= 3
                }
                return true
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ]

    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return { ...product, key: product._id, action: renderAction() }
        })

    useEffect(() => {
        if (isSuccess && data?.message === 'The name of product is already') {
            setErrorMsg('Sản phẩm đã tồn tại!')
            setRowSelected('')
        } else if (isSuccess && data?.message === 'SUCCESS') {
            setSuccessMsg('Tạo sản phẩm thành công!')
            queryClient.invalidateQueries(['products'])
            handleCancel()
        } else if (isError) {
            setErrorMsg('Tạo sản phẩm thất bại, vui lòng thử lại.')
        }
    }, [isSuccess, isError])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            setSuccessMsg('Sửa sản phẩm thành công!')
            setRowSelected('')
            queryClient.invalidateQueries(['products'])
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            setErrorMsg('Sửa sản phẩm thất bại, vui lòng thử lại.')
        }
    }, [isSuccessUpdated, isErrorUpdated])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            setSuccessMsg('Xóa sản phẩm thành công!')
            queryClient.invalidateQueries(['products'])
            handleCloseDrawer()
        } else if (isErrorDeleted) {
            setErrorMsg('Xóa sản phẩm thất bại, vui lòng thử lại.')
        }
    }, [isSuccessDeleted, isErrorDeleted])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            setSuccessMsg('Xóa sản phẩm thành công!')
            queryClient.invalidateQueries(['products'])
        } else if (isErrorDeletedMany) {
            setErrorMsg('Xóa sản phẩm thất bại, vui lòng thử lại.')
        }
    }, [isSuccessDeletedMany, isErrorDeletedMany])

    useEffect(() => {
        if (isModelOpen) {
            setShouldRenderModal(true)
            setTimeout(() => setShowModal(true), 10)
        } else if (shouldRenderModal) {
            setShowModal(false)
            const timer = setTimeout(() => setShouldRenderModal(false), 150)
            return () => clearTimeout(timer)
        }
    }, [isModelOpen])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({
            id: rowSelected,
            token: user.access_token,
        })
        setIsModalOpenDelete(false)
    }

    useEffect(() => {
        let timer
        if (successMsg || errorMsg) {
            timer = setTimeout(() => {
                setSuccessMsg('')
                setErrorMsg('')
            }, 3000)
        }
        return () => clearTimeout(timer)
    }, [successMsg, errorMsg])

    if (!isLoadingProducts && (!products || !products.data || products.data.length === 0)) {
        return <div>No products found.</div>
    }

    const onUpdateProduct = (e) => {
        e.preventDefault()
        mutationUpdate.mutate({
            id: rowSelected,
            token: user.access_token,
            ...stateProductDetails,
        })
    }

    return (
        <>
            <h1 className="font-medium">Quản lý sản phẩm</h1>
            {successMsg && <message.Success mes={successMsg} />}
            {errorMsg && <message.Error mes={errorMsg} />}
            <ButtonComponent
                icon={<AiOutlinePlus className="text-6xl " />}
                styleButton={
                    'w-[150px] h-[150px] rounded-md border border-dashed flex items-center justify-center hover:border-blue-600 hover:text-blue-600 mt-2'
                }
                onClick={() => setIsModelOpen(true)}
            />

            <div className="mt-5">
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoadingProducts}
                    onRowSelect={setRowSelected}
                    searchText={searchText}
                    searchColumn={searchColumn}
                    onSearchTextChange={setSearchText}
                    onSearchColumnChange={setSearchColumn}
                    handleDeleteMany={handleDeleteManyProducts}
                />
            </div>
            {products?.totalPage > 0 && (
                <PaginationComponent
                    currentPage={products?.pageCurrent}
                    totalPages={products?.totalPage}
                    onPageChange={(newPage) => {
                        if (newPage !== pageCurrent) setPageCurrent(newPage)
                    }}
                />
            )}
            {shouldRenderModal && (
                // modal add product
                <div className="fixed p-4 w-full h-full top-0 left-0 bg-slate-500/50">
                    {/* Modal content */}
                    <div
                        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-sm min-w-[512px] transition-all duration-150 ease-in-out ${
                            showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                        }`}>
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 ">Tạo sản phẩm</h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                                data-modal-hide="default-modal"
                                onClick={handleCancel}>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                            <form onSubmit={handleOk} method="post">
                                <div className="flex w-full">
                                    <label htmlFor="Name" className="w-2/6">
                                        Name:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id="Name"
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded'
                                            }
                                            required={true}
                                            value={stateProduct?.name}
                                            onChange={handleOnChangeName}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Type" className="w-2/6">
                                        Type:
                                    </label>
                                    <div className="w-4/6 rounded">
                                        <select
                                            className="border px-2 py-2 rounded cursor-pointer w-full focus:outline-none"
                                            value={
                                                typeSelect === 'add_type'
                                                    ? 'add_type'
                                                    : stateProduct?.type
                                            }
                                            onChange={handleOnChangeType}>
                                            {typeProducts.map((typeProduct) => (
                                                <option
                                                    key={typeProduct}
                                                    className="cursor-pointer ">
                                                    {typeProduct}
                                                </option>
                                            ))}
                                            <option value="add_type">Thêm type</option>
                                        </select>
                                        {typeSelect === 'add_type' && (
                                            <InputComponent
                                                id="Name"
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none mt-1 border rounded'
                                                }
                                                required={true}
                                                value={stateProduct?.type}
                                                onChange={handleOnChangeNewType}
                                                placeholder={'Nhập type mới vào đây'}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="CountInStock" className="w-2/6">
                                        Count In Stock:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id="CountInStock"
                                            value={stateProduct?.countInStock}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            }
                                            required={true}
                                            onChange={handleOnChangeCountInStock}
                                            type={'number'}
                                            placeholder={'0'}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Price" className="w-2/6">
                                        Price:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id={'Price'}
                                            value={stateProduct?.price}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            }
                                            required={true}
                                            onChange={handleOnChangePrice}
                                            type={'number'}
                                            placeholder={'0'}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Description" className="w-2/6">
                                        Description:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id={'Description'}
                                            value={stateProduct?.description}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded'
                                            }
                                            required={true}
                                            onChange={handleOnChangeDescription}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Image" className="w-2/6">
                                        Image:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id={'Image'}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded'
                                            }
                                            required={true}
                                            onChange={handleOnChangeImage}
                                            type="file"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Rating" className="w-2/6">
                                        Rating:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id={'Rating'}
                                            value={stateProduct?.rating}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            }
                                            required={true}
                                            onChange={handleOnChangeRating}
                                            type={'number'}
                                            placeholder={'0'}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mt-3">
                                    <label htmlFor="Discount" className="w-2/6">
                                        Discount:
                                    </label>
                                    <div className="w-4/6 border rounded">
                                        <InputComponent
                                            id={'Discount'}
                                            value={stateProduct?.discount}
                                            className={
                                                'w-full py-1 px-2 focus:outline-none rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            }
                                            required={true}
                                            onChange={handleOnChangeDiscount}
                                            type={'number'}
                                            placeholder={'0'}
                                        />
                                    </div>
                                </div>

                                {/* Modal footer */}
                                <div className="flex items-center pt-4 mt-4 border-t border-gray-200 rounded-b justify-end">
                                    <button
                                        data-modal-hide="default-modal"
                                        type="submit"
                                        className=" flex items-center justify-center hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 0 font-medium rounded-lg text-sm w-20 h-10 text-center ml-2">
                                        {isPending ? (
                                            <MoonLoader size={20} color="#fff" />
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* begin modal edit product */}
            <DrawerComponent
                title="Chi tết sản phẩm"
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="90%">
                <Loading spinning={isLoadingOpenDrawerUpdate} tip="Loading...">
                    <div className=" p-4 w-full h-full top-0 left-0 ">
                        <div>
                            <div className="p-4 md:p-5 space-y-4">
                                <form onSubmit={onUpdateProduct} method="post">
                                    <div className="flex w-full">
                                        <label htmlFor="Name" className="w-1/6">
                                            Name:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="Name"
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                value={stateProductDetails.name}
                                                onChange={handleOnChangeNameDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Type" className="w-1/6">
                                            Type:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <select
                                                className="border px-2 py-2 rounded cursor-pointer w-full focus:outline-none"
                                                value={
                                                    typeSelectDetail === 'add_type'
                                                        ? 'add_type'
                                                        : stateProductDetails.type
                                                }
                                                onChange={handleOnChangeTypeDetails}>
                                                {typeProducts.map((typeProduct) => (
                                                    <option
                                                        key={typeProduct}
                                                        className="cursor-pointer ">
                                                        {typeProduct}
                                                    </option>
                                                ))}
                                                <option value="add_type">Thêm type</option>
                                            </select>
                                            {typeSelectDetail === 'add_type' && (
                                                <InputComponent
                                                    id="Name"
                                                    className={
                                                        'w-full py-1 px-2 focus:outline-none mt-1 border rounded'
                                                    }
                                                    required={true}
                                                    value={stateProductDetails.type}
                                                    onChange={handleOnChangeNewTypeDetail}
                                                    placeholder={'Nhập type mới vào đây'}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="CountInStock" className="w-1/6">
                                            Count In Stock:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="CountInStock"
                                                value={stateProductDetails.countInStock}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeCountInStockDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Price" className="w-1/6">
                                            Price:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id={'Price'}
                                                value={stateProductDetails.price}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangePriceDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Description" className="w-1/6">
                                            Description:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id={'Description'}
                                                value={stateProductDetails.description}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeDescriptionDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Image" className="w-1/6">
                                            Image:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <img
                                                src={stateProductDetails.image}
                                                alt=""
                                                className="w-[100px] h-[100px] rounded px-2 mt-1"
                                            />
                                            <InputComponent
                                                id={'Image'}
                                                className={'py-1 px-2 focus:outline-none rounded'}
                                                required={false}
                                                onChange={handleOnChangeImageDetails}
                                                type="file"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Rating" className="w-1/6">
                                            Rating:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id={'Rating'}
                                                value={stateProductDetails.rating}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeRatingDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Discount" className="w-1/6">
                                            Discount:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id={'Discount'}
                                                value={stateProductDetails.discount}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeDiscountDetails}
                                            />
                                        </div>
                                    </div>

                                    {/* Modal footer */}
                                    <div className="flex items-center pt-4 mt-4 border-t border-gray-200 rounded-b justify-end">
                                        <button
                                            data-modal-hide="default-modal"
                                            type="submit"
                                            className=" flex items-center justify-center hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 0 font-medium rounded-lg text-sm w-20 h-10 text-center ml-2">
                                            {isLoadingUpdated ? (
                                                <MoonLoader size={20} color="#fff" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Loading>
            </DrawerComponent>
            {/* end modal edit product */}
            <ModalComponent
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}>
                <div>Bạn có chắc xóa sản phẩm này không?</div>
            </ModalComponent>
        </>
    )
}

export default AdminProduct
