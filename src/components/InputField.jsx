import { useState } from 'react'

export function InputField({
  label,
  initialValue = '',
  showOptional = false,
  attributes = {},
  onChange,
}) {
  const [value, setValue] = useState(initialValue)
  const InputComponent = attributes.type === 'textarea' ? 'textarea' : 'input'
  const isCheckbox = attributes.type === 'checkbox'

  function handleChange(event) {
    setValue(isCheckbox ? event.target.checked : event.target.value)

    if (onChange) {
      onChange(event)
    }
  }

  return (
    <div className="form-field">
      <label htmlFor={attributes.id}>
        {label}
        {showOptional && <span> (optional)</span>}
      </label>
      <InputComponent
        {...attributes}
        {...(isCheckbox ? { checked: value } : { value: value })}
        onChange={handleChange}
      />
    </div>
  )
}
