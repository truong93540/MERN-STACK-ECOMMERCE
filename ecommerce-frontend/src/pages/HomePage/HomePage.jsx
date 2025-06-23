import { useQuery } from '@tanstack/react-query'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductServices from '../../services/ProductServices'
import Loading from '../../components/Loading/Loading'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const pageParam = Number(searchParams.get('page')) || 1
    const [page, setPage] = useState(pageParam)
    const [totalPage, setTotalPage] = useState(0)
    const [typeProduct, setTypeProducts] = useState([])
    const limit = 12

    const fetchProductAll = async (search, limit, page) => {
        const res = await ProductServices.getAllProduct(search, limit, page - 1)
        setTotalPage(res.totalPage)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductServices.getAllType()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
        return res
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    const {
        isLoading,
        data: products,
        // isFetching,
    } = useQuery({
        queryKey: ['products', searchDebounce, limit, page],
        queryFn: () => fetchProductAll(searchDebounce, limit, page),
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    })

    useEffect(() => {
        setSearchParams({ page })
    }, [page, setSearchParams])

    return (
        <div className="min-w-[1024px] min-h-96">
            <div className="max-w-6xl m-auto">
                <div className="flex flex-nowrap h-11 items-center ">
                    {typeProduct.map((item) => {
                        return <TypeProduct className="mr-4" name={item} key={item} />
                    })}
                </div>
            </div>
            <div className="bg-[#efefef]">
                <div className="max-w-6xl m-auto">
                    <SliderComponent arrImage={[slider1, slider2, slider3]} />
                    <Loading
                        spinning={isLoading && (!products?.data || products?.data.length === 0)}
                        tip="Đang tải sản phẩm..."
                        background={'bg-[#efefef]'}>
                        <div className="mt-6 grid grid-cols-6 gap-4 min-h-[100px]">
                            {(products?.data || []).map((product) => {
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
                        <div className="w-full text-center mt-4 mb-4"></div>
                    </Loading>
                    <PaginationComponent
                        currentPage={page}
                        totalPages={totalPage}
                        onPageChange={(newPage) => {
                            if (newPage !== page) setPage(newPage)
                        }}
                    />
                    <div className="pb-5"></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
