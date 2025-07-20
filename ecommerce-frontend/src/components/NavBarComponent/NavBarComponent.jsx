import { useEffect, useState } from 'react'
import { StarIcon, StarIconWhite } from '../Icons/Icons'
import * as ProductServices from '../../services/ProductServices'
import { useLocation, useNavigate } from 'react-router-dom'

function NavBarComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [typeProduct, setTypeProducts] = useState([])
    const [selectedType, setSelectedType] = useState('')

    const currentSlug = location.pathname.split('/product/')[1] || ''

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

    useEffect(() => {
        if (typeProduct.length > 0 && currentSlug) {
            const matched = typeProduct.find((item) => slugify(item) === currentSlug)
            if (matched) {
                setSelectedType(matched)
            }
        }
    }, [typeProduct, currentSlug])

    const slugify = (string) => {
        const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
        const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return string
            .toString()
            .toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
            .replace(/đ/gi, 'd')
            .replace(/\s+/g, '-')
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            .replace(/&/g, '-and-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
    }

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={`text-xs font-normal cursor-pointer w-full pl-4 pr-3 py-2
                                ${
                                    slugify(option) === currentSlug
                                        ? 'bg-blue-400 text-white'
                                        : 'text-[#38383D] hover:bg-blue-400 hover:text-white'
                                }
                            `}
                            onClick={() => {
                                setSelectedType(option)
                                navigate(`/product/${slugify(option)}`, { state: option })
                            }}>
                            {option}
                        </div>
                    )
                })
            case 'checkbox':
                return options.map((option, index) => {
                    return (
                        <div key={index}>
                            <input
                                disabled
                                id={option.value}
                                type="checkbox"
                                value={option.value}
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    )
                })
            case 'star':
                return options.map((option, index) => {
                    const starGold = []
                    const starWhite = []
                    for (let i = 0; i < option; i++) {
                        starGold.push(0)
                    }
                    for (let i = option + 1; i <= 5; i++) {
                        starWhite.push(0)
                    }

                    return (
                        <div key={index} className="flex items-center">
                            {starGold.map((item, index) => {
                                return <StarIcon width="12px" height="12px" key={index} />
                            })}

                            {starWhite.map((item, index) => {
                                return <StarIconWhite width="12px" height="12px" key={index} />
                            })}
                            <span>Từ {option} sao</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option, index) => {
                    return (
                        <div key={index} className="rounded-[10px] bg-[#EEEEEE] text-[#38383D] p-1">
                            {option}
                        </div>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div className="bg-white pt-3 rounded">
            <h4 className="text-[#38383D] text-sm font-medium px-3">Danh mục</h4>
            <div className=" mt-2">{renderContent('text', [...typeProduct])}</div>
        </div>
    )
}

export default NavBarComponent
