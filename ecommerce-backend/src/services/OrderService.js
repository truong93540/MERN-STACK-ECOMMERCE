const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const TempOrder = require("../models/TempOrder");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const EmailService = require("./EmailService");
const { VNPay, ProductCode, VnpLocale, dateFormat } = require("vnpay");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
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
            email,
        } = newOrder;

        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            sold: +order.amount,
                        },
                    },
                    { new: true }
                );
                if (productData) {
                    return {
                        status: "OK",
                        message: "SUCCESS",
                    };
                    // }
                } else {
                    return {
                        status: "OK",
                        message: "ERR",
                        id: order.product,
                    };
                }
            });
            const result = await Promise.all(promises);
            const newData = result && result.filter((item) => item.id);
            if (newData.length) {
                resolve({
                    status: "ERR",
                    message: `San pham voi id ${newData.join(
                        ","
                    )} khong du hang`,
                });
            } else {
                const createdOrder = await Order.create({
                    orderItems: orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone,
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                });
                if (createdOrder) {
                    await EmailService.sendEmailCreateOrder(email, orderItems);
                    resolve({
                        status: "OK",
                        message: "success",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createVNPayPayment = async (newOrder) => {
    try {
        const txnRef = `ORDER-${Date.now()}`;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const vnpay = new VNPay({
            tmnCode: process.env.TMNCODE,
            secureSecret: process.env.SECURESECRET,
            vnpayHost: "https://sandbox.vnpayment.vn",
            queryDrAndRefundHost: "https://sandbox.vnpayment.vn",
            testMode: true,
            hashAlgorithm: "SHA512",
        });

        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: newOrder.totalPrice, // nhân 100 vì đơn vị là đồng
            vnp_IpAddr: "127.0.0.1",
            vnp_TxnRef: txnRef,
            vnp_OrderInfo: `Thanh toan don hang ${txnRef}`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: `${process.env.URL_BACKEND}${process.env.PORT}/api/order/vnpay-return`,
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date(), "yyyyMMddHHmmss"),
            vnp_ExpireDate: dateFormat(tomorrow, "yyyyMMddHHmmss"),
        });
        await TempOrder.create({ txnRef, data: newOrder });
        return {
            status: "OK",
            message: "Tạo link thanh toán thành công",
            paymentUrl: paymentUrl,
        };
    } catch (error) {
        console.log("error", error);
        return {
            status: "ERR",
            message: error,
        };
    }
};

const handleVNPayReturn = async (req) => {
    const vnpay = new VNPay({
        tmnCode: process.env.TMNCODE,
        secureSecret: process.env.SECURESECRET,
        hashAlgorithm: "SHA512",
    });

    const params = req.query;
    const secureHash = params["vnp_SecureHash"];
    const isValid = vnpay.verifyReturnUrl(params, secureHash);

    if (!isValid) {
        return { status: "ERR", message: "Sai chữ ký VNPay" };
    }

    const txnRef = params.vnp_TxnRef;

    if (params.vnp_ResponseCode === "00") {
        const tempOrder = await TempOrder.findOne({ txnRef });
        if (!tempOrder) {
            return { status: "ERR", message: "Không tìm thấy đơn hàng tạm" };
        }

        const newOrder = tempOrder.data;

        const promises = newOrder.orderItem.map(async (order) => {
            return await Product.findOneAndUpdate(
                { _id: order.product, countInStock: { $gte: order.amount } },
                {
                    $inc: {
                        countInStock: -order.amount,
                        sold: +order.amount,
                    },
                },
                { new: true }
            );
        });

        const result = await Promise.all(promises);
        const outOfStock = result.filter((p) => !p);

        if (outOfStock.length) {
            return {
                status: "ERR",
                message: "Một số sản phẩm không đủ hàng",
            };
        }

        await Order.create({
            orderItems: newOrder.orderItem,
            shippingAddress: {
                fullName: newOrder.fullName,
                address: newOrder.address,
                city: newOrder.city,
                phone: newOrder.phone,
            },
            paymentMethod: newOrder.paymentMethod,
            itemsPrice: newOrder.itemsPrice,
            shippingPrice: newOrder.shippingPrice,
            totalPrice: newOrder.totalPrice,
            user: newOrder.user,
            isPaid: true,
        });

        await TempOrder.deleteOne({ txnRef });

        return {
            status: "OK",
            message: "Thanh toán thành công",
            data: req.query,
        };
    } else {
        return {
            status: "ERR",
            message: "Thanh toán thất bại",
        };
    }
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id,
            });

            if (order === null) {
                resolve({
                    status: "OK",
                    message: "The order is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order,
            });
        } catch (e) {
            console.log("e", e);
            reject(e);
        }
    });
};

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id,
            });

            if (order === null) {
                resolve({
                    status: "OK",
                    message: "The order is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order,
            });
        } catch (e) {
            console.log("e", e);
            reject(e);
        }
    });
};

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deletedOrder = null;
            const notFoundProducts = [];

            const promises = data.map(async (item) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        sold: { $gte: item.amount },
                    },
                    {
                        $inc: {
                            countInStock: +item.amount,
                            sold: -item.amount,
                        },
                    },
                    { new: true }
                );

                if (!productData) {
                    notFoundProducts.push(item.product);
                }
            });

            await Promise.all(promises);

            // Nếu có sản phẩm không tồn tại → trả lỗi luôn
            if (notFoundProducts.length > 0) {
                return resolve({
                    status: "ERR",
                    message: `Sản phẩm với id: ${notFoundProducts.join(
                        ", "
                    )} không tồn tại hoặc không đủ dữ liệu`,
                });
            }

            // Nếu tất cả sản phẩm đều cập nhật thành công, mới xóa đơn hàng
            deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) {
                return resolve({
                    status: "ERR",
                    message: "Không tìm thấy đơn hàng để xóa",
                });
            }

            resolve({
                status: "OK",
                message: "success",
                data: deletedOrder,
            });
        } catch (e) {
            console.log("e", e);
            reject(e);
        }
    });
};

const getAllOrder = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalOrder = await Order.countDocuments();
            const allOrder = await Order.find()
                .limit(limit)
                .skip(page * limit);

            resolve({
                status: "OK",
                message: "Success",
                data: allOrder,
                total: totalOrder,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalOrder / limit),
            });
        } catch (e) {
            reject(e);
            console.log("err1");
        }
    });
};

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    createVNPayPayment,
    handleVNPayReturn,
    getAllOrder,
};
