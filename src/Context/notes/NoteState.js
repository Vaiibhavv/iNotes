import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>
{   
    const host="http://localhost:5000"
    const initialNotes= [];
    const [notes, setNotes]= useState(initialNotes);
    const [loading, setLoading]=useState(false);

     // to fetch all notes 
    
    const getNote = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setNotes(json);
        
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

   // to add note 
    const addNote=async(title, description, tag)=>
    {
       // previously we have add the notes by hardcode
        //note={"id":"383u",..}
        //setNotes(notes.concat(note))

        /// api call
       setLoading(true);
       try {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const note= await response.json();
        setNotes(notes.concat(note));
        
       } catch (error) {
        console.log("error while loading ",error);
       }
       finally
       {
         setLoading(false);
       }
        
    }
    
    //to delete note 
    const deleteNote=async(id)=>
    {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
          });
          console.log(response);
          // check the id is valid or not
           const newnote = notes.filter((note)=>{
            console.log(note._id);
            console.log(id);
            return note._id!==id;
        })
        setNotes(newnote);
    }

    
// to edit note 
    const editNote = async (id, title, description, tag) => {
      setLoading(true);
      try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, tag }),
        });
    
        const json = await response.json();
        console.log(json);
    
        const newNotes = await JSON.parse(JSON.stringify(notes));
        //check for overall length of the notes, and check the id of notes, by authentication
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
    
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
            break;
          }
        }
    
        console.log(newNotes);
        setNotes(newNotes);
      } catch (error) {
        console.error("Error editing note:", error);
      }
      finally
      {
        setLoading(false)
      }
    };
    
    return (
      <NoteContext.Provider value={{notes, addNote,deleteNote,editNote, getNote, setNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;