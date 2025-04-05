import '@/styles/CV.css'

export function CV({ data }) {
  console.log({ data })
  const { general, companies, education, skills } = data

  return (
    <article className="cv">
      <CVHeader data={general} />
      {general?.about && (
        <p className="cv__about">
          <em>{general.about}</em>
        </p>
      )}
      <CVProfessional data={companies} />
      <CVEducation data={education} />
      <Skills data={skills} />
    </article>
  )
}

function CVHeader({ data }) {
  if (!data || Object.keys(data).length === 0) return

  const { name, city, email, phone } = data

  return (
    <header className="cv__header">
      <h2>{name}</h2>
      <p>
        {city} · <a href={`mailto:${email}`}>{email}</a> · {phone}
      </p>
    </header>
  )
}

function CVProfessional({ data }) {
  if (!data || data.length === 0) return

  return (
    <section className="cv__section">
      <h3>Professional Experience</h3>
      <div className="companies">
        {data?.map((company) => (
          <Company key={company.title} data={company} />
        ))}
      </div>
    </section>
  )
}

function CVEducation({ data }) {
  if (!data || Object.keys(data).length === 0) return

  const { school, degree, city, date } = data

  return (
    <section className="cv__section">
      <h3>Education</h3>
      <article className="school">
        <div className="school__row">
          <h4>{school}</h4>
          <p>{degree}</p>
        </div>
        <div className="school__row">
          <p>
            <strong>{city}</strong>
          </p>
          <p>
            <em>{formatDate(date)}</em>
          </p>
        </div>
      </article>
    </section>
  )
}

function Company({ data }) {
  const { company, title, city, startDate, endDate, responsabilities } = data

  return (
    <article className="company">
      <header className="company__header">
        <div className="company__header__row">
          <h4>{company}</h4>
          <p>{title}</p>
        </div>
        <div className="company__header__row">
          <p>
            <strong>{city}</strong>
          </p>
          <p>
            <em>
              {formatDate(startDate)} – {formatDate(endDate)}
            </em>
          </p>
        </div>
      </header>
      <p>{responsabilities}</p>
    </article>
  )
}

function Skills({ data }) {
  if (!data || data.length === 0) return

  return (
    <section className="cv__section">
      <h3>Additional skills</h3>
      <ul className="cv__list">
        {data?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}

function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `${months[date.getMonth()]} ${date.getFullYear()}`
}
