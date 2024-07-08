import {FaCheck} from "react-icons/fa";

function ProgressStep({step1, step2, step3}) {
    return (
        <div className="flex justify-center items-center space-x-4">
            <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
                <span className="ml-2">Login</span>
                <span className="mt-2 text-center"><FaCheck  size={26}/></span>
            </div>

            {
                step2 && (
                    <>
                        {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
                        <div className={`${step2 ? "text-green-500" : "text-gray-300"}`}>
                            <span className="ml-2">Shipping</span>
                            <span className="mt-2 text-center"><FaCheck  size={26}/></span>
                        </div>
                    </>
                )
            }

            <>
                {step1 && step2 && step3 ? (
                    <div className="h-0.5 w-[10rem] bg-green-500"></div>
                ) : null}

            <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
                <span className={`${!step3 ? "ml-[10rem]" : null}`}>Summary</span>
                { step1 && step2 && step3 &&<span className="mt-2 text-center"> <FaCheck  size={26}/></span>}
            </div>
            </>
        </div>
    );
}

export default ProgressStep;