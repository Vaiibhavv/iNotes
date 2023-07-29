import { React, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context; /// we are destructing the context, i.e we can use notes,
  
  // updation of note
  const [enote, esetnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: " ",
  });
  
  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null); // to handle the modal by using edit button ,
  const closeref = useRef(null);

  const updateNote = (currentnote) => {
    // currentnote = props note getting from noteitem
    ref.current.click(); // direct reference to the current dom of js , in the edit button
    esetnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const onChange = (
    e // changing the modal values of title and description
  ) => {
    esetnote({ ...enote, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    // editnote is the function of notestate.
    editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
    console.log(enote);
    closeref.current.click();
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Note Title</label>
                  <input
                    type="text"
                    value={enote.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    placeholder="Give title to your note"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    value={enote.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    placeholder="Write your notes here"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closeref}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-3">
        <div className="row my-3">
          <div className="container mx-2">
            {notes.length === 0 ? (
              <h4>No notes are here</h4>
            ) : (
              <h4>Your notes are here</h4>
            )}
          </div>
          {Array.isArray(notes) && notes.map((note) => {
            // we are sending the props as note
            return (
              <NoteItems
                note={note}
                key={note._id}
                showAlert={props.showAlert}
                updateNote={updateNote} // sended as a props to the noteItem ,
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
