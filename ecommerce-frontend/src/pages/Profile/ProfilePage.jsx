import { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";
import { updateUser } from "../../redux/slides/userSlide";
import * as UserServices from "../../services/UserServices";
import { getBase64 } from "../../util";

const ProfilePage = () => {
    const user = useSelector((state) => state.user);

    const [email, setEmail] = useState(user?.email);
    const [name, setName] = useState(user?.name);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar);
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    const handOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handOnchangeName = (e) => {
        setName(e.target.value);
    };
    const handOnchangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handOnchangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handOnchangeAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await getBase64(file);
            setAvatar(base64);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await UserServices.updateUser(
                user.id,
                {
                    email,
                    name,
                    phone,
                    address,
                    avatar,
                },
                user.access_token
            );
            const detailRes = await UserServices.getDetailsUser(
                user.id,
                user.access_token
            );
            dispatch(
                updateUser({
                    ...user,
                    ...detailRes?.data?.data,
                    access_token: user.access_token,
                })
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật user:", error);
            alert("Có lỗi khi cập nhật thông tin!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl text-base mx-auto text-[#000] h-[500px]">
            <div className="my-[4px]">Thông tin người dùng</div>

            <div className="border w-[600px] mx-auto p-7 rounded-xl gap-7 h-[360px] relative">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <MoonLoader size={28} />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center ">
                            <label
                                className="font-semibold w-1/6"
                                htmlFor="name">
                                Name
                            </label>
                            <InputForm
                                className={
                                    "border-b bg-white w-5/6 mb-0 focus:bg-[#1a94ff]/[10%]"
                                }
                                value={name}
                                id="name"
                                onChange={handOnchangeName}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <label
                                className="font-semibold w-1/6"
                                htmlFor="email">
                                Email
                            </label>
                            <InputForm
                                className={
                                    "border-b bg-white w-5/6 mb-0 focus:bg-[#1a94ff]/[10%]"
                                }
                                value={email}
                                id="email"
                                onChange={handOnchangeEmail}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <label
                                className="font-semibold w-1/6"
                                htmlFor="phone">
                                Phone
                            </label>
                            <InputForm
                                className={
                                    "border-b bg-white w-5/6 mb-0 focus:bg-[#1a94ff]/[10%]"
                                }
                                value={phone}
                                id="phone"
                                onChange={handOnchangePhone}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <label
                                className="font-semibold w-1/6"
                                htmlFor="address">
                                Address
                            </label>
                            <InputForm
                                className={
                                    "border-b bg-white w-5/6 mb-0 focus:bg-[#1a94ff]/[10%]"
                                }
                                value={address}
                                id="address"
                                onChange={handOnchangeAddress}
                            />
                        </div>
                        <div className="flex items-center mt-2">
                            <label
                                className="font-semibold w-1/6"
                                htmlFor="avatar">
                                Avatar
                            </label>
                            <InputForm
                                className={
                                    "border-b bg-white w-5/6  mb-0 focus:bg-[#1a94ff]/[10%]"
                                }
                                id="avatar"
                                onChange={handOnchangeAvatar}
                                type="file"
                                name="img"
                            />
                        </div>
                        <ButtonComponent
                            styleButton={
                                "rounded active:bg-[#1a94ff] text-[#1a94ff] active:text-white border border-[#1a94ff] w-fit absolute right-[12px] bottom-[12px] px-[16px] py-[8px]"
                            }
                            textButton={"Cập nhật"}
                            styleTextButton={
                                "text-[15px] font-bold leading-none"
                            }
                            onClick={handleUpdate}
                            type="submit"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
