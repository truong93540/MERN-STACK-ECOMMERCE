import { StarIcon } from '../Icons/Icons'

function CardComponent(props) {
    const { countInStock, description, image, name, price, rating, type, discount, sold } = props
    return (
        <div className="bg-white border rounded-md overflow-hidden hover:shadow-md hover:cursor-pointer">
            <div className="h-[200px] flex items-center justify-center">
                <img
                    src={`${image}`}
                    alt="iphone 16 promax"
                    className="object-contain h-full h-full"
                />
            </div>
            <div className="p-2 ">
                <div className="text-sm font-medium text-[#000000cc] line-clamp-2 h-10">{name}</div>
                <div className="text-[#ee4d2d] text-xs flex items-center mt-1">
                    <span>₫</span>
                    <span className="text-base mr-1">{price.toLocaleString()}</span>
                    <span className="px-1 py-[2px] bg-[#FEEEEA]">-{discount || 5}%</span>
                </div>
                <div className="text-xs flex items-center mt-2">
                    <span>
                        <StarIcon />
                    </span>
                    <span className="ml-[2px]">{rating}</span>
                    <div className="ml-1 relative">
                        <span className="before:content-[''] before:absolute before:w-[0.75px] before:h-3 before:bg-[#cfcfcf] before:top-[2px]"></span>
                        <span className="pl-1">Đã bán {sold || 1000}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComponent
