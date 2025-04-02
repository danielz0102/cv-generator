import '@/styles/App.css'
import { CVForm } from './CVForm'
import { CV } from './CV'
import { useState } from 'react'

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
          <CV data={data} />
        ) : (
          <CVForm data={data} setData={setData} onSubmit={handleSubmit} />
        )}
      </main>
    </>
  )
}

export default App
