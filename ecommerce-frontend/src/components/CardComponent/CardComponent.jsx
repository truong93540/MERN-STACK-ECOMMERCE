import { StarIcon } from "../Icons/Icons";

function CardComponent() {
    return (
        <div className="bg-white border rounded-md overflow-hidden hover:shadow-md hover:cursor-pointer">
            <img
                src="https://down-vn.img.susercontent.com/file/sg-11134301-7rdvs-m01bhb1twkvn33_tn.webp"
                alt="iphone 16 promax"
            />
            <div className="p-2 ">
                <div className="text-sm font-medium text-[#000000cc] line-clamp-2">
                    Điện thoại Apple iPhone 16 Pro Max 256GB
                </div>
                <div className="text-[#ee4d2d] text-xs flex items-center mt-1">
                    <span>₫</span>
                    <span className="text-base mr-1">33.690.000</span>
                    <span className="px-1 py-[2px] bg-[#FEEEEA]">-4%</span>
                </div>
                <div className="text-xs flex items-center mt-2">
                    <span>
                        <StarIcon />
                    </span>
                    <span className="ml-[2px]">4.9</span>
                    <div className="ml-1 relative">
                        <span className="before:content-[''] before:absolute before:w-[0.75px] before:h-3 before:bg-[#cfcfcf] before:top-[2px]"></span>
                        <span className="pl-1">Đã bán 14,2k</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
