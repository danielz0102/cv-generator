import '@/styles/App.css'
import { CVForm } from './CVForm'
import { CV } from './CV'
import { EditIcon, DownloadIcon } from './Icons'
import { useState } from 'react'
import html2pdf from 'html2pdf.js'

function App() {
  const [showCV, setShowCV] = useState(false)
  const [data, setData] = useState({
    general: {},
    companies: [],
    education: {},
    skills: [],
  })

  function handleSubmit() {
    setShowCV(true)
  }

  function download() {
    const cv = document.querySelector('.cv').cloneNode(true)
    cv.classList.add('cv--print')

    const options = {
      margin: 0.5,
      filename: 'cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    html2pdf().set(options).from(cv).save()
  }

  return (
    <>
      <header className="app-header">
        <h1>CV Generator</h1>
        {!showCV && (
          <p>Fill your information to create a resume automatically</p>
        )}
      </header>
      <main>
        {showCV ? (
          <>
            <div className="options">
              <button className="options__btn" onClick={() => setShowCV(false)}>
                <EditIcon />
                Edit
              </button>
              <button className="options__btn" onClick={download}>
                <DownloadIcon />
                PDF
              </button>
            </div>
            <CV data={data} />
          </>
        ) : (
          <CVForm data={data} setData={setData} onSubmit={handleSubmit} />
        )}
      </main>
    </>
  )
}

export default App
