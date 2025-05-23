import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";

function HomePage() {
    const arr = ["TV", "Tu lanh", "Laptop"];
    return (
        <div className="min-w-[1024px]">
            <div className="max-w-6xl m-auto">
                <div className="flex flex-nowrap h-11 items-center ">
                    {arr.map((item) => {
                        return (
                            <TypeProduct
                                className="mr-4"
                                name={item}
                                key={item}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="bg-[#efefef]">
                <div className="max-w-6xl m-auto">
                    <SliderComponent arrImage={[slider1, slider2, slider3]} />
                    <div className="mt-6 grid grid-cols-6 gap-4">
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
                    <div className="w-full text-center mt-4 mb-4">
                        <button className="border border-[#0B74E5] text-[#0B74E5] w-60 h-[38px] rounded hover:text-[#fff] hover:bg-[#0D5CB6] ">
                            Xem thêm
                        </button>
                    </div>

                    {/* <NavBarComponent /> */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
