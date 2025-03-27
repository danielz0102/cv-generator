import '@/styles/CVForm.css'
import { NextIcon } from './Icons'
import { useState } from 'react'

export function CVForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    about: '',
  })

  return (
    <div className="cv-form">
      <GeneralForm data={data} setData={setData} />
    </div>
  )
}

function GeneralForm({ data, setData }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const newData = Object.fromEntries(new FormData(form))
    console.log(newData)
    setData({ ...data, ...newData })
  }

  return (
    <form className="general-form" onSubmit={handleSubmit}>
      <h2>General Information</h2>
      <div className="general-form-fields">
        <InputField
          initialValue={data.name}
          attributes={{
            id: 'name',
            name: 'name',
            label: 'Your name',
            type: 'text',
            placeholder: 'John Doe',
            required: true,
          }}
        />
        <InputField
          initialValue={data.email}
          attributes={{
            id: 'email',
            name: 'email',
            label: 'Your email',
            type: 'email',
            placeholder: 'email@example.com',
            required: true,
          }}
        />
        <InputField
          initialValue={data.city}
          attributes={{
            id: 'city',
            name: 'city',
            label: 'City where you live',
            type: 'text',
            placeholder: 'California, USA',
            required: true,
          }}
        />
        <InputField
          initialValue={data.phone}
          attributes={{
            id: 'phone',
            name: 'phone',
            label: 'Your phone number',
            type: 'tel',
            placeholder: '123 456 7890',
            pattern: '[0-9]{10}',
          }}
        />
        <InputField
          initialValue={data.about}
          attributes={{
            id: 'about',
            name: 'about',
            label: 'Write a short paragraph about yourself',
            type: 'textarea',
            placeholder:
              'I am a software engineer with 5 years of experience...',
            rows: '5',
            maxLength: '400',
            required: true,
          }}
        />
      </div>
      <button className="move-btn">
        Next
        <NextIcon />
      </button>
    </form>
  )
}

function InputField({ initialValue = '', attributes = {} }) {
  const [value, setValue] = useState(initialValue)
  const InputComponent = attributes.type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="form-field">
      <label htmlFor={attributes.id}>
        {attributes.label}
        {!attributes.required && <span> (optional)</span>}
      </label>
      <InputComponent
        {...attributes}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}
