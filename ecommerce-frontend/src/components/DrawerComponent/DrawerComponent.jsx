import Drawer from "../Drawer/Drawer";

const DrawerComponent = ({
    title = "Drawer",
    placement = "right",
    isOpen = false,
    children,
    ...rest
}) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rest}>
                {children}
            </Drawer>
        </>
    );
};

export default DrawerComponent;
