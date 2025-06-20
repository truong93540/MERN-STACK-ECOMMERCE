import { useQuery } from "@tanstack/react-query";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductServices from "../../services/ProductServices";

function HomePage() {
    const arr = ["TV", "Tu lanh", "Laptop"];
    const fetchProductAll = async () => {
        return await ProductServices.getAllProduct();
    };
    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });
    return (
        <div className="min-w-[1024px] min-h-96">
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
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    sold={product.sold}
                                    discount={product.discount}
                                />
                            );
                        })}
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
