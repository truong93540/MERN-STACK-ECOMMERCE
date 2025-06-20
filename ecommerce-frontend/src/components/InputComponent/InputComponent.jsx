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
            type="text"
            {...rests}
            id={rests.id}
            className={className}
        />
    );
}

export default InputComponent;
