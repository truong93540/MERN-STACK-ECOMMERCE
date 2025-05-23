function MenuItem({ data, onClick }) {
    return (
        <div
            className="menu-item p-2 cursor-pointer hover:bg-gray-100"
            onClick={onClick}>
            {data.title}
        </div>
    );
}

export default MenuItem;
