import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`,
        {},
        { withCredentials: true }
    );
    return res.data;
};
