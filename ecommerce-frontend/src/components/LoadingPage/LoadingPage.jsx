import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = ({ isLoading, children }) => {
    const override = {};

    return isLoading ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50">
            <MoonLoader cssOverride={override} size={40} />
        </div>
    ) : (
        children
    );
};

export default Loading;
