import { useState } from 'react'

export function InputField({
  label,
  initialValue = '',
  info,
  attributes = {},
  onChange,
  errorMsgs = {},
}) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')
  const InputComponent = attributes.type === 'textarea' ? 'textarea' : 'input'
  const isCheckbox = attributes.type === 'checkbox'
  const isDisabled = attributes.disabled || attributes.readOnly

  function handleChange(event) {
    setValue(isCheckbox ? event.target.checked : event.target.value)

    if (onChange) {
      onChange(event)
    }
  }

  function validate(event) {
    event.preventDefault()

    const input = event.target
    const errorType = Object.keys(errorMsgs).find((key) => input.validity[key])

    setError(errorMsgs[errorType] || input.validationMessage)
  }

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={attributes.id}>
          {label}
          {info && <span className="info"> {`(${info})`}</span>}
        </label>
      )}
      <InputComponent
        {...attributes}
        {...(isCheckbox ? { checked: value } : { value: value })}
        onChange={handleChange}
        onInvalid={validate}
        onBlur={validate}
        onFocus={() => setError('')}
      />
      {!isDisabled && (
        <span className="error-msg">{error && `* ${error}`}</span>
      )}
    </div>
  )
}
