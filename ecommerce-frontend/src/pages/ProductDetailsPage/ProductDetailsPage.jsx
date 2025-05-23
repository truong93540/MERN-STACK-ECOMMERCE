import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

function ProductDetailsPage() {
    return (
        <div className="min-w-[1024px] bg-[#efefef] min-h-[1000px]">
            <div className="max-w-6xl m-auto ">
                <h5>Trang chủ</h5>
                <div>
                    <ProductDetailsComponent />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
