import React from 'react'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'
//import noteContext from '../Context/notes/noteContext'

export default function Home(props) {
  
  const navigate= useNavigate();

  return (
    <> 
        <div className='home '>
          
         {localStorage.getItem("token")==="undefined"?navigate("/login"):<div>
          <Notes/>
         </div>}
        </div>
    </>
  )
}
