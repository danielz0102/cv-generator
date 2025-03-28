import '@/styles/CVForm.css'
import { useState } from 'react'
import { GeneralForm } from './GeneralForm'
import { ProfessionalForm } from './ProfessionalForm'

export function CVForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({})
  const steps = [
    <GeneralForm onSubmit={handleSubmit} />,
    <ProfessionalForm
      onSubmit={handleSubmit}
      onPrevious={() => setCurrentStep(currentStep - 1)}
    />,
  ]

  function handleSubmit(newData) {
    console.log(newData)
    setData({ ...data, ...newData })

    if (currentStep !== steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return <div className="cv-form">{steps[currentStep]}</div>
}
