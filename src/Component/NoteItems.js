import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';


function NoteItems(props) {
    const context= useContext(noteContext);
    const{deleteNote}=context;
    const{updateNote,note}=props;
    // const handleAlert=()=>
    // {
    //     props.showAlert("Deleted", "Danger");
    // }
  return (
    <> 
            <div className='col-md-3 my-2'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.note.title}<i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(props.note._id)}}></i> <i onClick={()=>{updateNote(note)}} className="fa-regular fa-pen-to-square"></i></h5>
                        <p className='card-text'>{props.note.description}</p> 
                    </div>
                </div>
            </div>
    </>
  )
}

export default NoteItems
