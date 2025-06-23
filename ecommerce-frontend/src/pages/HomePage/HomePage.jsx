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

function HomePage() {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [rowProduct, setRowProduct] = useState(1)
    const [allProducts, setAllProducts] = useState([])
    const [limit, setLimit] = useState(6)
    const [totalPage, setTotalPage] = useState(0)
    const productInRow = 6
    const arr = ['TV', 'Tu lanh', 'Laptop']
    const fetchProductAll = async (search, limit, productInRow) => {
        const res = await ProductServices.getAllProduct(search, limit, productInRow)
        console.log('res', res)
        setTotalPage(res.totalPage)
        return res
    }

    const {
        isLoading,
        data: products,
        isFetching,
    } = useQuery({
        queryKey: ['products', searchDebounce, limit],
        queryFn: () => fetchProductAll(searchDebounce, limit, productInRow),
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })

    useEffect(() => {
        if (products?.data) {
            if (rowProduct === 1) {
                setAllProducts(products.data)
            } else {
                setAllProducts((prev) => [...prev, ...products.data])
            }
        }
    }, [products, rowProduct])

    const handleLoadMore = () => {
        setLimit((prev) => prev + productInRow)
    }

    useEffect(() => {
        setRowProduct(1)
        setAllProducts([])
    }, [searchDebounce])

    return (
        <div className="min-w-[1024px] min-h-96">
            <div className="max-w-6xl m-auto">
                <div className="flex flex-nowrap h-11 items-center ">
                    {arr.map((item) => {
                        return <TypeProduct className="mr-4" name={item} key={item} />
                    })}
                </div>
            </div>
            <div className="bg-[#efefef]">
                <div className="max-w-6xl m-auto">
                    <SliderComponent arrImage={[slider1, slider2, slider3]} />
                    <Loading
                        spinning={isLoading && allProducts.length === 0}
                        tip="Đang tải sản phẩm..."
                        background={'bg-[#efefef]'}>
                        <div className="mt-6 grid grid-cols-6 gap-4 min-h-[100px]">
                            {allProducts.map((product) => {
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
                                )
                            })}
                        </div>
                        <div className="w-full text-center mt-4 mb-4">
                            {isFetching && allProducts.length > 0 && (
                                <Loading
                                    spinning={isFetching}
                                    tip="Đang tải thêm sản phẩm..."
                                    background={'bg-[#efefef]'}>
                                    <div className="min-h-[100px] "></div>
                                </Loading>
                            )}
                            {totalPage !== 1 && (
                                <button
                                    className="border border-[#0B74E5] text-[#0B74E5] w-60 h-[38px] rounded hover:text-[#fff] hover:bg-[#0D5CB6] mb-4"
                                    onClick={handleLoadMore}>
                                    Xem thêm
                                </button>
                            )}
                            <div></div>
                        </div>
                    </Loading>

                    {/* <NavBarComponent /> */}
                </div>
            </div>
        </div>
    )
}

export default HomePage
