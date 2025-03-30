import { InputField } from './InputField'
import { NextIcon } from './Icons'

export function GeneralForm({ onNext, data, setData }) {
  const generalData = data.generalData

  function handleSubmit(event) {
    event.preventDefault()
    onNext()
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget
    const newData = structuredClone(data)

    newData.generalData ??= {}
    newData.generalData[name] = value
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
        />
        <InputField
          label="Your email"
          initialValue={generalData?.email ?? ''}
          attributes={{
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'email@example.com',
            required: true,
          }}
          onChange={handleChange}
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
        />
        <InputField
          label="Your phone number"
          initialValue={generalData?.phone ?? ''}
          showOptional={true}
          attributes={{
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: '123 456 7890',
            pattern: '[0-9]{10}',
          }}
          onChange={handleChange}
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
        />
      </div>
      <button className="move-btn">
        Next
        <NextIcon />
      </button>
    </form>
  )
}
