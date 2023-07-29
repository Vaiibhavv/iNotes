import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

// why we are using the context here, because we have to handle the add note button, by using the addNote(funcion), which is created inside the NoteState.js
export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context; // destructing addNote function for handle add note button
  const [changeNote, setChangeNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleAddBtn = (e) => {
    e.preventDefault();
    addNote(changeNote.title, changeNote.description, changeNote.tag);
    setChangeNote({ title: "", description: "", tag: "" });
    //setChangeNote(null);
  };
  const onChange = (e) => {
    // the syntax tells that, ... the initial property of changeNote state should be as it is, after that all properties should be overites, that is a element-name= element-value(title, description)
    setChangeNote({ ...changeNote, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="my-5">
        <div className="container mx-3 pt-4 px-4">
          <form>
            <div className="form-outline my-1">
              <label htmlFor="title">Note Title</label>
              <input
                value={changeNote.title}
                placeholder="Notes"
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
            <div className="form-outline mb-0 my-0">
              <label htmlFor="description">Description</label>
              <input
                value={changeNote.description}
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={onChange}
                placeholder="Write your notes here"
                required
                minLength={5}
                
              />
            </div>
            <br />
            <button
              disabled={
                changeNote.description.length < 5 && changeNote.title.length < 5
              }
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleAddBtn}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
