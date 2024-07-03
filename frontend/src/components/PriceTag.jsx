function PriceTag({value}) {
    return (
        <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 
        px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            ${value}
        </span>
    )
}

export default PriceTag;