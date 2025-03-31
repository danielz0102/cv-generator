import '@/styles/CVForm.css'
import { useState } from 'react'
import { GeneralForm } from './GeneralForm'
import { ExperienceQuestion } from './ExperienceQuestion'
import { ProfessionalForm } from './ProfessionalForm'

export function CVForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({
    general: {},
    companies: [{}],
    education: {},
  })
  const steps = [
    <GeneralForm onNext={handleNext} data={data} setData={setData} />,
    <ExperienceQuestion
      onPrevious={handlePrevious}
      onNext={handleNext}
      data={data}
      setData={setData}
    />,
    <ProfessionalForm
      onPrevious={handlePrevious}
      onNext={handleNext}
      data={data}
      setData={setData}
    />,
  ]

  function handleNext() {
    console.log(data)

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
