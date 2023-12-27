import React from 'react'
import Navbar from './Navbar'
import { Routes,Route } from 'react-router-dom'
import Todo from "./Todo"
import Weather from "./Weather"


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/Todo' element={<Todo/>}/>
        <Route path="/Weather" element={<Weather/>}/>
      </Routes>
    </div>
  )
}

export default App