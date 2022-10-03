import { useState } from 'react'

import { Select, SelectOption } from './components/Select'

const options: SelectOption[] = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
]

function App() {
  const [selectOption, setSelectOption] = useState<SelectOption | undefined>(
    options[0]
  )

  return (
    <>
      <Select
        options={options}
        selectOption={selectOption}
        onChange={(o) => setSelectOption(o)}
      />
    </>
  )
}

export default App
