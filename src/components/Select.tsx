import { useEffect, useState } from 'react'

import styles from './select.module.css'

export type SelectOption = {
  label: string
  value: string | number
}

type MultipleSelectProps = {
  multiple: true
  selected: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  selected?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({ multiple, selected, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function handleSelect(option: SelectOption) {
    if (multiple) {
      if (selected.includes(option)) {
        onChange(selected.filter((o) => o !== option))
      } else {
        onChange([...selected, option])
      }
    } else {
      if (option !== selected) onChange(option)
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? selected.includes(option) : option === selected
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
      <span className={styles.value}>
        {multiple
          ? selected.map((sel) => (
              <button
                key={sel.value}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(sel)
                }}
                className={styles['option-badge']}
              >
                {sel.label}
                <span className={styles['remove-btn']}>&times;</span>
              </button>
            ))
          : selected?.label}
      </span>
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
