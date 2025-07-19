import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { jwtDecode } from 'jwt-decode'
import * as UserServices from './services/UserServices'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingPage/LoadingPage'

function App() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        setIsLoading(true)
        const { storageData, decoded } = handleDecoded()
        if (decoded?.id && storageData) {
            handleGetDetailsUser(decoded?.id, storageData)
        }
        setIsLoading(false)
    }, [])

    const handleGetDetailsUser = async (id, token) => {
        try {
            const refresh_token = localStorage.getItem('refresh_token')
            dispatch(updateUser({ loading: true }))
            const res = await UserServices.getDetailsUser(id, token)
            dispatch(
                updateUser({
                    ...res?.data?.data,
                    access_token: token,
                    refresh_token,
                    loading: false,
                })
            )
        } catch (error) {
            console.error('Error fetching user details:', error)
        }
    }

    const handleDecoded = () => {
        let storageData = user?.access_token || localStorage.getItem('access_token')
        let decoded = {}
        if (storageData && !user?.access_token) {
            decoded = jwtDecode(storageData)
        } else if (storageData && user?.access_token) {
            decoded = jwtDecode(user?.access_token)
        }
        return { decoded, storageData }
    }

    return (
        <div>
            <Loading isLoading={isLoading}>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page
                            const ischeckAuth = !route.isPrivate || user.isAdmin
                            const Layout = route.isShowHeader ? DefaultComponent : Fragment
                            if (!ischeckAuth) return null
                            return (
                                <Route
                                    key={route.page}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </Router>
            </Loading>
        </div>
    )
}

export default App
