import { useState } from 'react'
import { AiOutlineAppstore, AiOutlineDown, AiOutlineUser } from 'react-icons/ai'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'

const AdminPage = () => {
    const [submenuOpen, setSubmenuOpen] = useState([])
    const [selectedMenu, setSelectedMenu] = useState(0)
    const [selectedSubMenu, setSelectedSubMenu] = useState(null)
    const [keySelected, setKeySelected] = useState(null)

    const Menus = [
        {
            title: 'Người dùng',
            keySelected: 'users',
            icon: <AiOutlineUser />,
            subMenu: false,
            subMenuItems: [
                { title: 'Submenu 1', content: 'Người dùng 1' },
                { title: 'Submenu 2', content: 'Người dùng 2' },
                { title: 'Submenu 3', content: 'Người dùng 3' },
            ],
        },
        {
            title: 'Sản phẩm',
            subMenu: false,
            keySelected: 'products',
            subMenuItems: [
                { title: 'Submenu 1', content: 'Nội dung Sản phẩm 1' },
                { title: 'Submenu 2', content: 'Nội dung Sản phẩm 2' },
                { title: 'Submenu 3', content: 'Nội dung Sản phẩm 3' },
            ],
        },
    ]

    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return <AdminUser />
            case 'products':
                return <AdminProduct />
            default:
                return <AdminUser />
        }
    }

    const handleToggle = (index) => {
        setSubmenuOpen((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    const handleSelectMenu = (index) => {
        setKeySelected(Menus[index].keySelected)
        setSelectedMenu(index)
        setSelectedSubMenu(null)
    }

    const handleSelectSubMenu = (menuIndex, subIndex) => {
        setSelectedMenu(menuIndex)
        setSelectedSubMenu(subIndex)
    }

    return (
        <>
            <HeaderComponent isHiddenSearch={true} isHiddenCart={true} />
            <div className="flex">
                <div className="h-screen border-r-[1px] w-72 bg-stone-50 select-none">
                    {Menus.map((menu, index) => (
                        <div key={index}>
                            <li
                                className={`text-sm flex items-center justify-between gap-x-4 cursor-pointer p-2 hover:bg-blue-200 ps-5
                                ${
                                    selectedMenu === index && selectedSubMenu === null
                                        ? 'text-blue-500 border-r-[3px] border-blue-400 bg-blue-100'
                                        : ''
                                }
                            `}
                                onClick={() => {
                                    handleToggle(index)
                                    handleSelectMenu(index)
                                }}>
                                <div className="flex items-center">
                                    <span className="text-2xl block">
                                        {menu.icon ? menu.icon : <AiOutlineAppstore />}
                                    </span>
                                    <span className="ml-2 ">{menu.title}</span>
                                </div>
                                {menu.subMenu && (
                                    <div>
                                        <AiOutlineDown
                                            className={
                                                submenuOpen.includes(index)
                                                    ? 'transition-transform duration-200 rotate-180'
                                                    : 'transition-transform duration-200'
                                            }
                                        />
                                    </div>
                                )}
                            </li>
                            {menu.subMenu && submenuOpen.includes(index) && (
                                <ul>
                                    {menu.subMenuItems.map((subMenuItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className={`text-sm flex justify-between items-center gap-x-4 cursor-pointer p-2 bg-white hover:bg-blue-50 ps-8
                                            ${
                                                selectedMenu === index &&
                                                selectedSubMenu === subIndex
                                                    ? 'text-blue-500 bg-blue-50'
                                                    : ''
                                            }
                                        `}
                                            onClick={() => handleSelectSubMenu(index, subIndex)}>
                                            {subMenuItem.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-7 flex-1">{renderPage(keySelected)}</div>
            </div>
        </>
    )
}

export default AdminPage
