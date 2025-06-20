const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./jwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;

        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already',
                });
                return;
            }

            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser,
                });
                return;
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;

        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
                return;
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user incorrect',
                });
                return;
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token: access_token,
                refresh_token: refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            const updateUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            // console.log("checkUser", checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete user success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids });

            resolve({
                status: 'OK',
                message: 'Delete user success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser,
            });
        } catch (e) {
            reject(e);
            console.log('err');
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });

            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser,
};
