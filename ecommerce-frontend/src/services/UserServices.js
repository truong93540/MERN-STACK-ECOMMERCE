import axios from 'axios'

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    // console.log("data", data);
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`, data, {
        withCredentials: true,
    })
    return res
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`, data)
    return res
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res
}

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res
}

export const getAllUser = async (access_token, limit, page) => {
    // let url = `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all?limit=${limit || 6}`
    //     if (search && search.length > 0) {
    //         url += `&filter=name&filter=${encodeURIComponent(search)}`
    //     }
    //     if (page) {
    //         console.log('page', page)
    //         url += `&page=${encodeURIComponent(page)}`
    //     }
    //     const res = await axios.get(url, { withCredentials: true })
    //     return res.data

    let url = `${process.env.REACT_APP_API_URL_BACKEND}/user/getAll?limit=${limit || 10}`
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

export const refreshToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
        {},
        {
            withCredentials: true,
        }
    )
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`,
        {},
        { withCredentials: true }
    )
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    const config = {
        headers: {
            token: `Bearer ${access_token}`,
        },
    }
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
        data,
        config
    )
    return res.data
}

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/delete-many/`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    )
    return res.data
}
