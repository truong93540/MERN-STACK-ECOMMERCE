import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputComponent from '../../components/InputComponent/InputComponent'
import * as UserService from '../../services/UserServices'
import * as OrderService from '../../services/OrderServices'
import { updateUser } from '../../redux/slides/userSlide'
import { convertPrice } from '../../util'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import useMutationHook from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'
import { removeAllOrderProduct } from '../../redux/slides/orderSlide'

function PaymentPage() {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('later_payment')
    const [delivery, setDelivery] = useState('fast')
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

    const provisionalArr = []
    order?.orderItemsSelected.map((orderItem) => {
        return provisionalArr.push(orderItem?.price * orderItem?.amount)
    })
    const provisional = provisionalArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )

    const deliveryMoney = useMemo(() => {
        if (provisional > 200000) {
            return 20000
        } else if (provisional > 0) {
            return 10000
        } else {
            return 0
        }
    }, [provisional])

    const totalPriceMemo = useMemo(() => {
        return Number(provisional) + Number(deliveryMoney)
    }, [provisional, deliveryMoney])

    const handleChangPaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            user?.city &&
            provisional &&
            user?.id
        ) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: paymentMethod,
                    itemsPrice: provisional,
                    shippingPrice: deliveryMoney,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    email: user?.email,
                },
                {
                    onSuccess: () => {
                        const arrayOrdered = []
                        order?.orderItemsSelected?.forEach((element) => {
                            arrayOrdered.push(element.product)
                        })
                        dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
                        setSuccessMsg('Đặt hàng thành công')

                        setTimeout(() => {
                            navigate('/orderSuccess', {
                                state: {
                                    delivery,
                                    payment: paymentMethod,
                                    orders: order?.orderItemsSelected,
                                    totalPriceMemo: totalPriceMemo,
                                },
                            })
                        }, 3000)
                    },
                }
            )
        }
    }

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rest } = data
        return UserService.updateUser(id, { ...rest }, token)
    })

    const mutationAddOrder = useMutationHook((data) => {
        const { id, token, ...rest } = data
        return OrderService.createOrder({ ...rest }, token)
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

    const handleChangeDelivery = (e) => {
        setDelivery(e.target.value)
    }

    const handleAddOrderVNPAY = async () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            user?.city &&
            provisional &&
            user?.id
        ) {
            const res = await OrderService.createVNPayPayment(
                {
                    token: user?.access_token,
                    orderItem: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: paymentMethod,
                    itemsPrice: provisional,
                    shippingPrice: deliveryMoney,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                },
                user?.access_token
            )
            if (res.status === 'OK' && res?.paymentUrl) {
                const arrayOrdered = []
                order?.orderItemsSelected?.forEach((element) => {
                    arrayOrdered.push(element.product)
                })
                dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
                window.location.href = res.paymentUrl
            }
        }
    }

    return (
        <div className="bg-[#f5f5fa] min-h-screen">
            {errorMsg && <message.Error mes={errorMsg} />}
            {successMsg && <message.Success mes={successMsg} />}
            <div className="max-w-6xl m-auto">
                <h3 className="font-medium">Thanh toán</h3>
                <div className="flex gap-4 items-start">
                    <div className=" w-9/12 bg-white rounded">
                        <div className="p-4">
                            <h4 className="font-medium">Chọn phương thức giao hàng</h4>
                            <div className="bg-blue-100 w-7/12 py-3 px-4 mt-2 rounded border border-blue-200">
                                <div>
                                    <input
                                        type="radio"
                                        name="delivery-radio"
                                        id="delivery-property-1"
                                        checked={delivery === 'fast'}
                                        value="fast"
                                        onChange={handleChangeDelivery}
                                    />
                                    <label htmlFor="delivery-property-1">
                                        <span className="text-amber-600 font-bold"> FAST</span> Giao
                                        hàng tiết kiệm
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="delivery-radio"
                                        id="delivery-property-2"
                                        value="gojek"
                                        checked={delivery === 'gojek'}
                                        onChange={handleChangeDelivery}
                                    />
                                    <label htmlFor="delivery-property-2">
                                        <span className="text-amber-600 font-bold"> GO_JEK</span>{' '}
                                        Giao hàng tiết kiệm
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="border-t p-4">
                            <h4 className="font-medium">Chọn phương thức thanh toán</h4>
                            <div className="bg-blue-100 w-7/12 py-3 px-4 mt-2 rounded border border-blue-200">
                                <div>
                                    <input
                                        type="radio"
                                        name="payment-radio"
                                        id="later_payment"
                                        checked={paymentMethod === 'later_payment'}
                                        value="later_payment"
                                        onChange={handleChangPaymentMethod}
                                    />
                                    <label htmlFor="later_payment"> Thanh toán khi nhận hàng</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="payment-radio"
                                        id="vnpay"
                                        checked={paymentMethod === 'vnpay'}
                                        value="vnpay"
                                        onChange={handleChangPaymentMethod}
                                    />
                                    <label htmlFor="vnpay"> Thanh toán bằng VNPAY</label>
                                </div>
                            </div>
                        </div>
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
                                    <span className="font-bold">{convertPrice(provisional)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Giảm giá</span>
                                    <span className="font-bold">{`0 %`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Thuế</span>
                                    <span className="font-bold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí giao hàng</span>
                                    <span className="font-bold">{deliveryMoney}</span>
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
                        {paymentMethod === 'vnpay' ? (
                            <div className="flex ">
                                <div
                                    className="mt-2 bg-red-500 text-white py-2 w-full m-auto text-center rounded hover:bg-red-600 cursor-pointer active:scale-95 duration-150"
                                    onClick={() => handleAddOrderVNPAY()}>
                                    Thanh toán với VNPAY
                                </div>
                            </div>
                        ) : (
                            <div className="flex ">
                                <div
                                    className="mt-2 bg-red-500 text-white py-2 w-full m-auto text-center rounded hover:bg-red-600 cursor-pointer active:scale-95 duration-150"
                                    onClick={() => handleAddOrder()}>
                                    Đặt hàng
                                </div>
                            </div>
                        )}
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

export default PaymentPage
