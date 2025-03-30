import { InputField } from './InputField'
import { PreviousIcon, NextIcon } from './Icons'
import { useState } from 'react'

export function ProfessionalForm({ onPrevious, onSubmit, numberOfCompanies }) {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0)
  const [data, setData] = useState([])
  const currentCompany = data[currentCompanyIndex] || {}
  const isLastCompany = currentCompanyIndex === numberOfCompanies - 1

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const newCompany = Object.fromEntries(new FormData(form))
    const newData = structuredClone(data)

    newData[currentCompanyIndex] = newCompany
    setData(newData)

    if (isLastCompany) {
      onSubmit({ companies: newData })
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

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Professional Information</h2>
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
        />
        <InputField
          key={`jobTitle-${currentCompanyIndex}`}
          initialValue={currentCompany?.jobTitle ?? ''}
          label="Your job title"
          attributes={{
            id: 'jobTitle',
            name: 'jobTitle',
            type: 'text',
            placeholder: 'Software Engineer',
            required: true,
          }}
        />
        <InputField
          key={`jobCity-${currentCompanyIndex}`}
          initialValue={currentCompany?.jobCity ?? ''}
          label="City where you worked"
          attributes={{
            id: 'jobCity',
            name: 'jobCity',
            type: 'text',
            placeholder: 'California, USA',
            required: true,
          }}
        />
        <div className="form-date-range">
          <InputField
            key={`startDate-${currentCompanyIndex}`}
            initialValue={currentCompany?.startDate ?? ''}
            label="Start date"
            attributes={{
              id: 'startDate',
              name: 'startDate',
              type: 'date',
              required: true,
              max: new Date().toISOString().split('T')[0],
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
            }}
          />
        </div>
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
