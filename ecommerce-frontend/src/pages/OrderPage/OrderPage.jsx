import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

function OrderPage({ count = 1 }) {
    const onChange = (e) => {
        console.log(`checked = ${e.target.value}`)
    }
    const handleChangCount = () => {}
    const handleChangCheckAll = () => {}

    return (
        <div className="bg-[#f5f5fa] min-h-screen">
            <div className="max-w-6xl m-auto">
                <h3 className="font-medium">Giỏ hàng</h3>
                <div className="flex gap-4 items-start">
                    <div className=" w-9/12  ">
                        <div className="flex gap-2 bg-white p-3 rounded">
                            <span className="w-5/12 flex items-center gap-2">
                                <input type="checkbox" name="" id="" />
                                <span>Tất cả ({count} sản phẩm)</span>
                            </span>
                            <div className="w-7/12 flex items-center justify-between">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <span className="cursor-pointer p-1">
                                    <AiOutlineDelete size={20} />
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 bg-white p-3 rounded mt-3">
                            <span className="w-5/12 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="checkbox-allProduct"
                                    id="checkbox-allProduct"
                                />
                                <div className="w-20 h-20">
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134202-7qukw-lf9lb20lp6c783@resize_w1750_nl.webp"
                                        alt=""
                                    />
                                </div>
                                <span>Name sản phẩm</span>
                            </span>
                            <div className="w-7/12 flex items-center justify-between">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <span className="cursor-pointer p-1">
                                    <AiOutlineDelete size={20} />
                                </span>
                            </div>
                        </div>
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
