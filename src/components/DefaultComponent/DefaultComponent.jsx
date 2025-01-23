import HeaderComponent from "../HerderComponent/HeaderComponent";

function DefaultComponent({ children }) {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    );
}

export default DefaultComponent;
