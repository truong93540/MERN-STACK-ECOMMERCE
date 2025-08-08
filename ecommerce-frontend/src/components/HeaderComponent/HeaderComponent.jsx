import { useNavigate } from 'react-router-dom'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { CartIcon, DownIcon, UserIcon } from '../Icons/Icons'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../Popper/Menu/Menu'
import { useEffect, useState } from 'react'
import { searchProduct } from '../../redux/slides/productSlide'
import Loading from '../Loading/Loading'

function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
    const [userName, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserName(user?.name)
        setAvatar(user?.avatar)
    }, [user])

    const userMenu = [
        {
            title: 'Thông tin người dùng',
            type: 'profile',
        },
        {
            title: 'Quản lý hệ thống',
            type: 'system_admin',
        },
        {
            title: 'Đơn hàng của tôi',
            type: 'my_order',
        },
        {
            title: 'Đăng xuất',
            type: 'logout',
        },
    ]

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div className="bg-[#1A94FF] min-w-[1024px] h-[68px]">
            <div className="flex flex-row items-center flex-nowrap max-w-6xl m-auto justify-between h-full">
                <div
                    className="basis-1/6 text-lg text-[#fff] font-bold text-left text-s cursor-pointer"
                    onClick={handleNavigateHome}>
                    TIKI
                </div>
                {!isHiddenSearch && (
                    <div className="basis-1/2 rounded-sm mx-3">
                        <ButtonInputSearch
                            textButton="Tìm kiếm"
                            placeholder="Tìm kiếm tại đây"
                            onChange={onSearch}
                            value={search}
                        />
                    </div>
                )}
                <div className="basis-1/3 text-white flex justify-between">
                    <div className="flex items-center cursor-pointer">
                        {user?.access_token ? (
                            <div className="flex gap-4 items-center ml-4">
                                {avatar === '' ? (
                                    <div>{user?.loading ? <div></div> : <UserIcon />}</div>
                                ) : (
                                    <div>
                                        <img
                                            src={avatar}
                                            alt="avatar"
                                            className="h-[40px] w-[40px] rounded-full object-cover"
                                        />
                                    </div>
                                )}

                                <Menu items={userMenu} user={user}>
                                    <div className="cursor-pointer">{userName || user.email}</div>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                {user?.loading ? (
                                    <div></div>
                                ) : (
                                    <div className="flex gap-4 items-center ml-4">
                                        <UserIcon />
                                        <div
                                            className="flex flex-col ml-2 "
                                            onClick={handleNavigateLogin}>
                                            <span>Đăng nhập/Đăng ký</span>
                                            <span className="flex items-center">
                                                Tài khoản
                                                <DownIcon />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {!isHiddenCart && (
                        <div
                            className="ml-5 flex items-center cursor-pointer"
                            onClick={() => navigate('/order')}>
                            <div className="relative">
                                <CartIcon />
                                {order?.orderItems?.length > 0 && (
                                    <span className="absolute top-[-4px] right-[-4px] bg-[#FF6357] w-[18px] h-[18px] rounded-full text-xs text-center border border-inherit">
                                        {order?.orderItems?.length}
                                    </span>
                                )}
                            </div>
                            <span className="ml-1 mt-2">Giỏ Hàng</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent
