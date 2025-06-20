const warning = ({ mes = "Warning" }) => {
    return (
        <div
            className="flex items-center p-4 mb-4 rounded-xl text-sm  bg-amber-50 text-amber-500 fixed top-8"
            role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5 mr-2"
                viewBox="0 0 20 20">
                <path
                    stroke="#F59E0B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.004 13.333V9.167M10 6.667h.007M10 18.333a8.333 8.333 0 1 1 0-16.666 8.333 8.333 0 0 1 0 16.666"></path>
            </svg>
            <span className="font-semibold mr-1">{mes}</span>
        </div>
    );
};

const Success = ({ mes = "Account created successfully" }) => {
    return (
        <div
            className="flex items-center p-4 mb-4 rounded-xl text-sm border border-emerald-400 bg-emerald-50 text-emerald-500 fixed top-8 z-10 left-1/2 transform -translate-x-1/2"
            role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5 mr-2"
                viewBox="0 0 20 20">
                <path
                    stroke="#10B981"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.004 13.333V9.167M10 6.667h.007M10 18.333a8.333 8.333 0 1 1 0-16.666 8.333 8.333 0 0 1 0 16.666"></path>
            </svg>
            <span className="font-semibold mr-1">Success</span>
            {mes}
        </div>
    );
};

const Error = ({ mes = "Account creation failed" }) => {
    return (
        <div
            className="flex items-center p-4 rounded-xl text-sm bg-red-500 text-white fixed top-8 z-[9999] left-1/2 transform -translate-x-1/2"
            role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5 mr-2"
                viewBox="0 0 20 20">
                <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.004 13.333V9.167M10 6.667h.007M10 18.333a8.333 8.333 0 1 1 0-16.666 8.333 8.333 0 0 1 0 16.666"></path>
            </svg>
            <span className="font-semibold mr-1">Error</span>
            {mes}
        </div>
    );
};

export { warning, Success, Error };
