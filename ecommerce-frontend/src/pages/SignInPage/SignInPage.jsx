import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo-login.png";
import { EyeIcon } from "../../components/Icons/Icons";
import * as UserServices from "../../services/UserServices";
import useMutationHook from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

function SignInPage() {
    const [nonePassword, setNonePassword] = useState(true);
    const [inputGmail, setInputGmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateSignUp = () => {
        navigate("/sign-up");
    };

    const mutation = useMutationHook((data) => UserServices.loginUser(data));

    const { data, isPending, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
            localStorage.setItem("access_token", data?.data?.access_token);
            if (data?.data?.access_token) {
                const decoded = jwtDecode(data?.data?.access_token);
                console.log("decode", decoded);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        try {
            const res = await UserServices.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data?.data, access_token: token }));
        } catch (error) {
            console.error("Lỗi khi lấy thông tin user:", error);
        }
    };

    const handleChangeInputGmail = (value) => {
        setInputGmail(value);
        if (value.length > 0) {
            const elementGmailSignIn = document.getElementById("sign-in-gmail");
            elementGmailSignIn.classList.remove("border-red-400");
            elementGmailSignIn.classList.remove("border");
        }
    };

    const handleChangeInputPassword = (value) => {
        setInputPassword(value);
        if (value.length > 0) {
            const elementPasswordSignIn = document.getElementById(
                "sign-in-password-parent"
            );
            elementPasswordSignIn.classList.remove("border-red-400");
            elementPasswordSignIn.classList.remove("border");
        }
    };

    const handleSubmitForm = () => {
        if (inputGmail.length > 0 && inputPassword.length > 0) {
            mutation.mutate({
                email: inputGmail,
                password: inputPassword,
            });
        } else if (inputGmail.length === 0) {
            const elementGmailSignIn = document.getElementById("sign-in-gmail");
            elementGmailSignIn.classList.add("border-red-400");
            elementGmailSignIn.classList.add("border");
        } else if (inputPassword.length === 0) {
            const elementPasswordSignIn = document.getElementById(
                "sign-in-password-parent"
            );
            elementPasswordSignIn.classList.add("border-red-400");
            elementPasswordSignIn.classList.add("border");
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#0000008a] h-screen">
            <div className="w-[800px] h-[445px] rounded-md bg-white flex justify-between ">
                <div className="pt-10 px-[45px] pb-6 flex flex-col basis-8/12 ">
                    <h1>Xin chào</h1>
                    <h4 className="mb-3">Đăng nhập và tạo tài khoản</h4>
                    <InputForm
                        id="sign-in-gmail"
                        className={" mb-[10px] border-b"}
                        placeholder="abc@gmail.com"
                        value={inputGmail}
                        onInput={(e) => handleChangeInputGmail(e.target.value)}
                        required
                    />
                    <div
                        id="sign-in-password-parent"
                        className="bg-[#E8F2FE] flex items-center justify-center border-b">
                        <InputForm
                            id="sign-in-password"
                            placeholder="password"
                            // type="password"
                            type={nonePassword ? "password" : "text"}
                            className="grow"
                            value={inputPassword}
                            onInput={(e) =>
                                handleChangeInputPassword(e.target.value)
                            }
                            // required
                        />
                        <div
                            className="p-2 hover:cursor-pointer"
                            onClick={() => {
                                setNonePassword((prev) => !prev);
                            }}>
                            <EyeIcon />
                        </div>
                    </div>
                    {data?.data?.status === "ERR" && (
                        <span className="text-red-600">
                            {String(data?.data?.message)}
                        </span>
                    )}
                    <LoadingComponent isLoading={isPending}>
                        <ButtonComponent
                            size={40}
                            styleButton={
                                "bg-[#FF3945] w-full h-[48px] rounded mt-[26px] mb-[10px] active:bg-[#fa0f1e]"
                            }
                            textButton={"Đăng nhập"}
                            styleTextButton={
                                "text-[#fff] text-[15px] font-bold "
                            }
                            onClick={handleSubmitForm}
                            type="submit"
                        />
                    </LoadingComponent>

                    <p className="text-[#0D5CB6] text-[13px]">Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản?{" "}
                        <span
                            className="text-[#0D5CB6] text-[13px] cursor-pointer"
                            onClick={handleNavigateSignUp}>
                            Tạo tài khoản
                        </span>
                    </p>
                </div>
                <div className="w-[300px] flex justify-center flex-col items-center bg-[#deebff] gap-1 basis-4/12">
                    <img
                        src={imageLogo}
                        alt=""
                        className="w-[203px] h-[203px]"
                    />
                    <h4>Mua sắm tại Tiki</h4>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
