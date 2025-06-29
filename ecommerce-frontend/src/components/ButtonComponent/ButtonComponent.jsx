function ButtonComponent({ size, textButton, styleButton, styleTextButton, icon, ...rest }) {
    return (
        <button
            size={size}
            type="submit"
            className={`items-center justify-center ${styleButton}`}
            {...rest}>
            {icon}
            <span className={styleTextButton}>{textButton}</span>
        </button>
    )
}

export default ButtonComponent
