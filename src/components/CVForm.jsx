import '@/styles/CVForm.css'
import { useState } from 'react'
import { GeneralForm } from './GeneralForm'
import { ExperienceQuestion } from './ExperienceQuestion'

export function CVForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({})
  const steps = [
    <GeneralForm onSubmit={handleSubmit} />,
    <ExperienceQuestion onPrevious={handlePrevious} onSubmit={handleSubmit} />,
  ]

  function handleSubmit(newData) {
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
