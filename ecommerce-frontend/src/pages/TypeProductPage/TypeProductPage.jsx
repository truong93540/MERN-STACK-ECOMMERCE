import { useLocation } from 'react-router-dom'
import * as ProductServices from '../../services/ProductServices'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'
import { useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'

function TypeProductPage() {
    const { state } = useLocation()
    const [products, setProduct] = useState()
    const [loading, setLoading] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(1)
    const limitOnePage = 10
    const searchProduct = useSelector((state) => state?.product.search)
    const searchDebounce = useDebounce(searchProduct, 1000)

    const fetchProductType = async (type, limit, page) => {
        setLoading(true)
        const res = await ProductServices.getProductType(type, limit, page)
        console.log('res', res)
        if (res?.status === 'OK') {
            setLoading(false)
            setProduct(res)
        } else {
            setLoading(false)
        }
        return res
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, limitOnePage, pageCurrent - 1)
        }
    }, [state, pageCurrent])

    return (
        <div>
            <div className="bg-[#efefef] pt-[10px] pb-3">
                <div className="flex flex-row max-w-6xl m-auto min-w-[1024px] gap-4 items-start min-h-[calc(100vh-154px)]">
                    <div className="w-2/12 bg-white border rounded-md">
                        <NavBarComponent />
                    </div>
                    <div className="w-10/12">
                        <Loading spinning={loading}>
                            <div className="flex gap-4">
                                {products?.data
                                    .filter((pro) => {
                                        if (searchDebounce === '') {
                                            return pro
                                        } else if (
                                            pro?.name
                                                .toLowerCase()
                                                ?.includes(searchDebounce?.toLocaleLowerCase())
                                        ) {
                                            return pro
                                        }
                                    })
                                    .map((product) => {
                                        return (
                                            <div className="w-[20%]">
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
                                            </div>
                                        )
                                    })}
                            </div>
                        </Loading>
                    </div>
                </div>
                <div className="mt-3 text-center mx-auto">
                    {products?.totalPage > 0 && (
                        <PaginationComponent
                            currentPage={products?.pageCurrent}
                            totalPages={products?.totalPage}
                            onPageChange={(newPage) => {
                                if (newPage !== pageCurrent) setPageCurrent(newPage)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TypeProductPage
