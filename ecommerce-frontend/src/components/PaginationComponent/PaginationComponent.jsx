import { ArrowLeftIcon, ArrowRightIcon } from '../Icons/Icons'

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    const handleChangePage = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange?.(page)
        }
    }

    const renderPages = () => {
        let pages = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, '...', totalPages]
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages]
            } else {
                pages = [1, '...', currentPage, '...', totalPages]
            }
        }

        return pages.map((item, index) => {
            if (item === '...') {
                return (
                    <span key={`dot-${index}`} className="px-4 py-3 text-gray-500">
                        ...
                    </span>
                )
            }

            return (
                <button
                    key={item}
                    className={`px-4 py-3 rounded-md ${
                        item === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white hover:bg-[#F3F4F6]'
                    }`}
                    onClick={() => handleChangePage(item)}>
                    {item}
                </button>
            )
        })
    }

    return (
        <div className="flex gap-1 justify-center mt-4">
            <button
                className="px-4 py-3 hover:bg-[#F3F4F6] bg-white rounded-md"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}>
                <ArrowLeftIcon />
            </button>

            {renderPages()}

            <button
                className="px-4 py-3 hover:bg-[#F3F4F6] bg-white rounded-md"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}>
                <ArrowRightIcon />
            </button>
        </div>
    )
}

export default PaginationComponent
