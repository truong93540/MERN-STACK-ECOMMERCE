import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "./services/UserServices";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id && storageData) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem("access_token");
        let decoded = {};
        if (storageData) {
            try {
                decoded = jwtDecode(storageData);
            } catch (error) {
                console.error("Token không hợp lệ:", error);
                localStorage.removeItem("access_token");
                return { decoded: {}, storageData: null };
            }
        }
        return { decoded, storageData };
    };

    UserServices.axiosJWT.interceptors.request.use(
        async function (config) {
            const currentTime = new Date().getTime() / 1000;
            let { decoded, storageData } = handleDecoded();
            if (decoded?.exp < currentTime) {
                try {
                    const data = await UserServices.refreshToken(storageData);

                    if (!data?.access_token) {
                        console.error(
                            "Lỗi: Token bị null hoặc undefined, không thể lưu vào localStorage!"
                        );
                        return Promise.reject(
                            new Error("No access token received")
                        );
                    }

                    dispatch(
                        updateUser({
                            name: decoded.name,
                            email: decoded.email,
                            access_token: data.access_token,
                        })
                    );
                    localStorage.setItem("access_token", data?.access_token);

                    storageData = data?.access_token;
                    config.headers["token"] = `Bearer ${storageData}`;
                } catch (error) {
                    console.error("Error refreshing token:", error);
                    localStorage.removeItem("access_token");
                    return Promise.reject(error);
                }
            } else {
                config.headers["token"] = `Bearer ${storageData}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    const handleGetDetailsUser = async (id, token) => {
        try {
            const res = await UserServices.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data?.data, access_token: token }));
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader
                            ? DefaultComponent
                            : Fragment;
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
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
