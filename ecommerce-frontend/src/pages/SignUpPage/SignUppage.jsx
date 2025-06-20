import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/logo-login.png";
import { EyeIcon } from "../../components/Icons/Icons";
import * as UserServices from "../../services/UserServices";
import useMutationHook from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { Success, Error } from "../../components/Message/Message";

function SignUpPage() {
    const [nonePassword, setNonePassword] = useState(true);
    const [inputGmail, setInputGmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    const mutation = useMutationHook((data) => UserServices.signupUser(data));
    const [message, setMessage] = useState({ type: "", text: "" });

    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (data?.data?.status === "ERR") {
            return;
        }
        let timer;
        if (isSuccess) {
            setMessage({ type: "success", text: "Đăng ký thành công!" });
            timer = setTimeout(() => {
                setMessage({ type: "", text: "" });
                handleNavigateSignIn();
            }, 2000);

            return () => clearTimeout(timer);
        } else if (isError) {
            setMessage({
                type: "error",
                text: "Đăng ký thất bại, vui lòng thử lại.",
            });
            timer = setTimeout(() => {
                setMessage({ type: "", text: "" });
            }, 2000);
        }

        return () => clearTimeout(timer);
    }, [isSuccess, isError]);

    const navigate = useNavigate();

    const handleNavigateSignIn = () => {
        navigate("/sign-in");
    };

    const handleChangeInputGmail = (value) => {
        setInputGmail(value);
        if (value.length > 0) {
            const elementGmailSignIn = document.getElementById("sign-up-gmail");
            elementGmailSignIn.classList.remove("border-red-400");
            elementGmailSignIn.classList.remove("border");
        }
        // console.log("gmail", value);
    };

    const handleChangeInputPassword = (value) => {
        setInputPassword(value);
        if (value.length > 0) {
            const elementPasswordSignIn = document.getElementById(
                "sign-up-password-parent"
            );
            elementPasswordSignIn.classList.remove("border-red-400");
            elementPasswordSignIn.classList.remove("border");
        }
        // console.log("password", value);
    };

    const handleChangeConfirmInputPassword = (value) => {
        setInputConfirmPassword(value);
        if (value.length > 0) {
            const elementPasswordSignIn = document.getElementById(
                "sign-up-confirm-password-parent"
            );
            elementPasswordSignIn.classList.remove("border-red-400");
            elementPasswordSignIn.classList.remove("border");
        }
        // console.log("confirm password", value);
    };

    const handleSubmitForm = () => {
        if (
            inputGmail.length > 0 &&
            inputPassword.length > 0 &&
            inputConfirmPassword.length > 0
        ) {
            mutation.mutate({
                email: inputGmail,
                password: inputPassword,
                confirmPassword: inputConfirmPassword,
            });
            // console.log(
            //     `gmail: ${inputGmail} password: ${inputPassword} confirm password: ${inputConfirmPassword}`
            // );
        }
        if (inputGmail.length === 0) {
            const elementGmailSignUp = document.getElementById("sign-up-gmail");
            elementGmailSignUp.classList.add("border-red-400");
            elementGmailSignUp.classList.add("border");
        }
        if (inputPassword.length === 0) {
            const elementPasswordSignUp = document.getElementById(
                "sign-up-password-parent"
            );
            elementPasswordSignUp.classList.add("border-red-400");
            elementPasswordSignUp.classList.add("border");
        }
        if (inputConfirmPassword.length === 0) {
            const elementConfirmPasswordSignUp = document.getElementById(
                "sign-up-confirm-password-parent"
            );
            elementConfirmPasswordSignUp.classList.add("border-red-400");
            elementConfirmPasswordSignUp.classList.add("border");
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#0000008a] h-screen">
            {message?.type === "success" && <Success mes={message.text} />}
            {message?.type === "error" && <Error mes={message.text} />}
            <div className="w-[800px] h-[445px] rounded-md bg-white flex justify-between ">
                <div className="pt-10 px-[45px] pb-6 flex flex-col basis-8/12 ">
                    <h1>Xin chào</h1>
                    <h4>Đăng nhập và tạo tài khoản</h4>
                    <InputForm
                        className={"mb-[10px] border-b"}
                        placeholder="abc@gmail.com"
                        id="sign-up-gmail"
                        onInput={(e) => handleChangeInputGmail(e.target.value)}
                        value={inputGmail}
                    />
                    <div
                        id="sign-up-password-parent"
                        className="bg-[#E8F2FE] border-b flex items-center justify-center mb-[10px]">
                        <InputForm
                            placeholder="password"
                            // type="password"
                            type={nonePassword ? "password" : "text"}
                            className="grow"
                            id="sign-up-password"
                            value={inputPassword}
                            onInput={(e) =>
                                handleChangeInputPassword(e.target.value)
                            }
                        />
                        <div
                            className="p-2 hover:cursor-pointer"
                            onClick={() => {
                                setNonePassword((prev) => !prev);
                            }}>
                            <EyeIcon />
                        </div>
                    </div>
                    <div
                        id="sign-up-confirm-password-parent"
                        className="bg-[#E8F2FE] flex items-center justify-center border-b">
                        <InputForm
                            placeholder="password"
                            // type="password"
                            type={nonePassword ? "password" : "text"}
                            className="grow"
                            id="sign-up-confirm-password"
                            value={inputConfirmPassword}
                            onInput={(e) =>
                                handleChangeConfirmInputPassword(e.target.value)
                            }
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
                            textButton={"Đăng ký"}
                            styleTextButton={
                                "text-[#fff] text-[15px] font-bold "
                            }
                            onClick={handleSubmitForm}
                        />
                    </LoadingComponent>
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <span
                            className="text-[#0D5CB6] text-[13px] cursor-pointer"
                            onClick={handleNavigateSignIn}>
                            Đăng nhập
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

export default SignUpPage;
