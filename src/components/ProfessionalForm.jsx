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
  const minEndDate = !currentCompany.startDate
    ? null
    : new Date(currentCompany.startDate).toISOString().split('T')[0]

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
    const isResponsability = name.startsWith('responsability-')

    newData.companies[currentCompanyIndex] ??= {}

    if (isResponsability) {
      const index = Number(name.split('-')[1])
      newData.companies[currentCompanyIndex].responsabilities ??= []
      newData.companies[currentCompanyIndex].responsabilities[index] = value
    } else {
      newData.companies[currentCompanyIndex][name] = value
    }

    setData(newData)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Professional Experience</h2>
      <p className="subtitle">{`Company #${currentCompanyIndex + 1}`}</p>
      <div className="list" key={`company-${currentCompanyIndex}`}>
        <InputField
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
        <div className="list" key={`responsabilities-${currentCompanyIndex}`}>
          <p>
            Describe some responsabilities you had{' '}
            <span className="info">(optional, max. 5)</span>
          </p>
          <ul>
            <li>
              <InputField
                initialValue={currentCompany.responsabilities?.[0] ?? ''}
                attributes={{
                  id: 'responsability-0',
                  name: 'responsability-0',
                  type: 'text',
                  placeholder: 'Responsability 1...',
                  maxLength: 75,
                }}
                onChange={handleChange}
              />
            </li>
            <li>
              <InputField
                initialValue={currentCompany.responsabilities?.[1] ?? ''}
                attributes={{
                  id: 'responsability-1',
                  name: 'responsability-1',
                  type: 'text',
                  placeholder: 'Responsability 2...',
                  maxLength: 75,
                }}
                onChange={handleChange}
              />
            </li>
            <li>
              <InputField
                initialValue={currentCompany.responsabilities?.[2] ?? ''}
                attributes={{
                  id: 'responsability-2',
                  name: 'responsability-2',
                  type: 'text',
                  placeholder: 'Responsability 3...',
                  maxLength: 75,
                }}
                onChange={handleChange}
              />
            </li>
            <li>
              <InputField
                initialValue={currentCompany.responsabilities?.[3] ?? ''}
                attributes={{
                  id: 'responsability-3',
                  name: 'responsability-3',
                  type: 'text',
                  placeholder: 'Responsability 4...',
                  maxLength: 75,
                }}
                onChange={handleChange}
              />
            </li>
            <li>
              <InputField
                initialValue={currentCompany.responsabilities?.[4] ?? ''}
                attributes={{
                  id: 'responsability-4',
                  name: 'responsability-4',
                  type: 'text',
                  placeholder: 'Responsability 5...',
                  maxLength: 75,
                }}
                onChange={handleChange}
              />
            </li>
          </ul>
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
