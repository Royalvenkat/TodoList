import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; // Import your CSS file
// import ai from "./ai.jpg"

const Main = () => {
  return (
    <div>
  
      <nav>
        <h1>Touchui</h1>
      
        <ul>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
            {/* <img src={ai} alt="Venkat" /> */}
    </div>
  );
};

export default Main;
