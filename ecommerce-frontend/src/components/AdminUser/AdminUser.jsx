import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { AiOutlineDelete, AiOutlineForm, AiOutlinePlus } from 'react-icons/ai'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { MoonLoader } from 'react-spinners'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useMutationHook from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import { getBase64 } from '../../util'
import * as UserService from '../../services/UserServices'
import Loading from '../Loading/Loading'

const AdminUser = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [rowSelected, setRowSelected] = useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [shouldRenderModal, setShouldRenderModal] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchColumn, setSearchColumn] = useState('name')
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)

    const user = useSelector((state) => state.user)
    const queryClient = useQueryClient()

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: '',
    })

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const mutationUpdate = useMutationHook((data) => {
        console.log('data', data)
        const { id, token, ...rest } = data
        return UserService.updateUser(id, { ...rest }, token)
    })

    const mutationDeleted = useMutationHook((data) => {
        const { id, token } = data
        return UserService.deleteUser(id, token)
    })

    const mutationDeletedMany = useMutationHook((data) => {
        const { token, ...ids } = data
        return UserService.deleteManyUser(ids, token)
    })

    const handleDeleteManyUsers = (ids) => {
        mutationDeletedMany.mutate({
            ids: ids,
            token: user.access_token,
        })
    }

    const getAllUsers = async () => {
        const res = await UserService.getAllUser()
        return res
    }

    const {
        data: dataUpdated,
        isPending: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate

    const {
        data: dataDeleted,
        isPending: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted

    const {
        data: dataDeletedMany,
        isPending: isLoadingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany

    const { isLoading: isLoadingUsers, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
    })

    const handleCancel = () => {
        setIsModelOpen(false)
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
    }

    const handleOnChangeNameDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            name: e.target.value,
        })
    }
    const handleOnChangeEmailDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            email: e.target.value,
        })
    }
    const handleOnChangePhoneDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            phone: e.target.value,
        })
    }

    const handleOnChangeAddressDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            address: e.target.value,
        })
    }
    const handleOnChangeAvatarDetails = async (e) => {
        console.log('e.target.files', e.target.files)
        const file = e.target.files[0]
        console.log('file', file)
        if (file) {
            const base64 = await getBase64(file)
            setStateUserDetails({
                ...stateUserDetails,
                avatar: base64,
            })
        }
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        setIsLoadingDetail(true)
        const res = await UserService.getDetailsUser(rowSelected)
        console.log('res.data', res.data)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.data?.name,
                email: res?.data?.data?.email,
                phone: res?.data?.data?.phone,
                isAdmin: res?.data?.data?.isAdmin,
                avatar: res?.data?.data?.avatar,
                address: res?.data?.data?.address,
            })
        }
        setIsLoadingDetail(false)
    }

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        if (rowSelected) {
            setIsLoadingDetail(true)
            // fetchGetDetailsUser(rowSelected)
        }
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
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },

        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ]

    const dataTable =
        users?.data?.length &&
        users?.data?.map((user, index) => {
            return {
                ...user,
                key: user._id,
                isAdmin: user.isAdmin ? 'True' : 'False',
                action: renderAction(),
            }
        })

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            setSuccessMsg('Sửa tài khoản thành công!')
            queryClient.invalidateQueries(['users'])
            handleCloseDrawer()
        } else if ((isSuccessUpdated && dataUpdated?.status !== 'OK') || isErrorUpdated) {
            setErrorMsg(dataUpdated?.message || 'Sửa tài khoản thất bại, vui lòng thử lại.')
        }
    }, [isSuccessUpdated, isErrorUpdated, dataUpdated])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            setSuccessMsg('Xóa sản phẩm thành công!')
            queryClient.invalidateQueries(['users'])
            handleCloseDrawer()
        } else if (isErrorDeleted) {
            setErrorMsg('Xóa sản phẩm thất bại, vui lòng thử lại.')
        }
    }, [isSuccessDeleted, isErrorDeleted])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            setSuccessMsg('Xóa sản phẩm thành công!')
            queryClient.invalidateQueries(['users'])
            handleCloseDrawer()
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

    const handleDeleteUser = () => {
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

    if (!isLoadingUsers && (!users || !users.data || users.data.length === 0)) {
        return <div>No user found.</div>
    }

    const onUpdateUser = (e) => {
        e.preventDefault()
        console.log('rowSelected', rowSelected)
        mutationUpdate.mutate({
            id: rowSelected,
            token: user.access_token,
            ...stateUserDetails,
        })
    }

    const handleDeleteAll = (selectedIds) => {
        console.log('Các id cần xóa:', selectedIds)
    }

    return (
        <>
            {successMsg && <message.Success mes={successMsg} />}
            {errorMsg && <message.Error mes={errorMsg} />}
            <h1 className="font-medium">Quản lý người dùng</h1>
            <div className="mt-5">
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoadingUsers}
                    onRowSelect={setRowSelected}
                    searchText={searchText}
                    searchColumn={searchColumn}
                    onSearchTextChange={setSearchText}
                    onSearchColumnChange={setSearchColumn}
                    handleDeleteMany={handleDeleteManyUsers}
                />
            </div>

            <DrawerComponent
                title="Chi tiết người dùng"
                isOpen={isOpenDrawer}
                onClose={() => {
                    setIsOpenDrawer(false)
                }}
                width="90%">
                <Loading spinning={isLoadingDetail} tip="Loading...">
                    <div className=" p-4 w-full h-full top-0 left-0 ">
                        <div>
                            <div className="p-4 md:p-5 space-y-4">
                                <form onSubmit={onUpdateUser} method="post">
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
                                                // name="name"
                                                value={stateUserDetails.name}
                                                onChange={handleOnChangeNameDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Email" className="w-1/6">
                                            Email:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="Email"
                                                value={stateUserDetails.email}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeEmailDetails}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Phone" className="w-1/6">
                                            Phone:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="Phone"
                                                value={stateUserDetails.phone}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangePhoneDetails}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Address" className="w-1/6">
                                            Address:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="Address"
                                                value={stateUserDetails.address}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeAddressDetails}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex w-full mt-3">
                                        <label htmlFor="Image" className="w-1/6">
                                            Image:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            {stateUserDetails?.avatar && (
                                                <>
                                                    <img
                                                        src={stateUserDetails.avatar}
                                                        alt=""
                                                        className="w-[100px] h-[100px] rounded px-2 mt-1"
                                                    />
                                                </>
                                            )}
                                            <InputComponent
                                                id={'Image'}
                                                className={'py-1 px-2 focus:outline-none rounded'}
                                                required={true}
                                                onChange={handleOnChangeAvatarDetails}
                                                type="file"
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
            <ModalComponent
                title="Xóa người dùng"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}>
                <div>Bạn có chắc xóa tài khoản này không?</div>
            </ModalComponent>
        </>
    )
}

export default AdminUser
