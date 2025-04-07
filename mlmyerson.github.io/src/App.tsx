import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className='layout'>
        <div className='about'>
          <h1>About Me</h1>
        </div>
        <div className='portrait'>
          <h1>Portrait</h1>
        </div>
        <div className='successes'>
          <h1>Successes</h1>
        </div>
        <div className='left-projects'>
          <h1>Left Projects</h1>
        </div>
        <div className='center-projects'>
          <h1>Center Projects</h1>
        </div>
        <div className='right-projects'>
          <h1>Right Projects</h1>
        </div>

      </div>
    </>
  )
}

export default App
