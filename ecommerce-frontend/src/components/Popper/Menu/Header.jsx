function Header({ title, onBack }) {
    return (
        <header className={""}>
            <button className={""} onClick={onBack}>
                {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
            </button>
            <h4 className={""}>{title}</h4>
        </header>
    );
}

export default Header;
