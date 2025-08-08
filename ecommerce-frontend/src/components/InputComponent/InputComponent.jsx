function InputComponent({
    size,
    placeholder,
    bordered,
    style,
    className,
    onChange,
    value = '',
    ...rests
}) {
    return (
        <input
            size={size}
            placeholder={placeholder}
            bordered={bordered}
            style={style}
            type="text"
            id={rests.id}
            onChange={onChange}
            className={className}
            value={value}
            {...rests}
        />
    )
}

export default InputComponent
