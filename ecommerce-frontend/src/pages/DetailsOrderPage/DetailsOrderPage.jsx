import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderServices from '../../services/OrderServices'
import { convertPrice } from '../../util'
import { orderContain } from '../../contain'
import { useEffect, useMemo } from 'react'
import Loading from '../../components/Loading/Loading'

const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const { state } = location
    const { id } = params

    const fetchDetailsOrder = async () => {
        const res = await OrderServices.getDetailsOrder(id, state?.token)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders-details'],
        queryFn: fetchDetailsOrder,
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

    const { isPending, data: dataOrder } = queryOrder

    const totalDiscount = useMemo(() => {
        if (!dataOrder?.orderItems) return 0
        return dataOrder.orderItems.reduce((acc, item) => {
            return acc + (item.price * item.amount * item.discount) / 100
        }, 0)
    }, [dataOrder?.orderItems])

    return (
        <Loading spinning={isPending}>
            <div className="bg-gray-100 pb-10 min-h-screen">
                <div className="max-w-6xl m-auto ">
                    <div>
                        <h4 className="font-medium">Chi tiết đơn hàng</h4>
                        <div className="flex mt-2 items-stretch justify-between gap-3">
                            <div className="flex flex-col">
                                <h4 className="">Địa chỉ người nhận</h4>
                                <div className="bg-white py-2 px-4 rounded mt-2 flex-1 ">
                                    <div className="font-bold">
                                        {dataOrder?.shippingAddress?.fullName}
                                    </div>
                                    <div>
                                        Địa chỉ: {dataOrder?.shippingAddress?.address},{' '}
                                        {dataOrder?.shippingAddress?.city}
                                    </div>
                                    <div>Điện thoại: {dataOrder?.shippingAddress?.phone}</div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h4>Hình thức giao hàng</h4>
                                <div className="bg-white py-2 px-4 rounded mt-2 flex-1">
                                    <div className="">
                                        <span className="text-amber-600 font-bold">FAST: </span>Giao
                                        hàng tiết kiệm
                                    </div>
                                    <div>
                                        Phí giao hàng: {convertPrice(dataOrder?.shippingPrice)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h4>Hình thức thanh toán</h4>
                                <div className="bg-white py-2 px-4 rounded mt-2 flex-1">
                                    <div className="">
                                        {orderContain.payment[dataOrder?.paymentMethod]}
                                    </div>
                                    <div className="text-amber-600">
                                        {dataOrder?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 bg-white rounded p-3">
                        <div className="flex gap-1">
                            <div className="w-[40%]">Sản phẩm</div>
                            <div className="w-[20%]">Giá</div>
                            <div className="w-[20%]">Số lượng</div>
                            <div className="w-[20%]">Giảm giá</div>
                        </div>
                        {dataOrder?.orderItems.map((order) => {
                            return (
                                <div className="flex gap-1 mt-3" key={order?._id}>
                                    <div className="w-[40%]">
                                        <img
                                            src={order.image}
                                            alt={order.name}
                                            className="w-16 h-16"
                                        />
                                    </div>
                                    <div className="w-[20%] font-bold">
                                        {convertPrice(order.price)}
                                    </div>
                                    <div className="w-[20%] font-bold">{order.amount}</div>
                                    <div className="w-[20%] font-bold text-red-500">
                                        {convertPrice(
                                            ((order.price * order.discount) / 100) * order.amount
                                        ) || 0}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-5 text-right">
                        <div>
                            Tạm tính:{' '}
                            <span className="text-red-500 font-bold">
                                {convertPrice(dataOrder?.itemsPrice - totalDiscount)}
                            </span>
                        </div>
                        <div>
                            Phí vận chuyển:{' '}
                            <span className="text-red-500 font-bold">
                                {convertPrice(dataOrder?.shippingPrice)}
                            </span>
                        </div>
                        <div>
                            Tổng cộng:{' '}
                            <span className="text-red-500 font-bold">
                                {convertPrice(dataOrder?.totalPrice - totalDiscount)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default DetailsOrderPage
