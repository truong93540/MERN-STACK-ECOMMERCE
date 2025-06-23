import { SearchIcon } from "../Icons/Icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function ButtonInputSearch(props) {
    const { textButton, placeholder, ...inputProps } = props;
    return (
        <form action="" method="get" className="flex w-full">
            <label htmlFor="default-search"></label>
            <InputComponent
                type="text"
                id="default-search"
                placeholder={placeholder}
                className="grow h-10 px-4 rounded-l-lg outline-none"
                {...inputProps}
            />

            <ButtonComponent
                textButton={textButton}
                type="submit"
                styleButton="text-white flex items-center bg-[#0F5CB6] px-4 rounded-r-lg"
                icon={<SearchIcon className="mt-[1px]" />}
            />
        </form>
    );
}

export default ButtonInputSearch;
