import { useState } from 'react'

import styles from './select.module.css'

export interface SelectOption {
  label: string
  value: any
}

interface SelectProps {
  options: SelectOption[]
  selectOption?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select({ selectOption, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  function clearOptions() {
    onChange(undefined)
  }

  function handleSelect(option: SelectOption) {
    onChange(option)
  }

  return (
    <div
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      className={styles.container}
    >
      <span className={styles.value}>{selectOption?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option) => (
          <li
            key={option.label}
            onClick={(e) => {
              e.stopPropagation()
              handleSelect(option)
              setIsOpen(false)
            }}
            className={styles.option}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
