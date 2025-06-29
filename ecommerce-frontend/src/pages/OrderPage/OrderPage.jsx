import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { AddIcon, RemoveIcon } from '../../components/Icons/Icons'
import {
    decreaseAmount,
    increaseAmount,
    enterInputOrderProduct,
    removeOrderProduct,
    removeAllOrderProduct,
} from '../../redux/slides/orderSlide'

function OrderPage() {
    const order = useSelector((state) => state.order)
    const [inputValues, setInputValues] = useState({})
    const [listChecked, setListChecked] = useState([])
    const dispatch = useDispatch()

    const handleChangCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }))
        } else if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct }))
        }
    }

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const onChange = (e) => {
        console.log(
            '!listChecked.includes(e.target.value) && e.target.checked',
            !listChecked.includes(e.target.value) && e.target.checked
        )
        if (!listChecked.includes(e.target.value) && e.target.checked) {
            setListChecked([...listChecked, e.target.value])
        } else {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        }
    }

    const handleChangCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => newListChecked.push(item?.product))
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
        // console.log('listChecked', listChecked)
    }

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    return (
        <div className="bg-[#f5f5fa] min-h-screen">
            <div className="max-w-6xl m-auto">
                <h3 className="font-medium">Giỏ hàng</h3>
                <div className="flex gap-4 items-start">
                    <div className=" w-9/12  ">
                        <div className="flex gap-2 bg-white p-3 rounded">
                            <span className="w-5/12 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={handleChangCheckAll}
                                    checked={listChecked?.length === order?.orderItems?.length}
                                />
                                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div className="w-7/12 flex items-center justify-between ">
                                <div className="flex items-center grow text-center gap-1">
                                    <span className="w-4/12">Đơn giá</span>
                                    <span className="w-4/12">Số lượng</span>
                                    <span className="w-4/12">Thành tiền</span>
                                </div>
                                <span
                                    className="cursor-pointer p-1 "
                                    onClick={handleRemoveAllOrder}>
                                    <AiOutlineDelete size={20} />
                                </span>
                            </div>
                        </div>

                        {order?.orderItems.map((orderItem) => {
                            return (
                                <div
                                    className="flex gap-2 bg-white p-3 rounded mt-3"
                                    key={orderItem?.product}>
                                    <span className="w-5/12 flex items-center gap-2">
                                        <div className="w-3/12 flex items-center">
                                            <input
                                                type="checkbox"
                                                name="checkbox-allProduct"
                                                id="checkbox-allProduct"
                                                onChange={onChange}
                                                value={orderItem?.product}
                                                checked={listChecked.includes(orderItem?.product)}
                                            />
                                            <div className="ml-2 max-h-20">
                                                <img
                                                    className="w-full max-h-20 object-contain"
                                                    src={orderItem?.image}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <span className="w-9/12 line-clamp-3">
                                            {orderItem?.name}
                                        </span>
                                    </span>
                                    <div className="w-7/12 flex items-center justify-between">
                                        <div className="flex items-center grow text-center gap-1">
                                            <span className="w-4/12">
                                                {orderItem?.price.toLocaleString()}
                                            </span>
                                            <div className="w-4/12 flex justify-center">
                                                <div className="w-full flex justify-center">
                                                    <ButtonComponent
                                                        icon={<RemoveIcon />}
                                                        styleButton={
                                                            'border w-8 h-8 flex justify-center items-center'
                                                        }
                                                        size={20}
                                                        onClick={() =>
                                                            handleChangCount(
                                                                'decrease',
                                                                orderItem?.product
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        type="number"
                                                        value={
                                                            inputValues[orderItem.product] ??
                                                            orderItem.amount
                                                        }
                                                        onChange={(e) => {
                                                            const value = e.target.value
                                                            // Cập nhật UI (cho phép nhập bất cứ giá trị nào, kể cả 0, rỗng)
                                                            setInputValues((prev) => ({
                                                                ...prev,
                                                                [orderItem.product]: value,
                                                            }))
                                                        }}
                                                        onBlur={(e) => {
                                                            const value = Number(e.target.value)
                                                            const validValue = Math.max(
                                                                1,
                                                                Math.min(100, value || 1)
                                                            ) // Nếu rỗng hoặc 0 → đưa về 1
                                                            dispatch(
                                                                enterInputOrderProduct({
                                                                    idProduct: orderItem.product,
                                                                    orderInputValue: validValue,
                                                                })
                                                            )
                                                            setInputValues((prev) => ({
                                                                ...prev,
                                                                [orderItem.product]: validValue,
                                                            }))
                                                        }}
                                                        className="h-8 w-8 text-center border [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                                                    />
                                                    <ButtonComponent
                                                        icon={<AddIcon />}
                                                        styleButton={
                                                            'border w-8 h-8 flex justify-center items-center'
                                                        }
                                                        onClick={() =>
                                                            handleChangCount(
                                                                'increase',
                                                                orderItem?.product
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <span className="w-4/12 text-red-500">
                                                {(
                                                    orderItem?.price * orderItem?.amount
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <span
                                            className="cursor-pointer p-1"
                                            onClick={() => handleDeleteOrder(orderItem?.product)}>
                                            <AiOutlineDelete size={20} />
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-3/12">
                        <div className="bg-white  rounded">
                            <div className="text-sm border-b p-4">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span className="font-bold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Giảm giá</span>
                                    <span className="font-bold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Thuế</span>
                                    <span className="font-bold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí giao hàng</span>
                                    <span className="font-bold">0</span>
                                </div>
                            </div>
                            <div className="flex p-4">
                                <span className="w-6/12">Tổng tiền</span>
                                <div className="w-6/12">
                                    <div className="text-2xl font-bold text-red-500">0213</div>
                                    <div className="text-[11px]">(Đã bao gồm VAT nếu có)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex ">
                                <div className="mt-2 bg-red-500 text-white py-2 w-[60%] m-auto text-center rounded cursor-pointer">
                                    Tổng tiền
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
