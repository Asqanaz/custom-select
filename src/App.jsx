import { useState } from "react"
import { MultiSelect } from "./MultiSelect"
import { SingleSelect } from "./SingleSelect"

const options = [
	{
		id: 1,
		label: "A",
		value: "a"
	},
	{
		id: 2,
		label: "B",
		value: "b"
	},
	{
		id: 3,
		label: "C",
		value: "c"
	},
	{
		id: 4,
		label: "D",
		value: "d"
	}
]

function App() {
	return (
		<div className="App bg-black min-h-screen w-full flex flex-col gap-y-20 justify-center items-center">
			<MultiSelect selectOptions = {options}/>
			<SingleSelect selectOptions = {options}/>
		</div>
	)
}

export default App
