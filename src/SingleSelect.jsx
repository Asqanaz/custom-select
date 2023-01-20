import React, { useState, useEffect, useRef } from "react"

export const SingleSelect = ({ selectOptions }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState("")

	const handleSelectOption = label => {
		setSelectedOption(label)
		setIsOpen(false)
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
		<div className="w-1/2 min-h-[50px] relative bg-gray-200 border-2 border-green-200 mx-auto rounded-full px-5 p-2 flex items-center">
			<div
				className="w-full h-full flex items-center gap-x-8"
				role="presentation"
				onClick={() => setIsOpen(true)}
                ref = {list} 
			>
				{selectedOption || "SingleSelect"}
			</div>
			<div className="absolute right-[20px] h-full flex items-center gap-5">
				<div className="h-[80%] rounded-full my-auto w-0 border border-black" />
				<button className="text-black text-[20px]" onClick={() => setIsOpen(false)}>
					X
				</button>
			</div>

			{isOpen && (
				<ul role = "presentation" className="w-full absolute top-full left-0 h-fit  bg-gray-300 rounded-2xl z-20" onClick = {(e) => e.stopPropagation()}>
					{selectOptions.length ? (
						selectOptions.map(item => (
							<li
								className={`p-5 ${selectedOption === item.label ? "bg-blue-200" : "bg-transparent"} rounded-2xl hover:bg-blue-100`}
								role="presentation"
								key={item.id}
								onClick={() => handleSelectOption(item.label)}
							>
								{item.label}
							</li>
						))
					) : (
						<li className="p-5">No select element</li>
					)}
				</ul>
			)}
		</div>
	)
}
