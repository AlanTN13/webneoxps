import React from "react";

const Pill = ({ children }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
        {children}
    </span>
);

export default Pill;
