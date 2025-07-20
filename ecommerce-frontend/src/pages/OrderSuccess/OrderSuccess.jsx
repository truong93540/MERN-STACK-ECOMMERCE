import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as message from '../../components/Message/Message'
import { useLocation } from 'react-router-dom'
import { orderContain } from '../../contain'
import { convertPrice } from '../../util'

function OrderSuccess() {
    const order = useSelector((state) => state.order)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const location = useLocation()
    const { state } = location
    console.log('state', state)

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

    return (
        <div className="bg-[#f5f5fa] min-h-screen">
            {errorMsg && <message.Error mes={errorMsg} />}
            {successMsg && <message.Success mes={successMsg} />}
            <div className="max-w-6xl m-auto">
                <h3 className="font-medium">Đơn hàng đặt thành công</h3>
                <div className="flex gap-4 items-start">
                    <div className=" w-full bg-white rounded mt-3">
                        <div className="p-4">
                            <h4 className="font-medium">Phương thức giao hàng</h4>
                            <div className="bg-blue-100 w-4/12 border border-blue-200 p-3 rounded mt-1">
                                <div>
                                    <span className="text-amber-600 font-bold">
                                        {' '}
                                        {orderContain.delivery[state?.delivery]}
                                    </span>{' '}
                                    Giao hàng tiết kiệm
                                </div>
                            </div>
                        </div>
                        <div className="border-t p-4">
                            <h4 className="font-medium">Phương thức thanh toán</h4>
                            <div className="pt-2 px-4 pb-4 bg-blue-100 w-4/12 border border-blue-200 p-3 rounded mt-1">
                                <div>
                                    <label htmlFor="paymentMethod">
                                        {' '}
                                        {orderContain.payment[state?.payment]}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 bg-white p-3 rounded mt-3">
                    <span className="w-5/12 flex items-center gap-2">
                        <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                    </span>
                    <div className="w-7/12 flex items-center justify-between ">
                        <div className="flex items-center grow text-center gap-1">
                            <span className="w-4/12">Đơn giá</span>
                            <span className="w-4/12">Số lượng</span>
                            <span className="w-4/12">Thành tiền</span>
                        </div>
                    </div>
                </div>

                {state?.orders?.map((orderItem) => {
                    return (
                        <div
                            className="flex gap-2 bg-white p-3 rounded mt-1"
                            key={orderItem?.product}>
                            <span className="w-5/12 flex items-center gap-2">
                                <div className="w-3/12 flex items-center">
                                    <div className="ml-2 max-h-20">
                                        <img
                                            className="w-full max-h-20 object-contain"
                                            src={orderItem?.image}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <span className="w-9/12 line-clamp-3">{orderItem?.name}</span>
                            </span>
                            <div className="w-7/12 flex items-center justify-between">
                                <div className="flex items-center grow text-center gap-1">
                                    <span className="w-4/12">
                                        {orderItem?.discount
                                            ? convertPrice(
                                                  orderItem?.price -
                                                      (orderItem?.price * orderItem?.discount) / 100
                                              )
                                            : convertPrice(orderItem?.price)}
                                    </span>
                                    <div className="w-4/12 flex justify-center">
                                        <div className="w-full flex justify-center">
                                            <span>{orderItem?.amount}</span>
                                        </div>
                                    </div>
                                    <span className="w-4/12 text-red-500">
                                        {orderItem?.discount
                                            ? convertPrice(
                                                  (orderItem?.price -
                                                      (orderItem?.price * orderItem?.discount) /
                                                          100) *
                                                      orderItem?.amount
                                              )
                                            : convertPrice(orderItem?.price * orderItem?.amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="text-red-500">Tổng tiền: {convertPrice(state.totalPriceMemo)}</div>
            </div>
        </div>
    )
}

export default OrderSuccess
