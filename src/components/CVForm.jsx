import '@/styles/CVForm.css'
import { useState } from 'react'
import { GeneralForm } from './GeneralForm'
import { ExperienceQuestion } from './ExperienceQuestion'
import { ProfessionalForm } from './ProfessionalForm'
import { EducationForm } from './EducationForm'
import { SkillsForm } from './SkillsForm'

export function CVForm() {
  const [currentStep, setCurrentStep] = useState(4)
  const [data, setData] = useState({
    general: {},
    companies: [],
    education: {},
    skills: [],
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
    <EducationForm
      onPrevious={handlePrevious}
      onNext={handleNext}
      data={data}
      setData={setData}
    />,
    <SkillsForm
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      data={data}
      setData={setData}
    />,
  ]

  function handleNext() {
    console.log(data)

    if (currentStep === steps.length - 1) return

    const hasExperience = data.companies.length > 0
    let stepsToMove = 1

    if (currentStep === 1 && !hasExperience) {
      stepsToMove++
    }

    setCurrentStep(currentStep + stepsToMove)
  }

  function handlePrevious() {
    if (currentStep === 0) return

    const hasExperience = data.companies.length > 0
    let stepsToMove = 1

    if (currentStep === 3 && !hasExperience) {
      stepsToMove++
    }

    setCurrentStep(currentStep - stepsToMove)
  }

  function handleSubmit() {
    console.log(data)
  }

  return steps[currentStep]
}
