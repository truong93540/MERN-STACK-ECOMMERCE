import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    // console.log("data", data);
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
        data,
        {
            withCredentials: true,
        }
    );
    return res;
};

export const signupUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
        data
    );
    return res;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res;
};

export const refreshToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
        {},
        {
            withCredentials: true,
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`,
        {},
        { withCredentials: true }
    );
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const config = {
        headers: {
            token: `Bearer ${access_token}`,
        },
    };
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`,
        data,
        config
    );
    return res.data;
};
