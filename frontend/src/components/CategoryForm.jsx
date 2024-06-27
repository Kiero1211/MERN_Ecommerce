import clsx from "clsx";
import { memo, useRef, useEffect } from "react";

function CategoryForm({ value, setValue, handleSubmit, buttonContent = "Submit", handleDelete, buttonClassNames }) {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, [inputRef]);
	return (
		<div className="p-3">
			<form
				onSubmit={handleSubmit}
				className="space-y-3">
				<input
					type="text"
					className="py-3 px-4 border rounded w-full"
					placeholder="Category name..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
					ref={inputRef}
				/>

				<div className="flex justify-between">
					<button className={clsx(buttonClassNames)}>{buttonContent}</button>
					{handleDelete && (
						<button
							type="button"
							className={clsx([[...buttonClassNames], "bg-red-500", "hover:bg-red-600"])}
							onClick={handleDelete}>
							Delete
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default memo(CategoryForm);
