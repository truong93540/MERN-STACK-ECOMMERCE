import { useLocation } from 'react-router-dom'
import * as ProductServices from '../../services/ProductServices'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
// import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'

function TypeProductPage() {
    const { state } = useLocation()
    const [products, setProduct] = useState()
    const [loading, setLoading] = useState(false)

    const fetchProductType = async (type) => {
        setLoading(true)
        const res = await ProductServices.getProductType(type)
        if (res?.status === 'OK') {
            setLoading(false)
            setProduct(res?.data)
        } else {
            setLoading(false)
        }
        return res
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])

    console.log('loading', loading)

    return (
        <Loading spinning={loading}>
            <div>
                <div className="bg-[#efefef] pt-[10px] min-h-screen">
                    <div className="flex flex-row max-w-6xl m-auto min-w-[1024px] gap-4 items-start">
                        <div className="basis-2/12 bg-white border rounded-md">
                            <NavBarComponent />
                        </div>
                        <div className="basis-10/12 grid grid-cols-5 gap-4">
                            {products?.map((product) => {
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
                                        id={product._id}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-3 text-center mx-auto">
                        <PaginationComponent currentPage={1} totalPages={100} />
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage
