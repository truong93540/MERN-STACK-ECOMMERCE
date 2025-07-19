const OrderServices = require("../services/OrderService.js");

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            user,
        } = req.body;

        if (
            !orderItems ||
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !totalPrice ||
            !fullName ||
            !address ||
            !city ||
            !phone ||
            !user
        ) {
            res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        }
        const response = await OrderServices.createOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const createVNPayPayment = async (req, res) => {
    try {
        const {
            orderItem,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            user,
        } = req.body;

        if (
            !orderItem ||
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !totalPrice ||
            !fullName ||
            !address ||
            !city ||
            !phone ||
            !user
        ) {
            res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        }
        const response = await OrderServices.createVNPayPayment(req.body);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const handleVNPayReturn = async (req, res) => {
    try {
        const response = await OrderServices.handleVNPayReturn(req);
        if (response.status === "OK") {
            return res.redirect(`${process.env.URL_FRONTEND}/`);
        } else {
            return res.redirect(`${process.env.URL_FRONTEND}/payment-fail`);
        }
    } catch (e) {
        console.log("e", e);
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllDetailsOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }
        const response = await OrderServices.getAllOrderDetails(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            res.status(200).json({
                status: "ERR",
                message: "The orderId is required",
            });
        }
        const response = await OrderServices.getDetailsOrder(orderId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            message: e,
        });
    }
};

const cancelDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({
                status: "ERR",
                message: "The orderId is required",
            });
        }
        const response = await OrderServices.cancelOrderDetails(orderId, data);
        return res.status(200).json(response);
    } catch (e) {
        console.log("e", e);
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const data = await OrderServices.getAllOrder(
            Number(limit) || 10,
            Number(page) || 0
        );
        return res.status(200).json(data);
    } catch (e) {
        console.log("e", e);
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createOrder,
    getAllDetailsOrder,
    getDetailsOrder,
    cancelDetailsOrder,
    createVNPayPayment,
    handleVNPayReturn,
    getAllOrder,
};
