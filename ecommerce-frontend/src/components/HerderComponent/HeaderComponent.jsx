import { useNavigate } from "react-router-dom";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { CartIcon, DownIcon, UserIcon } from "../Icons/Icons";
import { useSelector } from "react-redux";
import Menu from "../Popper/Menu/Menu";
import { useEffect, useState } from "react";

function HeaderComponent() {
    const numberOfProductsAddedToCart = 1;
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };
    const user = useSelector((state) => state.user);
    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState(user?.avatar);

    useEffect(() => {
        setUserName(user.name);
        setAvatar(user?.avatar);
    }, [user]);

    const userMenu = [
        {
            title: "Đăng xuất",
            type: "logout",
        },
        {
            title: "Thông tin người dùng",
            type: "profile",
        },
    ];

    return (
        <div className="py-[10px] bg-[#1A94FF] min-w-[1024px]">
            <div className="flex flex-row items-center flex-nowrap max-w-6xl m-auto">
                <div className="basis-1/6 text-lg text-[#fff] font-bold text-left text-s">
                    TIKI
                </div>
                <div className="basis-1/2 rounded-sm mx-3">
                    <ButtonInputSearch
                        textButton="Tìm kiếm"
                        placeholder="Tìm kiếm tại đây"
                    />
                </div>
                <div className="basis-1/3 text-white flex justify-between">
                    <div className="flex items-center cursor-pointer">
                        {user?.access_token ? (
                            <div className="flex gap-4 items-center ml-4">
                                {avatar === "" ? (
                                    <UserIcon />
                                ) : (
                                    <div>
                                        <img
                                            src={avatar}
                                            alt="avatar"
                                            className="h-[40px] w-[40px] rounded-full object-cover"
                                        />
                                    </div>
                                )}

                                <Menu items={userMenu}>
                                    <div className="cursor-pointer">
                                        {userName || user.email}
                                    </div>
                                </Menu>
                            </div>
                        ) : (
                            <>
                                <UserIcon />
                                <div
                                    className="flex flex-col ml-2 "
                                    onClick={handleNavigateLogin}>
                                    <span>Đăng nhập/Đăng ký</span>
                                    <span className="flex items-center">
                                        Tài khoản
                                        <DownIcon />
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="ml-5 flex items-center ">
                        <div className="relative">
                            <CartIcon />
                            {numberOfProductsAddedToCart > 0 && (
                                <span className="absolute top-[-4px] right-[-4px] bg-[#FF6357] w-[18px] h-[18px] rounded-full text-xs text-center border border-inherit">
                                    {numberOfProductsAddedToCart}
                                </span>
                            )}
                        </div>
                        <span className="ml-1 mt-2">Giỏ Hàng</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderComponent;
