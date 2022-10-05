import { useEffect, useState } from 'react'

import styles from './select.module.css'

export interface SelectOption {
  label: string
  value: string | number
}

interface SelectProps {
  options: SelectOption[]
  selectOption?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select({ selectOption, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    onChange(undefined)
  }

  function handleSelect(option: SelectOption) {
    if (option !== selectOption) onChange(option)
  }

  function isOptionSelected(option: SelectOption) {
    return option === selectOption
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

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
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation()
              handleSelect(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            } ${index === highlightedIndex ? styles.highlighted : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
