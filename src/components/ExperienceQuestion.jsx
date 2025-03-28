import { useState } from 'react'
import { InputField } from './InputField'
import { NextIcon, PreviousIcon } from './Icons'

export function ExperienceQuestion({ onPrevious, onSubmit }) {
  const [hasExperience, setHasExperience] = useState(true)
  const [numberOfCompanies, setNumberOfCompanies] = useState(1)

  function handleCheck(event) {
    const checked = event.target.checked

    setHasExperience(checked)
    setNumberOfCompanies(Number(checked))
  }

  function decreaseCompanies() {
    setNumberOfCompanies(Math.max(1, numberOfCompanies - 1))
  }

  function increaseCompanies() {
    setNumberOfCompanies(Math.min(3, numberOfCompanies + 1))
  }

  return (
    <form className="form" noValidate>
      <h2>Professional Experience</h2>
      <InputField
        initialValue={hasExperience}
        label="Have you worked in a company before?"
        attributes={{
          id: 'ask',
          name: 'ask',
          type: 'checkbox',
        }}
        onChange={handleCheck}
      />
      {hasExperience && (
        <div className="counter-field">
          <p id="numberOfCompanies">
            How many companies where you have worked would you like to show?{' '}
            <span className="info">(max. 3)</span>
          </p>
          <div className="counter">
            <button
              className="counter-btn"
              type="button"
              onClick={decreaseCompanies}
              aria-label="Decrease number of companies"
            >
              -
            </button>
            <span aria-labelledby="numberOfCompanies">{numberOfCompanies}</span>
            <button
              className="counter-btn"
              type="button"
              onClick={increaseCompanies}
              aria-label="Increase number of companies"
            >
              +
            </button>
          </div>
        </div>
      )}
      <div className="btns-container">
        <button
          type="button"
          className="move-btn btn-secondary"
          onClick={onPrevious}
        >
          <PreviousIcon />
          Back
        </button>
        <button
          type="button"
          className="move-btn"
          onClick={() => onSubmit({ numberOfCompanies })}
        >
          Next
          <NextIcon />
        </button>
      </div>
    </form>
  )
}
