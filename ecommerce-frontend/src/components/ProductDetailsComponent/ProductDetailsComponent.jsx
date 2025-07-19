import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { AddIcon, RemoveIcon, StarIcon } from '../Icons/Icons'
import * as ProductServices from '../../services/ProductServices'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import Loading from '../Loading/Loading'
import { addOrderProduct } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../util'
import * as message from '../../components/Message/Message'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'

function ProductDetailsComponent({ idProduct }) {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const fetchGetProductDetails = async (id) => {
        if (id) {
            const res = await ProductServices.getDetailProduct(id)
            return res.data
        }
    }

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: () => fetchGetProductDetails(idProduct),
        enabled: !!idProduct,
        refetchOnWindowFocus: false,
    })

    const handleChange = (e) => {
        let value = e.target.value

        if (value === '') {
            setNumProduct('')
            return
        }

        let numValue = parseInt(value)
        if (numValue > productDetails.countInStock) {
            setErrorMsg(`Trong kho chỉ còn tối đa ${productDetails.countInStock} sản phẩm`)
            numValue = productDetails.countInStock
        }

        if (!isNaN(numValue)) {
            setNumProduct(Math.max(1, Math.min(100, numValue)))
        }
    }

    const renderStar = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75
        const totalStars = 5

        for (let i = 0; i < totalStars; i++) {
            if (i < fullStars) {
                stars.push(<StarIcon key={i} width="12px" height="12px" fill="#f59e0b" />) // màu vàng
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<StarIcon key={i} width="12px" height="12px" fill="url(#half)" />)
            } else {
                stars.push(<StarIcon key={i} width="12px" height="12px" fill="#d1d5db" />) // màu xám
            }
        }

        return stars
    }

    useEffect(() => {
        let timer
        if (successMsg || errorMsg) {
            timer = setTimeout(() => {
                setSuccessMsg('')
                setErrorMsg('')
            }, 3000)
        }
        return () => clearTimeout(timer)
    }, [successMsg, errorMsg])

    useEffect(() => {
        initFacebookSDK()
    }, [])

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            if (productDetails?.countInStock > 0) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: productDetails?.name,
                            amount: numProduct,
                            image: productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            countInStock: productDetails?.countInStock,
                        },
                    })
                )
                setSuccessMsg('Thêm sản phẩm vào giỏ hàng thành công')
            } else {
                setErrorMsg('Không đủ sản phẩm trong kho để đặt hàng')
            }
        }
    }

    return (
        <Loading spinning={isLoading}>
            {errorMsg && <message.Error mes={errorMsg} />}
            {successMsg && <message.Success mes={successMsg} />}
            <div className=" bg-white rounded mt-1 mb-4 min-h-[100px]">
                <div className="py-4 flex ">
                    <div className="basis-5/12 px-4 border-r">
                        <div className="h-96 flex justify-center items-center">
                            <img
                                src={productDetails?.image}
                                alt="Product"
                                className="h-full object-contain"
                            />
                        </div>
                        <div className="flex pt-[10px] justify-between">
                            <div className="basis-2/12 bg-white">
                                <img
                                    src={productDetails?.image}
                                    alt="Small"
                                    className=" w-16 h-16 object-contain mx-auto"
                                />
                            </div>
                            <div className="basis-2/12 bg-white">
                                <img
                                    src={productDetails?.image}
                                    alt="Small"
                                    className=" w-16 h-16 object-contain mx-auto"
                                />
                            </div>
                            <div className="basis-2/12 bg-white">
                                <img
                                    src={productDetails?.image}
                                    alt="Small"
                                    className=" w-16 h-16 object-contain mx-auto"
                                />
                            </div>
                            <div className="basis-2/12 bg-white">
                                <img
                                    src={productDetails?.image}
                                    alt="Small"
                                    className=" w-16 h-16 object-contain mx-auto"
                                />
                            </div>
                            <div className="basis-2/12 bg-white">
                                <img
                                    src={productDetails?.image}
                                    alt="Small"
                                    className=" w-16 h-16 object-contain mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="basis-7/12 mr-2 pl-2">
                        <h1 className="text-[#242424] text-2xl font-normal leading-8 break-words">
                            {productDetails?.name}
                        </h1>
                        <div className="flex gap-1 items-center">
                            {renderStar(productDetails?.rating)}
                            <span className="text-[15px] leading-6 text-[#787878]">
                                {' '}
                                | Đã bán: {productDetails?.sold}
                            </span>
                        </div>
                        <div className="bg-[#FAFAFA] rounded ">
                            <h1 className="text-[32px] leading-10 font-medium p-[10px] mt-[10px] ">
                                ₫ {convertPrice(productDetails?.price)}
                            </h1>
                        </div>
                        <div>
                            <span>Giao đến </span>
                            <span className="underline text-[15px] leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                {user?.address}
                            </span>
                            <span> - </span>
                            <span className="text-[#0B74E5] text-base leading-6 font-medium">
                                Đổi địa chỉ
                            </span>
                        </div>
                        <LikeButtonComponent
                            dataHref={
                                process.env.REACT_APP_IS_LOCAL
                                    ? `https://developers.facebook.com/docs/plugins/`
                                    : window.location.href
                            }
                        />
                        <div className="mt-[10px] mb-5 py-3 border-y border-[#e5e5e5] ">
                            <div>Còn trong kho: {productDetails?.countInStock}</div>
                            <form action="" onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="quantity-input" className="mb-2 block">
                                    Số lượng:
                                </label>
                                <div className="flex items-center">
                                    <ButtonComponent
                                        icon={<RemoveIcon />}
                                        styleButton={'border h-11 p-3'}
                                        onClick={() =>
                                            setNumProduct((prev) => Math.max(1, prev - 1))
                                        }
                                    />
                                    <input
                                        type="number"
                                        value={numProduct}
                                        name=""
                                        id="quantity-input"
                                        className="h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center py-2.5 border"
                                        min="1"
                                        max={productDetails?.countInStock}
                                        onChange={handleChange}
                                        onBlur={() => {
                                            if (numProduct === '') {
                                                setNumProduct(1)
                                            }
                                        }}
                                    />
                                    <ButtonComponent
                                        icon={<AddIcon />}
                                        styleButton={'border h-11 p-3'}
                                        onClick={() =>
                                            setNumProduct((prev) => {
                                                if (prev === productDetails?.countInStock) {
                                                    setErrorMsg(
                                                        'Không đủ sản phẩm trong kho để đặt hàng'
                                                    )
                                                    return prev
                                                }
                                                return Math.min(
                                                    productDetails?.countInStock,
                                                    prev + 1
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center gap-3">
                            <ButtonComponent
                                size={40}
                                styleButton={
                                    'bg-[#FF3945] w-[220px] h-[48px] rounded active:scale-95 duration-150'
                                }
                                textButton={'Chọn mua'}
                                styleTextButton={'text-[#fff] text-[15px] font-bold'}
                                onClick={handleAddOrderProduct}
                            />
                            <ButtonComponent
                                size={40}
                                styleButton={
                                    'bg-[#FFF] w-[220px] h-[48px] rounded border border-[#0D5CB6]'
                                }
                                textButton={'Mua trả sau'}
                                styleTextButton={'text-[#0D5CB6] text-[15px]'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CommentComponent
                dataHref={
                    process.env.REACT_APP_IS_LOCAL
                        ? `https://developers.facebook.com/docs/plugins/comments#configurator`
                        : window.location.href
                }
                width={'100%'}
            />
        </Loading>
    )
}

export default ProductDetailsComponent
