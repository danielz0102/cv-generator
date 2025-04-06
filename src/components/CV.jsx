import '@/styles/CV.css'

export function CV({ data }) {
  console.log({ data })
  const { general, companies, education, skills } = data

  return (
    <article className="cv">
      <CVHeader data={general} />
      {general?.about && (
        <p className="cv-about">
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
    <header className="cv-header">
      <h2 className="cv-title">{name}</h2>
      <p>
        {city} · <a href={`mailto:${email}`}>{email}</a> · {phone}
      </p>
    </header>
  )
}

function CVProfessional({ data }) {
  if (!data || data.length === 0) return

  return (
    <section className="container">
      <h3 className="cv-subtitle">Professional Experience</h3>
      <div className="container big-gap">
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
    <section className="container">
      <h3 className="cv-subtitle">Education</h3>
      <article className="header">
        <div className="header-row">
          <h4 className="school">{school}</h4>
          <p>{degree}</p>
        </div>
        <div className="header-row">
          <p>
            <strong>{city}</strong>
          </p>
          <p>
            <em>{formatDate(date) || 'Studying'}</em>
          </p>
        </div>
      </article>
    </section>
  )
}

function Company({ data }) {
  const { company, title, city, startDate, endDate, responsabilities } = data

  return (
    <article className="container">
      <header className="header">
        <div className="header-row">
          <h4>{company}</h4>
          <p>{title}</p>
        </div>
        <div className="header-row">
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
      <ul className="container">
        {responsabilities?.map((responsability, index) => (
          <li key={index}>{responsability}</li>
        ))}
      </ul>
    </article>
  )
}

function Skills({ data }) {
  if (!data || data.length === 0) return

  return (
    <section className="container">
      <h3 className="cv-subtitle">Additional skills</h3>
      <ul className="container">
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
