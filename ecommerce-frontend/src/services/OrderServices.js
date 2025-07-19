import { axiosJWT } from './UserServices'

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}

export const createVNPayPayment = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/vnpay`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}

export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/get-all-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/get-details-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}

export const getAllOrder = async (access_token, limit, page) => {
    let url = `${process.env.REACT_APP_API_URL_BACKEND}/order/get-all-order?limit=${limit || 10}`
    if (page) {
        url += `&page=${encodeURIComponent(page)}`
    }
    const res = await axiosJWT.get(url, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/cancel-order/${id}`,
        { data: orderItems },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}
