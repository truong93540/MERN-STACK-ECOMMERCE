import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

function ProductDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div className="min-w-[1024px] bg-[#efefef] min-h-[1000px]">
            <div className="max-w-6xl m-auto ">
                <h5>
                    <span className="font-medium cursor-pointer" onClick={() => navigate('/')}>
                        Trang chủ
                    </span>{' '}
                    - Chi tiết sản phẩm
                </h5>
                <div>
                    <ProductDetailsComponent idProduct={id} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage
