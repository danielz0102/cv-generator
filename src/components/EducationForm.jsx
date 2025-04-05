import { InputField } from './InputField'
import { PreviousIcon, NextIcon } from './Icons'
import { useState } from 'react'

export function EducationForm({ onPrevious, onNext, data, setData }) {
  const [noDegree, setNoDegree] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    onNext()
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget
    const newData = structuredClone(data)

    newData.education ??= {}
    newData.education[name] = value
    setData(newData)
  }

  function handleCheck(event) {
    const checked = event.currentTarget.checked
    const form = event.currentTarget.form

    setNoDegree(checked)

    //Waiting for new render (disabled inputs are not included in FormData)
    setTimeout(() => {
      const newData = structuredClone(data)
      newData.education = checked ? {} : Object.fromEntries(new FormData(form))
      setData(newData)
    }, 0)
  }

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <h2>Education</h2>
      <div className="education-fields">
        <InputField
          initialValue={data.education?.school ?? ''}
          label="School where you studied"
          attributes={{
            id: 'school',
            name: 'school',
            type: 'text',
            placeholder: 'Stanford University',
            required: true,
            disabled: noDegree,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <InputField
          initialValue={data.education?.degree ?? ''}
          label="Your degree title"
          attributes={{
            id: 'degree',
            name: 'degree',
            type: 'text',
            placeholder: 'Software Engineer',
            required: true,
            disabled: noDegree,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <InputField
          initialValue={data.education?.city ?? ''}
          label="City where you studied"
          attributes={{
            id: 'city',
            name: 'city',
            type: 'text',
            placeholder: 'California, USA',
            required: true,
            disabled: noDegree,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <InputField
          initialValue={data.education?.date ?? ''}
          label="Gradutation date"
          attributes={{
            id: 'date',
            name: 'date',
            type: 'date',
            disabled: noDegree,
            max: new Date().toISOString().split('T')[0],
          }}
          onChange={handleChange}
          info="if you are still studying, do not fill this field"
          errorMsgs={{
            rangeOverflow: 'Date must be today or earlier',
          }}
        />
        <InputField
          label="I don't have a degree nor I am studying"
          attributes={{
            id: 'noDegree',
            name: 'noDegree',
            type: 'checkbox',
          }}
          onChange={handleCheck}
        />
      </div>
      <div className="btns-container">
        <button
          type="button"
          className="move-btn btn-secondary"
          onClick={onPrevious}
        >
          <PreviousIcon />
          Previous
        </button>
        <button type="submit" className="move-btn">
          Next
          <NextIcon />
        </button>
      </div>
    </form>
  )
}
