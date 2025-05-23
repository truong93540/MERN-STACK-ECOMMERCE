import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Wrapper";
import { useState } from "react";
import Header from "./Header";
import MenuItem from "./MenuItem";
import * as UserServices from "../../../services/UserServices";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../redux/slides/userSlide";
import { Navigate, useNavigate } from "react-router-dom";

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await UserServices.logoutUser();
        localStorage.removeItem("access_token");
        dispatch(resetUser());
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            if (item.type === "logout") {
                                handleLogout();
                            } else if (item.type === "profile") {
                                navigate("/profile-user");
                            }
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const renderResult = (attrs) => (
        <div
            className="bg-white border rounded shadow text-[#333] min-w-[200px]"
            tabIndex="-1"
            {...attrs}>
            <div className="absolute -top-1 right-4 w-3 h-3 bg-white rotate-45 border border-gray-300 shadow-sm z-[-1]" />
            <Wrapper>
                {history.length > 1 && (
                    <Header title={current.title} onBack={handleBack} />
                )}
                <div>{renderItems()}</div>
            </Wrapper>
        </div>
    );

    return (
        <Tippy
            // visible
            interactive
            delay={[100, 300]}
            offset={[0, 10]}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu}>
            <div>{children}</div>
        </Tippy>
    );
}

export default Menu;
