import { AiOutlineWarning } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const PaymentFailPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <div className="flex justify-center text-red-600 mb-4">
                    <AiOutlineWarning className="w-16 h-16" />
                </div>
                <h1 className="text-2xl font-bold text-red-700 mb-2">
                    Thanh toán không thành công
                </h1>
                <p className="text-gray-600 mb-6">
                    Rất tiếc! Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau hoặc
                    chọn phương thức khác.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
                    Quay lại trang chủ
                </button>
            </div>
        </div>
    )
}

export default PaymentFailPage
