import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Component/Alert';
import { useState } from 'react';
import Lgn from './Component/Lgn';
import Sgp from './Component/Sgp';
function App() {
  const[alert, setAlert]=useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  };
  return (
    <>
    <NoteState>
      <Router>
          <Navbar/>
         <Alert alert={alert}/>
        <Routes>
          <Route path='/about' element={ <About/>}/>
          <Route path='/' element={ <Home showAlert={showAlert}/>}/>
          <Route path='/login' element={ <Lgn/>}/>
          <Route path='/signup' element={<Sgp/>}/>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
