import React, { useContext,  useState } from "react";
import { Link, useLocation } from "react-router-dom";
import user from './user.png'
import noteContext from "../Context/notes/noteContext";


const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const context= useContext(noteContext);
  const {notes, setNotes, getNote}= context;
  const [searchQuery, setSearchQuery] = useState("");

   
  /// whenever user wants to search by changing the value
  const onChange=(e)=>
  {
      setSearchQuery(e.target.value);
      const searchfunc = () => {
        let ss = document.getElementById("srch").value;
        const filteredNotes = Array.isArray(notes)&&notes.filter((note) =>
          note.description.toLowerCase().includes(ss.toLowerCase())
        );
        setNotes(filteredNotes); // Update the notes with filteredNotes
      };
      searchfunc();
      // Reset notes to original value when the user clears the search input
      if (e.target.value === "") {
        setNotes(getNote);
      }
      
    }
  // const searchfunc = () => {
  //   let ss = document.getElementById("srch").value;
  //   const filteredNotes = notes.filter((note) =>
  //     note.description.toLowerCase().includes(ss.toLowerCase())
  //   );
  //   setNotes(filteredNotes); // Update the notes with filteredNotes
  // };

 
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark  py-1 my-0">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            iNoteS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                 <Link className={`nav-link ${useLocation().pathname === "/" ? "active" : ""}`}
                  aria-current="page" to={!localStorage.getItem('token')?"/login":"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    useLocation().pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            {localStorage.getItem("token")&&<div className=" d-flex justify-content-center align-items-center">
            <form className="d-flex input-group w-auto mx-5">
                <input
                  id="srch"
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={onChange}
                  value={searchQuery}
                  />
                <span className="input-group-text text-white border-0 mx-1" style={{backgroundColor:"#00000000"}} id="search-addon">
                  <i  className="fas fa-search"></i>
                </span>
              </form>
            </div>}
                        
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
              </form>
            ) : (
              <div className="d-flex align-items-center">
                {/* User Logo (Avatar or Image) */}
                <img
                  src={user}// Replace with the path to the user logo image
                  alt="user"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px", backgroundColor:"white" }}
                />

                {/* User Name */}
                <span className="text-light mx-2">{localStorage.getItem("user")}</span>
                {/* Logout Button
                // <Link
                //   className="btn btn-primary btn-sm mx-3"
                //   to="/login"
                //   role="button"
                //   onClick={handleLogout}
                // >
                //   Logout
                // </Link> */}
              </div>
            )}
             {!localStorage.getItem("token")?<form className="d-flex" role="search">
               <Link className="btn btn-primary btn-sm mx-1" to="/login" role="button">Login</Link>
               <Link className="btn btn-primary btn-sm mx-1" to="/signup" role="button">SignUp</Link>
            </form>:(<Link className="btn btn-primary btn-sm mx-3" to="/login" role="button" onClick={handleLogout}>Logout</Link>)} 
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
