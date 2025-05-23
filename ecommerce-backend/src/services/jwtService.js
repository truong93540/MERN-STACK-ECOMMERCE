const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async (payload) => {
    // console.log('payload: ', ...payload);
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' }
    );

    return access_token;
};

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    );

    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            // console.log('token', token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                // console.log('err', err);
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication',
                    });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });
                // console.log('access_token', access_token);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService,
};
