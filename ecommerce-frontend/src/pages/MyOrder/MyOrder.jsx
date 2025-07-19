import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useMutationHook from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import { convertPrice } from '../../util'
import * as OrderServices from '../../services/OrderServices'
import * as message from '../../components/Message/Message'

function MyOrderPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const { state } = location
    const fetchMyOrder = async () => {
        const res = await OrderServices.getOrderByUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['user'],
        queryFn: fetchMyOrder,
        enabled: state?.id && state?.access_token,
    })

    const handleDetailOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token,
            },
        })
    }

    const mutation = useMutationHook((data) => {
        const { id, token, orderItems } = data
        const res = OrderServices.cancelOrder(id, token, orderItems)
        return res
    })

    const handleCancelOrder = (order) => {
        mutation.mutate(
            { id: order?._id, token: state?.token, orderItems: order?.orderItems },
            {
                onSuccess: () => {
                    queryOrder.refetch()
                },
            }
        )
    }

    const { isPending, data } = queryOrder

    const {
        isPending: isLoadingCancel,
        isSuccess: isSuccessCancel,
        isError: isErrorCancel,
        data: dataCancel,
    } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            setSuccessMsg('Xóa thành công')
        } else if (isErrorCancel) {
            setErrorMsg('Xóa thất bại')
        }
    }, [isSuccessCancel, isErrorCancel])

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
        <>
            {errorMsg && <message.Error mes={errorMsg} />}
            {successMsg && <message.Success mes={successMsg} />}
            <Loading spinning={isPending || isLoadingCancel}>
                {/* <div className="min-h-screen border-r-[1px]  bg-stone-50 select-none"></div> */}
                <div className="bg-gray-100 pb-10">
                    <div className="max-w-6xl m-auto min-h-screen">
                        <div className="mb-4">Đơn hàng của tôi</div>
                        {data?.map((dataItem, index) => {
                            return (
                                <div
                                    className="bg-white max-w-[800px] m-auto mt-3 p-2 rounded shadow-md"
                                    key={index}>
                                    <h4>Trạng thái</h4>
                                    <div>
                                        <span className="text-red-500">Giao hàng: </span> Chưa giao
                                        hàng
                                    </div>
                                    <div>
                                        <span className="text-red-500">Thanh toán: </span>{' '}
                                        {dataItem?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                    </div>
                                    <div className=" border-t-[1px] mt-3">
                                        {dataItem?.orderItems.map((orderItem, index) => {
                                            return (
                                                <div
                                                    className="flex justify-between mt-3"
                                                    key={index}>
                                                    <div className="flex ">
                                                        <img
                                                            src={orderItem?.image}
                                                            alt=""
                                                            className="w-20 h-20"
                                                        />
                                                        <span className="max-w-32 ml-4 line-clamp-3 items-center text-sm">
                                                            {orderItem?.name}
                                                        </span>
                                                    </div>
                                                    <div>{convertPrice(orderItem?.price)}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="border-t-[1px] mt-3 pt-3 text-right">
                                        <div>
                                            <span className="text-red-500">Tổng tiền: </span>{' '}
                                            <span className="font-medium">
                                                {convertPrice(dataItem?.totalPrice)}
                                            </span>
                                            <div className="mt-2">
                                                <button
                                                    className="text-blue-500 px-2 py-1 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                                                    onClick={() => handleCancelOrder(dataItem)}>
                                                    Hủy đơn hàng
                                                </button>
                                                <button
                                                    className="text-blue-500 px-2 py-1 border border-blue-500 rounded ml-2 hover:bg-blue-500 hover:text-white"
                                                    onClick={() =>
                                                        handleDetailOrder(dataItem?._id)
                                                    }>
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Loading>
        </>
    )
}

export default MyOrderPage
