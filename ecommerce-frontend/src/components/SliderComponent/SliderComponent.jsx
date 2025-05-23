import { useRef } from "react";
import Slider from "react-slick";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons/Icons";

function SliderComponent({ arrImage }) {
    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false,
        // className: "h-[150px]",
    };
    return (
        <div className="relative">
            <Slider
                ref={(slider) => {
                    sliderRef = slider;
                }}
                {...settings}>
                {arrImage.map((image) => (
                    <img
                        src={image}
                        className="w-full h-[340px] object-fill"
                        key={image}
                        alt="slide"
                    />
                ))}
            </Slider>
            <div className="mt-5">
                <button
                    className="button absolute top-40 left-3 rounded-full bg-[#ffffff80] text-white"
                    onClick={previous}>
                    <ArrowLeftIcon className={"w-6 h-6 fill-white"} />
                </button>
                <button
                    className="button absolute top-40 right-3 rounded-full bg-[#ffffff80] text-white"
                    onClick={next}>
                    <ArrowRightIcon className={"w-6 h-6 fill-white"} />
                </button>
            </div>
        </div>
    );
}

export default SliderComponent;
