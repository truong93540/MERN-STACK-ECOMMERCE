import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { LoadingIcon } from "../Icons/Icons";

function LoadingComponent({ isLoading = false, children }) {
    return isLoading === true ? (
        <ButtonComponent
            size={40}
            styleButton={
                "bg-[#FF3945] w-full h-[48px] rounded mt-[26px] mb-[10px] active:bg-[#fa0f1e]"
            }
            textButton={<LoadingIcon />}
            styleTextButton={"text-[#fff] text-[15px] font-bold "}
            type="submit"
        />
    ) : (
        <div>{children}</div>
    );
}

export default LoadingComponent;
