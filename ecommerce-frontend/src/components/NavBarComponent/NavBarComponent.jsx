import { StarIcon, StarIconWhite } from '../Icons/Icons'

function NavBarComponent() {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className="text-[#38383D] text-xs font-normal cursor-pointer w-full hover:bg-blue-400 hover:text-white pl-4 pr-3 py-2">
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
            <h4 className="text-[#38383D] text-sm font-medium px-3">Lable</h4>
            <div className=" mt-2">{renderContent('text', ['Tu lanh', 'TV', 'May giat'])}</div>
            {/* <div className="flex flex-col gap-3 items-start">
                {renderContent("checkbox", [
                    { value: "a", label: "A" },
                    { value: "b", label: "B" },
                ])}
            </div>
            <div className="flex flex-col gap-3 items-start">
                {renderContent("star", [3, 4, 5])}
            </div>
            <div className="flex flex-col gap-3 items-start">
                {renderContent("price", ["dưới 40", "trên 50.000"])}
            </div> */}
        </div>
    )
}

export default NavBarComponent
