import '@/styles/CVForm.css'
import { useState } from 'react'
import { GeneralForm } from './GeneralForm'
import { ExperienceQuestion } from './ExperienceQuestion'
import { ProfessionalForm } from './ProfessionalForm'

export function CVForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({})
  const steps = [
    <GeneralForm onSubmit={handleSubmit} />,
    <ExperienceQuestion onPrevious={handlePrevious} onSubmit={handleSubmit} />,
    <ProfessionalForm
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      numberOfCompanies={data.numberOfCompanies}
    />,
  ]

  function handleSubmit(newData) {
    console.log(newData)
    setData({ ...data, ...newData })

    if (currentStep !== steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  function handlePrevious() {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }

  return steps[currentStep]
}
