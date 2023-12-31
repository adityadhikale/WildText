
import './App.css';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Textbox from './components/Textbox';
import Alert from './components/Alert';
import About from './components/About';
import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

function App() {
  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const toggelmode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = '#2F3337'
      showAlert('Dark mode is enable', 'success');
    }
    else {
      setmode('light')
      document.body.style.backgroundColor = 'white'
      showAlert('Light mode is enable', 'success');
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <>
      {/* <Router> */}
        <Navbar title='WildText' mode={mode} toggelmode={toggelmode} />
        <Alert alert={alert} />
        {/* <Routes> */}
          {/* <Route path="/about" element={<About mode={mode} title='WildText' />} /> */}
          {/* <Route path="/" element={<Textbox heading='Enter text below' mode={mode} showAlert={showAlert} />} /> */}
          <Textbox heading='Enter text below' mode={mode} showAlert={showAlert} />
        {/* </Routes> */}
      {/* </Router> */}
    </>
  );
}

export default App;
