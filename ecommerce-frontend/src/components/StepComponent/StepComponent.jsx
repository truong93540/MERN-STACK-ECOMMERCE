import { AiOutlineCheck } from 'react-icons/ai'

const StepItem = ({ title, description, index, isActive, isCompleted }) => {
    return (
        <div className="flex flex-col items-center relative z-10 justify-center">
            {/* Circle */}
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                    isCompleted
                        ? 'bg-white text-white border border-blue-500'
                        : isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-black'
                }`}>
                {isCompleted ? <AiOutlineCheck className="text-gray-500" /> : index + 1}
            </div>
            {/* Title */}
            <div className="ml-2 text-sm text-center whitespace-nowrap relative">
                <div>{title}</div>
                <div>{description}</div>
            </div>
        </div>
    )
}

const StepComponent = ({ current = 0, items = [] }) => {
    return (
        <div className="w-full px-4 relative">
            {/* Line nối giữa các bước */}
            {items.length > 1 && (
                <div className="absolute top-[16px] left-0 right-0 h-1 bg-gray-300 z-0 mx-8" />
            )}

            {/* Line completed overlay */}
            {items.length > 1 && (
                <div className="absolute top-[16px] left-8 right-8 h-1 z-0">
                    <div
                        className="bg-blue-500 h-full transition-transform duration-500 origin-left"
                        style={{
                            transform: `scaleX(${
                                items.length > 1 ? current / (items.length - 1) : 0
                            })`,
                        }}
                    />
                </div>
            )}

            {/* Các bước */}
            <div className="flex items-center justify-between relative z-10">
                {items.map((step, index) => (
                    <StepItem
                        key={index}
                        index={index}
                        title={step.title}
                        description={step.description}
                        isActive={index === current}
                        isCompleted={index < current}
                    />
                ))}
            </div>
        </div>
    )
}

export default StepComponent
