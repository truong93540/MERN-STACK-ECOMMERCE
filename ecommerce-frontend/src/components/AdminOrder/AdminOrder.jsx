import TableComponent from '../TableComponent/TableComponent'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as OrderService from '../../services/OrderServices'
import PaginationComponent from '../PaginationComponent/PaginationComponent'
import { orderContain } from '../../contain'
import PieChartComponent from './PieChart'

const AdminOrder = () => {
    const [searchText, setSearchText] = useState('')
    const [searchColumn, setSearchColumn] = useState('name')
    const [pageCurrent, setPageCurrent] = useState(1)
    const limitOnePage = 10
    const user = useSelector((state) => state.user)
    const queryClient = useQueryClient()

    const getAllOrder = async (token, limit, page) => {
        const res = await OrderService.getAllOrder(token, limit, page)
        return res
    }

    const { isLoading: isLoadingOrders, data: orders } = useQuery({
        queryKey: ['orders', pageCurrent],
        queryFn: () => getAllOrder(user.access_token, limitOnePage, pageCurrent - 1),
        refetchOnWindowFocus: false,
    })

    const columns = [
        {
            title: 'User name',
            dataIndex: 'userName',
            sorter: (a, b) => (a.user || '').localeCompare(b.user || ''),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => (a.phone || '').localeCompare(b.phone || ''),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => (a.address || '').localeCompare(b.address || ''),
        },
        {
            title: 'Paid',
            dataIndex: 'isPaid',
            filters: [
                {
                    text: 'True',
                    value: 'true',
                },
                {
                    text: 'False',
                    value: 'false',
                },
            ],
            onFilter: (value, record) => {
                return record.isPaid.toLowerCase() === value
            },
        },
        {
            title: 'Shipped',
            dataIndex: 'shipped',
            filters: [
                {
                    text: 'True',
                    value: 'true',
                },
                {
                    text: 'False',
                    value: 'false',
                },
            ],
            onFilter: (value, record) => {
                return record.shipped.toLowerCase() === value
            },
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
        },
    ]

    const dataTable =
        orders?.data?.length &&
        orders?.data?.map((order, index) => {
            return {
                ...order,
                key: order._id,
                userName: order.shippingAddress.fullName,
                phone: order.shippingAddress.phone,
                address: `${order.shippingAddress.address}, ${order.shippingAddress.city}`,
                isPaid: order.isPaid ? 'True' : 'False',
                shipped: order.isDelivered ? 'True' : 'False',
                paymentMethod: orderContain.payment[order.paymentMethod],
            }
        })

    if (!isLoadingOrders && (!orders || !orders.data || orders.data.length === 0)) {
        return <div>No order found.</div>
    }

    return (
        <>
            <h1 className="font-medium">Danh sách đơn hàng</h1>
            <div className="h-52 w-52">
                <PieChartComponent data={orders?.data} />
            </div>

            <div className="mt-5">
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    isLoading={isLoadingOrders}
                    searchText={searchText}
                    searchColumn={searchColumn}
                    onSearchTextChange={setSearchText}
                    onSearchColumnChange={setSearchColumn}
                />
                {orders?.totalPage > 0 && (
                    <PaginationComponent
                        currentPage={orders?.pageCurrent}
                        totalPages={orders?.totalPage}
                        onPageChange={(newPage) => {
                            if (newPage !== pageCurrent) setPageCurrent(newPage)
                        }}
                    />
                )}
            </div>
        </>
    )
}

export default AdminOrder
