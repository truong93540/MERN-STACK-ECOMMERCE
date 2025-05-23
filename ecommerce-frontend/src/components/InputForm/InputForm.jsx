// import { useState } from "react";

function InputForm(props) {
    const { placeholder = "Nhập text", className, ...rests } = props;
    return (
        <input
            type="text"
            name=""
            id=""
            placeholder={placeholder}
            className={` focus:outline-none  bg-[#E8F2FE] px-2 py-1 ${
                className || ""
            }`}
            {...rests}
        />
    );
}

export default InputForm;
