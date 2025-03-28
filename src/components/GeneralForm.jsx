import { InputField } from './InputField'
import { NextIcon } from './Icons'

export function GeneralForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    onSubmit(data)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>General Information</h2>
      <div className="general-fields">
        <InputField
          label="Your name"
          attributes={{
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'John Doe',
            required: true,
          }}
        />
        <InputField
          label="Your email"
          attributes={{
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'email@example.com',
            required: true,
          }}
        />
        <InputField
          label="City where you live"
          attributes={{
            id: 'city',
            name: 'city',
            type: 'text',
            placeholder: 'California, USA',
            required: true,
          }}
        />
        <InputField
          label="Your phone number"
          showOptional={true}
          attributes={{
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: '123 456 7890',
            pattern: '[0-9]{10}',
          }}
        />
        <InputField
          label="Write a short paragraph about yourself"
          attributes={{
            id: 'about',
            name: 'about',
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
