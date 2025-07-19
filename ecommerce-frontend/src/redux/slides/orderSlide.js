import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAT: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem?.product
            )
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
                if (itemOrder.amount > orderItem?.countInStock) {
                    itemOrder.amount = orderItem?.countInStock
                }
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct, countInStock } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (itemOrder.amount < 100 && itemOrder.amount < countInStock) {
                itemOrder.amount++
            }
            const itemOrderSelected = state?.orderItemsSelected?.find(
                (item) => item?.product === idProduct
            )
            if (itemOrderSelected?.amount < 100 && itemOrderSelected.amount < countInStock) {
                itemOrderSelected.amount++
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (itemOrder.amount > 1) {
                itemOrder.amount--
            }
            const itemOrderSelected = state?.orderItemsSelected?.find(
                (item) => item?.product === idProduct
            )
            if (itemOrderSelected?.amount > 1) {
                itemOrderSelected.amount--
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            state.orderItems = state?.orderItems?.filter((item) => {
                return item?.product !== idProduct
            })
            state.orderItemsSelected = state?.orderItemsSelected?.filter((item) => {
                return item?.product !== idProduct
            })
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter(
                (item) => !listChecked.includes(item.product)
            )
            state.orderItems = itemOrders
            const itemOrderSelected = state?.orderItemsSelected?.filter(
                (item) => !listChecked.includes(item.product)
            )
            state.orderItemsSelected = itemOrderSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderItemsSelected = orderSelected
        },
        enterInputOrderProduct: (state, action) => {
            const { idProduct, orderInputValue, countInStock } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (orderInputValue > 100 && countInStock >= 100) {
                itemOrder.amount = 100
            } else if (orderInputValue > countInStock) {
                itemOrder.amount = countInStock
            } else if (orderInputValue < 0) {
                itemOrder.amount = 0
            } else {
                itemOrder.amount = orderInputValue
            }
        },
    },
})

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    enterInputOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
} = orderSlide.actions

export default orderSlide.reducer
