// import { useState } from "react";

import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

function TypeProductPage() {
    // const [isOpen, setIsOpen] = useState(false);
    // const onChange = () => {};

    return (
        <div>
            <div className="bg-[#efefef] pt-[10px]">
                <div className="flex flex-row max-w-6xl m-auto min-w-[1024px] gap-4">
                    <div className="basis-2/12 bg-white p-[10px] border rounded-md">
                        <NavBarComponent />
                    </div>
                    <div className="basis-10/12 grid grid-cols-5 gap-4">
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                </div>
                <div className="mt-3 text-center mx-auto">
                    <PaginationComponent defaultCurrent={1} total={100} />
                </div>
            </div>
        </div>
    );
}

export default TypeProductPage;
