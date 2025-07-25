const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {
            name,
            image,
            type,
            price,
            countInStock,
            rating,
            description,
            discount,
        } = newProduct;

        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is already",
                });
            }
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock: Number(countInStock),
                rating,
                description,
                discount: Number(discount),
            });
            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });

            if (product === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids });
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            if (filter) {
                const label = filter[0];
                const value = filter[1];
                const regex = {
                    [label]: { $regex: value, $options: "i" }, // không phân biệt hoa thường
                };
                const totalFiltered = await Product.countDocuments(regex);
                const allObjectFilter = await Product.find(regex)
                    .limit(limit)
                    .skip(page * limit);
                resolve({
                    status: "OK",
                    message: "Success",
                    data: allObjectFilter,
                    total: totalFiltered,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalFiltered / limit),
                });
            }
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: "OK",
                    message: "Success",
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);

            resolve({
                status: "OK",
                message: "Success",
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (e) {
            reject(e);
            console.log("err", e);
        }
    });
};

const getAllType = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct("type");
            resolve({
                status: "OK",
                message: "Success",
                data: allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
};
