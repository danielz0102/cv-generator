import { InputField } from './InputField'
import { PreviousIcon, SubmitIcon } from './Icons'

export function SkillsForm({ onPrevious, onNext, data, setData }) {
  function handleSubmit(event) {
    event.preventDefault()
    onNext()
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget

    const index = Number(name.split('-')[1])
    const newData = structuredClone(data)

    newData.skills[index] = value
    setData(newData)
  }

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <h2>Skills</h2>
      <div className="skills-fields">
        <p>
          Enumerate some skills you would like to show{' '}
          <span className="info">(optional, max. 5)</span>
        </p>
        <ul>
          <li>
            <InputField
              initialValue={data.skills[0] ?? ''}
              attributes={{
                id: 'skill-0',
                name: 'skill-0',
                type: 'text',
                placeholder: 'Skill 1...',
                maxLength: 75,
              }}
              onChange={handleChange}
            />
          </li>
          <li>
            <InputField
              initialValue={data.skills[1] ?? ''}
              attributes={{
                id: 'skill-1',
                name: 'skill-1',
                type: 'text',
                placeholder: 'Skill 2...',
                maxLength: 75,
              }}
              onChange={handleChange}
            />
          </li>
          <li>
            <InputField
              initialValue={data.skills[2] ?? ''}
              attributes={{
                id: 'skill-2',
                name: 'skill-2',
                type: 'text',
                placeholder: 'Skill 3...',
                maxLength: 75,
              }}
              onChange={handleChange}
            />
          </li>
          <li>
            <InputField
              initialValue={data.skills[3] ?? ''}
              attributes={{
                id: 'skill-3',
                name: 'skill-3',
                type: 'text',
                placeholder: 'Skill 4...',
                maxLength: 75,
              }}
              onChange={handleChange}
            />
          </li>
          <li>
            <InputField
              initialValue={data.skills[4] ?? ''}
              attributes={{
                id: 'skill-4',
                name: 'skill-4',
                type: 'text',
                placeholder: 'Skill 5...',
                maxLength: 75,
              }}
              onChange={handleChange}
            />
          </li>
        </ul>
      </div>
      <div className="btns-container">
        <button
          type="button"
          className="move-btn btn-secondary"
          onClick={onPrevious}
        >
          <PreviousIcon />
          Previous
        </button>
        <button type="submit" className="move-btn">
          Submit
          <SubmitIcon />
        </button>
      </div>
    </form>
  )
}
