const UserServices = require('../services/UserServices');
const jwtService = require('../services/jwtService');

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const reg =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password || !confirmPassword) {
            res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
            return;
        } else if (!isCheckEmail) {
            res.status(200).json({
                status: 'ERR',
                message: 'The input is email',
            });
            return;
        } else if (password !== confirmPassword) {
            res.status(200).json({
                status: 'ERR',
                message: 'The password equal confirmPassword',
            });
            return;
        }
        const response = await UserServices.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
            return;
        } else if (!isCheckEmail) {
            res.status(200).json({
                status: 'ERR',
                message: 'The input is email',
            });
            return;
        }
        const response = await UserServices.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'Strict',
        });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (req.file) {
            data.avatar = `/uploads/avatars/${req.file.filename}`;
        }

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await UserServices.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = req.headers;
        // console.log("userId", userId);
        // console.log("token", token);
        if (!userId) {
            res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        // console.log("userid", userId);
        // console.log("is check email: ", isCheckEmail);
        const response = await UserServices.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserServices.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await UserServices.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            res.status(200).json({
                status: 'ERR',
                message: 'The token is required',
            });
            return;
        }
        const response = await jwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });
        console.log(123);
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully',
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
};
