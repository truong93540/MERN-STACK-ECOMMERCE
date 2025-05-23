import { useState } from "react";

import imageProduct from "../../assets/images/test.webp";
import imageProductSmall from "../../assets/images/imgagesmall.webp";
import { AddIcon, RemoveIcon, StarIcon } from "../Icons/Icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function ProductDetailsComponent() {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        let value = e.target.value;

        if (value === "") {
            setQuantity("");
            return;
        }

        let numValue = parseInt(value);

        if (!isNaN(numValue)) {
            setQuantity(Math.max(1, Math.min(100, numValue)));
        }
    };

    return (
        <div className=" bg-white rounded mt-1 mb-4 ">
            <div className="py-4 flex ">
                <div className="basis-5/12 px-4 border-r">
                    <div className=" ">
                        <img src={imageProduct} alt="Product" />
                    </div>
                    <div className="flex pt-[10px] justify-between">
                        <div className="basis-2/12 bg-white">
                            <img
                                src={imageProductSmall}
                                alt="Small"
                                className=" w-16 h-16 object-contain mx-auto"
                            />
                        </div>
                        <div className="basis-2/12 bg-white">
                            <img
                                src={imageProductSmall}
                                alt="Small"
                                className=" w-16 h-16 object-contain mx-auto"
                            />
                        </div>
                        <div className="basis-2/12 bg-white">
                            <img
                                src={imageProductSmall}
                                alt="Small"
                                className=" w-16 h-16 object-contain mx-auto"
                            />
                        </div>
                        <div className="basis-2/12 bg-white">
                            <img
                                src={imageProductSmall}
                                alt="Small"
                                className=" w-16 h-16 object-contain mx-auto"
                            />
                        </div>
                        <div className="basis-2/12 bg-white">
                            <img
                                src={imageProductSmall}
                                alt="Small"
                                className=" w-16 h-16 object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>
                <div className="basis-7/12 mr-2 pl-2">
                    <h1 className="text-[#242424] text-2xl font-normal leading-8 break-words">
                        Điện thoại Apple iPhone 15 128GB
                    </h1>
                    <div className="flex gap-1 items-center">
                        <StarIcon width="12px" height="12px" />
                        <StarIcon width="12px" height="12px" />
                        <StarIcon width="12px" height="12px" />
                        <StarIcon width="12px" height="12px" />
                        <StarIcon width="12px" height="12px" />
                        <span className="text-[15px] leading-6 text-[#787878]">
                            {" "}
                            | 9,2k Sold
                        </span>
                    </div>
                    <div className="bg-[#FAFAFA] rounded ">
                        <h1 className="text-[32px] leading-10 font-medium p-[10px] mt-[10px] ">
                            ₫19.890.000
                        </h1>
                    </div>
                    <div>
                        <span>Giao đến </span>
                        <span className="underline text-[15px] leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                            Tân Dân, An Lão, Hải Phòng
                        </span>
                        -
                        <span className="text-[#0B74E5] text-base leading-6 font-medium">
                            Đổi địa chỉ
                        </span>
                    </div>
                    <div className="mt-[10px] mb-5 py-3 border-y border-[#e5e5e5] ">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <label
                                htmlFor="quantity-input"
                                className="mb-2 block">
                                Số lượng:
                            </label>
                            <div className="flex items-center">
                                <ButtonComponent
                                    icon={<RemoveIcon />}
                                    styleButton={"border h-11 p-3"}
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            Math.max(1, prev - 1)
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    value={quantity}
                                    name=""
                                    id="quantity-input"
                                    className="h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center py-2.5 border"
                                    min="1"
                                    max="100"
                                    onChange={handleChange}
                                />
                                <ButtonComponent
                                    icon={<AddIcon />}
                                    styleButton={"border h-11 p-3"}
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            Math.min(100, prev + 1)
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-3">
                        <ButtonComponent
                            size={40}
                            styleButton={
                                "bg-[#FF3945] w-[220px] h-[48px] rounded"
                            }
                            textButton={"Chọn mua"}
                            styleTextButton={
                                "text-[#fff] text-[15px] font-bold"
                            }
                        />
                        <ButtonComponent
                            size={40}
                            styleButton={
                                "bg-[#FFF] w-[220px] h-[48px] rounded border border-[#0D5CB6]"
                            }
                            textButton={"Mua trả sau"}
                            styleTextButton={"text-[#0D5CB6] text-[15px]"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent;
