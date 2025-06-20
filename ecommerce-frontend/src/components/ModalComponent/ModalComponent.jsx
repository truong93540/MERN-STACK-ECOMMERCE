import Modal from "../Modal/Modal";

const ModalComponent = ({
    title = "Modal",
    open = false,
    children,
    ...rest
}) => {
    return (
        <Modal title={title} open={open} {...rest}>
            {children}
        </Modal>
    );
};

export default ModalComponent;
