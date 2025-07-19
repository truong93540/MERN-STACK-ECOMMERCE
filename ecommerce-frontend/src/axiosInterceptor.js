import { jwtDecode } from 'jwt-decode'
import * as UserServices from './services/UserServices'
import { store } from './redux/store'
import { updateUser, resetUser } from './redux/slides/userSlide'

let isRefreshing = false
let refreshPromise = null

const handleDecoded = () => {
    const user = store.getState().user
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData) {
        decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
}

export const setupAxiosInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async function (config) {
            const currentTime = new Date().getTime() / 1000
            let { decoded, storageData } = handleDecoded()
            const refreshToken = localStorage.getItem('refresh_token')

            if (refreshToken) {
                const decodeRefreshToken = jwtDecode(refreshToken)
                if (decoded?.exp < currentTime) {
                    if (decodeRefreshToken?.exp > currentTime) {
                        if (!isRefreshing) {
                            isRefreshing = true
                            refreshPromise = await UserServices.refreshToken(refreshToken)
                                .then((data) => {
                                    if (data?.access_token) {
                                        localStorage.setItem('access_token', data.access_token)
                                        store.dispatch(
                                            updateUser({ access_token: data.access_token })
                                        )
                                    }
                                    isRefreshing = false
                                    return data
                                })
                                .catch((error) => {
                                    isRefreshing = false
                                    throw error
                                })
                        }
                        const data = await refreshPromise
                        config.headers['token'] = `Bearer ${data.access_token}`
                    } else {
                        store.dispatch(resetUser())
                    }
                } else {
                    config.headers['token'] = `Bearer ${storageData}`
                }
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )
}
