function InputComponent({ size, placeholder, bordered, style, className, onChange, ...rests }) {
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
            value={''}
            {...rests}
        />
    )
}

export default InputComponent
