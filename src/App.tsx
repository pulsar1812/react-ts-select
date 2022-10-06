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
  const [multipleSelected, setMultipleSelected] = useState<SelectOption[]>([
    options[0],
  ])
  const [selected, setSelected] = useState<SelectOption | undefined>(options[0])

  return (
    <>
      <Select
        multiple
        options={options}
        selected={multipleSelected}
        onChange={(o) => setMultipleSelected(o)}
      />
      <br />
      <Select
        options={options}
        selected={selected}
        onChange={(o) => setSelected(o)}
      />
    </>
  )
}

export default App
