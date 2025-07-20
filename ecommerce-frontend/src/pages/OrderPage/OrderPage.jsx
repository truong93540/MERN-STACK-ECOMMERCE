import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import * as UserService from '../../services/UserServices'
import { updateUser } from '../../redux/slides/userSlide'
import { AddIcon, RemoveIcon } from '../../components/Icons/Icons'
import {
    decreaseAmount,
    increaseAmount,
    enterInputOrderProduct,
    removeOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
} from '../../redux/slides/orderSlide'
import { convertPrice } from '../../util'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import useMutationHook from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom'
import StepComponent from '../../components/StepComponent/StepComponent'

function OrderPage() {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [inputValues, setInputValues] = useState({})
    const [listChecked, setListChecked] = useState([])
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnChangeNameDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            name: e.target.value,
        })
    }
    const handleOnChangeCityDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            city: e.target.value,
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

    const handleChangCount = (type, idProduct, countInStock) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct, countInStock }))
        } else if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct, countInStock }))
        }
    }

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const onChange = (e) => {
        if (!listChecked.includes(e.target.value) && e.target.checked) {
            setListChecked([...listChecked, e.target.value])
        } else {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        }
    }

    const handleChangCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => newListChecked.push(item?.product))
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

    useEffect(() => {
        if (isOpenModalUpdateInfor) {
            setStateUserDetails({
                ...stateUserDetails,
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            })
        }
    }, [isOpenModalUpdateInfor])

    const handleChangAddress = () => {
        setIsOpenModalUpdateInfor(true)
    }

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    const provisionalArr = []
    order?.orderItemsSelected.map((orderItem) => {
        provisionalArr.push(orderItem?.price * orderItem?.amount)
    })
    const provisional = provisionalArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const deliveryMoney = useMemo(() => {
        if (provisional > 0 && provisional < 200000) {
            return 20000
        } else if (provisional >= 200000 && provisional <= 500000) {
            return 10000
        } else if (provisional > 500000 || provisional === 0) {
            return 0
        }
    }, [provisional])

    const totalDiscount = useMemo(() => {
        return order?.orderItemsSelected.reduce((total, item) => {
            let discount = 0
            if (item?.discount) {
                discount = (item?.price * item?.discount) / 100
            }
            return total + discount * item.amount
        }, 0)
    }, [order?.orderItemsSelected])

    const totalPriceMemo = useMemo(() => {
        return Number(provisional) - Number(totalDiscount) + Number(deliveryMoney)
    }, [provisional, deliveryMoney, totalDiscount])

    const handleAddCard = () => {
        if (!order?.orderItemsSelected.length) {
            setErrorMsg('Vui lòng chọn sản phẩm')
            // message.Error('Vui lòng chọn sản phẩm')
        } else if (!user.id) {
            navigate('/sign-in')
        } else if (!user.phone || !user.address || !user.name || !user.city) {
            setIsOpenModalUpdateInfor(true)
        } else {
            navigate('/payment')
        }
    }

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data
        return UserService.updateUser(id, { ...rest }, token)
    })

    const { isPending, data, isSuccess, isError } = mutationUpdate

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            address: '',
            city: '',
        })
        setIsOpenModalUpdateInfor(false)
    }

    useEffect(() => {
        setIsOpenModalUpdateInfor(false)
    }, [isSuccess])

    const handleUpdateInforUser = (e) => {
        e.preventDefault()
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }))
                        setIsOpenModalUpdateInfor(false)
                    },
                }
            )
        }
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

    const itemsDelivery = [
        {
            title: '20.000 VND',
            description: 'Dưới 200.000 VND',
        },
        {
            title: '10.000 VND',
            description: 'Từ 200.000 VND đến dưới 500.000VND',
        },
        {
            title: '0 VND',
            description: 'Trên 500.000 VND',
        },
    ]

    useEffect(() => {
        const updatedInputs = {}
        order?.orderItems?.forEach((item) => {
            updatedInputs[item.product] = item.amount
        })
        setInputValues(updatedInputs)
    }, [order.orderItems])

    return (
        <div className="bg-[#f5f5fa] min-h-screen">
            {errorMsg && <message.Error mes={errorMsg} />}
            <div className="max-w-6xl m-auto">
                <h3 className="font-medium">Giỏ hàng</h3>
                <div className="flex gap-4 items-start">
                    <div className=" w-9/12  ">
                        <StepComponent
                            current={
                                deliveryMoney === 20000 || provisional === 0
                                    ? 0
                                    : deliveryMoney === 10000
                                    ? 1
                                    : 2
                            }
                            items={itemsDelivery}></StepComponent>
                        <div className="flex gap-2 bg-white p-3 rounded mt-4">
                            <span className="w-5/12 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={handleChangCheckAll}
                                    checked={listChecked?.length === order?.orderItems?.length}
                                />
                                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div className="w-7/12 flex items-center justify-between ">
                                <div className="flex items-center grow text-center gap-1">
                                    <span className="w-4/12">Đơn giá</span>
                                    <span className="w-4/12">Số lượng</span>
                                    <span className="w-4/12">Thành tiền</span>
                                </div>
                                <span
                                    className="cursor-pointer p-1 "
                                    onClick={handleRemoveAllOrder}>
                                    <AiOutlineDelete size={20} />
                                </span>
                            </div>
                        </div>

                        {console.log('order', order)}
                        {order?.orderItems.map((orderItem) => {
                            return (
                                <div
                                    className="flex gap-2 bg-white p-3 rounded mt-3"
                                    key={orderItem?.product}>
                                    <span className="w-5/12 flex items-center gap-2">
                                        <div className="w-3/12 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="checkbox-allProduct"
                                                id="checkbox-allProduct"
                                                onChange={onChange}
                                                value={orderItem?.product}
                                                checked={listChecked.includes(orderItem?.product)}
                                            />
                                            <div className="ml-2 max-h-20">
                                                <img
                                                    className="w-full max-h-20 object-contain"
                                                    src={orderItem?.image}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <span className="w-9/12 line-clamp-3">
                                            {orderItem?.name}
                                        </span>
                                    </span>
                                    <div className="w-7/12 flex items-center justify-between">
                                        <div className="flex items-center grow text-center gap-1">
                                            <span className="w-4/12">
                                                {convertPrice(orderItem?.price)}
                                            </span>
                                            <div className="w-4/12 flex justify-center">
                                                <div className="w-full flex justify-center">
                                                    <ButtonComponent
                                                        icon={<RemoveIcon />}
                                                        styleButton={
                                                            'border w-8 h-8 flex justify-center items-center'
                                                        }
                                                        size={20}
                                                        onClick={() =>
                                                            handleChangCount(
                                                                'decrease',
                                                                orderItem?.product,
                                                                orderItem?.countInStock
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        type="number"
                                                        value={
                                                            inputValues[orderItem.product] ??
                                                            orderItem.amount
                                                        }
                                                        onChange={(e) => {
                                                            const value = e.target.value
                                                            if (value > orderItem.countInStock) {
                                                                setErrorMsg(
                                                                    `Trong kho chỉ còn tối đa ${orderItem.countInStock} sản phẩm`
                                                                )
                                                            }
                                                            setInputValues((prev) => ({
                                                                ...prev,
                                                                [orderItem.product]: value,
                                                            }))
                                                        }}
                                                        onBlur={(e) => {
                                                            const value = Number(e.target.value)
                                                            const validValue = Math.max(
                                                                1,
                                                                Math.min(
                                                                    orderItem?.countInStock,
                                                                    value || 1
                                                                )
                                                            )
                                                            dispatch(
                                                                enterInputOrderProduct({
                                                                    idProduct: orderItem.product,
                                                                    orderInputValue: validValue,
                                                                    countInStock:
                                                                        orderItem?.countInStock,
                                                                })
                                                            )
                                                            setInputValues((prev) => ({
                                                                ...prev,
                                                                [orderItem.product]: validValue,
                                                            }))
                                                        }}
                                                        className="h-8 w-8 text-center border [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                                                    />
                                                    <ButtonComponent
                                                        icon={<AddIcon />}
                                                        styleButton={
                                                            'border w-8 h-8 flex justify-center items-center'
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                orderItem?.amount >=
                                                                orderItem?.countInStock
                                                            ) {
                                                                setErrorMsg(
                                                                    `Trong kho chỉ còn tối đa ${orderItem.countInStock} sản phẩm`
                                                                )
                                                            }
                                                            return handleChangCount(
                                                                'increase',
                                                                orderItem?.product,
                                                                orderItem?.countInStock
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="w-4/12 text-red-500">
                                                {convertPrice(orderItem?.price * orderItem?.amount)}
                                            </span>
                                        </div>
                                        <span
                                            className="cursor-pointer p-1"
                                            onClick={() => handleDeleteOrder(orderItem?.product)}>
                                            <AiOutlineDelete size={20} />
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-3/12">
                        <div className="bg-white  rounded">
                            <div className="text-sm p-4">
                                <span>Địa chỉ: </span>
                                <span className="font-bold">{`${user?.address}, ${user?.city}`}</span>
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={handleChangAddress}>
                                    {' '}
                                    Thay đổi
                                </span>
                            </div>
                            <div className="text-sm border-t border-b p-4">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span className="font-bold text-red-500">
                                        {convertPrice(provisional)}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span>Giảm giá</span>
                                    <span className="font-bold text-red-500">
                                        {convertPrice(totalDiscount)}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span>Phí giao hàng</span>
                                    <span className="font-bold text-red-500">
                                        {convertPrice(deliveryMoney)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex p-4">
                                <span className="w-6/12">Tổng tiền</span>
                                <div className="w-6/12">
                                    <div className="text-2xl font-bold text-red-500">
                                        {convertPrice(totalPriceMemo)}
                                    </div>
                                    <div className="text-[11px]">(Đã bao gồm VAT nếu có)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex " onClick={() => handleAddCard()}>
                                <div className="mt-2 bg-red-500 text-white py-2 w-full m-auto text-center rounded hover:bg-red-600 cursor-pointer active:scale-95 duration-150">
                                    Mua hàng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfor}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateInforUser}>
                <Loading spinning={isPending}>
                    <div className=" p-4 w-full h-full top-0 left-0 ">
                        <div>
                            <div className="p-4 md:p-5 space-y-4">
                                {/* onUpdateUser */}
                                <div>
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
                                        <label htmlFor="City" className="w-1/6">
                                            City:
                                        </label>
                                        <div className="w-5/6 border rounded">
                                            <InputComponent
                                                id="City"
                                                value={stateUserDetails.city}
                                                className={
                                                    'w-full py-1 px-2 focus:outline-none rounded'
                                                }
                                                required={true}
                                                onChange={handleOnChangeCityDetails}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default OrderPage
