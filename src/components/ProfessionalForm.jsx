import { InputField } from './InputField'
import { PreviousIcon, NextIcon } from './Icons'
import { useState } from 'react'

export function ProfessionalForm({ onPrevious, onNext, data, setData }) {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0)
  const numberOfCompanies = data.companies.length
  const currentCompany = data.companies[currentCompanyIndex] ?? {}
  const isLastCompany = currentCompanyIndex === numberOfCompanies - 1
  const maxStartDate = new Date(currentCompany.endDate || Date.now())
    .toISOString()
    .split('T')[0]
  const minEndDate = new Date(currentCompany.startDate || Date.now())
    .toISOString()
    .split('T')[0]

  function handleSubmit(event) {
    event.preventDefault()

    if (isLastCompany) {
      onNext()
    } else {
      setCurrentCompanyIndex(currentCompanyIndex + 1)
    }
  }

  function handlePrevious() {
    if (currentCompanyIndex === 0) {
      onPrevious()
      return
    }

    setCurrentCompanyIndex(currentCompanyIndex - 1)
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget
    const newData = structuredClone(data)

    newData.companies[currentCompanyIndex] ??= {}
    newData.companies[currentCompanyIndex][name] = value
    setData(newData)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Professional Experience</h2>
      <p className="subtitle">{`Company #${currentCompanyIndex + 1}`}</p>
      <div className="professional-fields">
        <InputField
          key={`company-${currentCompanyIndex}`}
          initialValue={currentCompany?.company ?? ''}
          label="Company where you worked"
          attributes={{
            id: 'company',
            name: 'company',
            type: 'text',
            placeholder: 'Google',
            required: true,
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
        <div className="form-field-group">
          <InputField
            key={`title-${currentCompanyIndex}`}
            initialValue={currentCompany?.title ?? ''}
            label="Your job title"
            attributes={{
              id: 'title',
              name: 'title',
              type: 'text',
              placeholder: 'Software Engineer',
              required: true,
            }}
            onChange={handleChange}
            errorMsgs={{ valueMissing: 'This field is required' }}
          />
          <InputField
            key={`city-${currentCompanyIndex}`}
            initialValue={currentCompany?.city ?? ''}
            label="City where you worked"
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
        </div>
        <div className="form-field-group">
          <InputField
            key={`startDate-${currentCompanyIndex}`}
            initialValue={currentCompany?.startDate ?? ''}
            label="Start date"
            attributes={{
              id: 'startDate',
              name: 'startDate',
              type: 'date',
              required: true,
              max: maxStartDate,
            }}
            onChange={handleChange}
            errorMsgs={{
              valueMissing: 'This field is required',
              rangeOverflow: 'Start date must be before end date',
            }}
          />
          <InputField
            key={`endDate-${currentCompanyIndex}`}
            initialValue={currentCompany?.endDate ?? ''}
            label="End date"
            attributes={{
              id: 'endDate',
              name: 'endDate',
              type: 'date',
              required: true,
              max: new Date().toISOString().split('T')[0],
              min: minEndDate,
            }}
            onChange={handleChange}
            errorMsgs={{
              valueMissing: 'This field is required',
              rangeUnderflow: 'End date must be after start date',
              rangeOverflow: 'End date must be today or earlier',
            }}
          />
        </div>
        <InputField
          key={`responsabilities-${currentCompanyIndex}`}
          initialValue={currentCompany?.responsabilities ?? ''}
          label="Describe the main responsibilities of your job"
          attributes={{
            id: 'responsabilities',
            name: 'responsabilities',
            type: 'textarea',
            placeholder: 'Worked on the Google Search team...',
            required: true,
            rows: '5',
            maxLength: '500',
          }}
          onChange={handleChange}
          errorMsgs={{ valueMissing: 'This field is required' }}
        />
      </div>
      <div className="btns-container">
        <button
          type="button"
          className="move-btn btn-secondary"
          onClick={handlePrevious}
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
