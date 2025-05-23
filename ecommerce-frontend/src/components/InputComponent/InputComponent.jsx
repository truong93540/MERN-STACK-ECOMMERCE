function InputComponent({
    size,
    placeholder,
    bordered,
    style,
    className,
    ...rests
}) {
    return (
        <input
            size={size}
            placeholder={placeholder}
            bordered={bordered}
            style={style}
            {...rests}
            type="text"
            id="default-search"
            className={className}
        />
    );
}

export default InputComponent;
