import { InputField } from './InputField'
import { NextIcon } from './Icons'

export function GeneralForm({ onNext, data, setData }) {
  const generalData = data.general

  function handleSubmit(event) {
    event.preventDefault()
    onNext()
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget
    const newData = structuredClone(data)

    newData.general ??= {}
    newData.general[name] = value
    setData(newData)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>General Information</h2>
      <div className="general-fields">
        <InputField
          label="Your name"
          initialValue={generalData?.name ?? ''}
          attributes={{
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'John Doe',
            required: true,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <InputField
          label="Your email"
          initialValue={generalData?.email ?? ''}
          attributes={{
            id: 'email',
            name: 'email',
            type: 'text',
            autoComplete: 'email',
            placeholder: 'email@example.com',
            // eslint-disable-next-line no-useless-escape
            pattern: '[^@]+@[^@]+\.[a-zA-Z]{2,4}',
            required: true,
          }}
          onChange={handleChange}
          errorMsgs={{
            valueMissing: 'This field is required',
            patternMismatch: 'The email is not valid',
          }}
        />
        <InputField
          label="City where you live"
          initialValue={generalData?.city ?? ''}
          attributes={{
            id: 'city',
            name: 'city',
            type: 'text',
            placeholder: 'California, USA',
            required: true,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <InputField
          label="Your phone number"
          initialValue={generalData?.phone ?? ''}
          info="optional"
          attributes={{
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: '123 456 7890',
            pattern: '[0-9]{10}',
          }}
          onChange={handleChange}
          errorMsgs={{
            valueMissing: 'This field is required',
            patternMismatch: 'You must enter a number of 10 digits',
          }}
        />
        <InputField
          label="Write a short paragraph about yourself"
          initialValue={generalData?.about ?? ''}
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
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
      </div>
      <button className="move-btn">
        Next
        <NextIcon />
      </button>
    </form>
  )
}
