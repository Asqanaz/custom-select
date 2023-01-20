import React, { useState, useRef, useEffect } from "react"

export const MultiSelect = ({ selectOptions }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [options, setOptions] = useState(selectOptions)
	const [selectedOption, setSelectedOption] = useState([])

	const handleOptionDelete = option => {
		setSelectedOption(selectedOption.filter(op => op.value !== option.value))
		setOptions([...options, option].sort((prev, curr) => prev.id - curr.id))
	}

	const handleAddToOptions = option => {
		setSelectedOption([...selectedOption, option])
		setOptions(options.filter(item => item.value !== option.value))
	}

	const list = useRef()
	useEffect(() => {
		document.addEventListener("click", handleDocumentClicked)
		return () => document.removeEventListener("click", handleDocumentClicked)
	}, [])

	const handleDocumentClicked = e => {
		if (list.current && list.current.contains(e.target)) {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}

	return (
		<div className="select-container w-1/2 min-h-[50px] relative bg-gray-200 border-2 border-green-200 mx-auto rounded-full px-5 p-2 flex items-center">
			<div className="w-full h-full flex items-center gap-x-8" role="button" ref={list}>
				{selectedOption.length
					? selectedOption.map(item => (
							<button
								className="h-full bg-gray-500 flex gap-x-8 w-fit items-center justify-between px-4 py-1 rounded-2xl hover:bg-red-400 z-20"
								key={item.id}
								onClick={e => {
									handleOptionDelete(item)
									e.stopPropagation()
								}}
							>
								<span>{item.label}</span>
							</button>
					  ))
					: "MultiSelect"}
			</div>
			<div className="absolute right-[20px] h-full flex items-center gap-5">
				<div className="h-[80%] rounded-full my-auto w-0 border border-black" />
				<button className="text-black text-[20px]" onClick={() => setIsOpen(false)}>
					X
				</button>
			</div>
			<ul
				role="menubar"
				aria-hidden={true}
				className={`w-full absolute top-full left-0 h-fit  bg-gray-300 rounded-2xl z-20 transition-all ${
					isOpen ? "block" : "hidden"
				}`}
				onClick={e => e.stopPropagation()}
			>
				{options.length ? (
					options.map(item => (
						<li
							className="p-5 cursor-pointer"
							role="presentation"
							key={item.id}
							onClick={() => handleAddToOptions(item)}
						>
							{item.label}
						</li>
					))
				) : (
					<li className="p-5">No select element</li>
				)}
			</ul>
		</div>
	)
}
