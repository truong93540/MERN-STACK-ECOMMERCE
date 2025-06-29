import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
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
            console.log({ state, action })
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem?.product
            )
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (itemOrder.amount < 100) {
                itemOrder.amount++
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (itemOrder.amount > 1) {
                itemOrder.amount--
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            state.orderItems = state?.orderItems?.filter((item) => {
                return item?.product !== idProduct
            })
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter(
                (item) => !listChecked.includes(item.product)
            )
            state.orderItems = itemOrders
        },
        enterInputOrderProduct: (state, action) => {
            const { idProduct, orderInputValue } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            if (orderInputValue > 100) {
                itemOrder.amount = 100
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
} = orderSlide.actions

export default orderSlide.reducer
