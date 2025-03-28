import { useState } from 'react'
import { NextIcon, PreviousIcon } from './Icons'
import { InputField } from './InputField'

export function ProfessionalForm({ onSubmit, onPrevious }) {
  const [companies, setCompanies] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    <InitialQuestion companies={companies} setCompanies={setCompanies} />,
  ]

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    onSubmit(data)
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      return
    }

    onPrevious()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Professional Information</h2>
      {steps[currentStep]}
      <div className="btns-container">
        <button
          type="button"
          className="move-btn btn-secondary"
          onClick={handlePrevious}
        >
          <PreviousIcon />
          Back
        </button>
        <button className="move-btn">
          Next
          <NextIcon />
        </button>
      </div>
    </form>
  )
}

function InitialQuestion({ companies, setCompanies }) {
  const [hasExperience, setHasExperience] = useState(true)

  return (
    <>
      <InputField
        initialValue={hasExperience}
        label="Have you worked in a company before?"
        attributes={{
          id: 'ask',
          name: 'ask',
          type: 'checkbox',
        }}
        onChange={(event) => setHasExperience(event.target.checked)}
      />
      {hasExperience && (
        <div className="counter-field">
          <p id="numberOfCompanies">
            How many companies where you have worked would you like to show?{' '}
            <span>(max. 3)</span>
          </p>
          <div className="counter">
            <button
              className="counter-btn"
              type="button"
              onClick={() => setCompanies(Math.max(1, companies - 1))}
              aria-label="Decrease number of companies"
            >
              -
            </button>
            <span aria-labelledby="numberOfCompanies">{companies}</span>
            <button
              className="counter-btn"
              type="button"
              onClick={() => setCompanies(Math.min(3, companies + 1))}
              aria-label="Increase number of companies"
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  )
}
