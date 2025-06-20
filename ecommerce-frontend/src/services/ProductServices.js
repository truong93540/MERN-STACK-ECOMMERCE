import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`,
        {},
        { withCredentials: true }
    );
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/create`,
        data,
        { withCredentials: true }
    );
    return res.data;
};

export const getDetailProduct = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/get-details/${id}`,
        { withCredentials: true }
    );
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const config = {
        headers: {
            token: `Bearer ${access_token}`,
        },
    };
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/update/${id}`,
        data,
        config
    );
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const config = {
        headers: {
            token: `Bearer ${access_token}`,
        },
    };
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/delete/${id}`,
        config
    );
    return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-many/`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
