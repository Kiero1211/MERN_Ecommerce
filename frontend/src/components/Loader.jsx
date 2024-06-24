import clsx from "clsx";
function Loader() {
    const wrapperClassName = clsx([
        "animate-spin",
        "rounded-full",
        "h-16",
        "w-16",
        "border-t-4",
        "border-pink-500",
        "border-opacity-50"
    ])
    return (
        <div className={wrapperClassName}></div>
    )
}

export default Loader;