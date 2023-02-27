import { useState } from "react"
import { Select, type SelectOption } from "./Select"

const App = () => {
  const options = [
    { label: 'First', value: 1 },
    { label: 'Second', value: 2 },
    { label: 'Third', value: 3 },
    { label: 'Fourth', value: 4 },
  ]
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0])
  const [value2, setValue2] = useState<SelectOption[]>([options[0]])
  return (

    <div>
      <Select options={options} value={value1} onChange={option => setValue1(option)} />
      <br />
      <Select multiple={true} options={options} value={value2} onChange={option => setValue2(option)} />
    </div>
  )
}

export default App