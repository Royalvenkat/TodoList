import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

const Navbar = () => {
  return (
    <div>
        <ul className='Nav'>
           <li><Link to="/Weather">Weather</Link></li>
            <li><Link to="/Todo">To-Do list</Link></li>
        </ul>
    </div>
  )
}

export default Navbar