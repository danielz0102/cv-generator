import { useState } from 'react'
import { InputField } from './InputField'
import { NextIcon, PreviousIcon } from './Icons'

export function ExperienceQuestion({ onPrevious, onNext, data, setData }) {
  const [hasExperience, setHasExperience] = useState(true)
  const numberOfCompanies = data.companies.length

  function handleCheck(event) {
    const checked = event.target.checked

    setHasExperience(checked)
    updateNumberOfCompanies(Number(checked))
  }

  function decreaseCompanies() {
    if (numberOfCompanies === 1) return
    updateNumberOfCompanies(numberOfCompanies - 1)
  }

  function increaseCompanies() {
    if (numberOfCompanies === 3) return
    updateNumberOfCompanies(numberOfCompanies + 1)
  }

  function updateNumberOfCompanies(newLength) {
    const newData = structuredClone(data)

    while (newData.companies.length !== newLength) {
      if (newData.companies.length < newLength) {
        newData.companies.push({})
      } else {
        newData.companies.pop()
      }
    }

    setData(newData)
  }

  return (
    <form className="form" noValidate>
      <h2>Professional Experience</h2>
      <InputField
        initialValue={hasExperience}
        label="I have worked in a company before"
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
        <button type="button" className="move-btn" onClick={onNext}>
          Next
          <NextIcon />
        </button>
      </div>
    </form>
  )
}
