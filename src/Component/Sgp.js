import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sgp() {
  const [credenitial, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://quicknotes-1faq.onrender.com/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credenitial.name,
        email: credenitial.email,
        password: credenitial.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem('user',credenitial.name);
      navigate("/");
    } else {
      alert("User already found");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credenitial, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="vh-100">
        <div className="d-flex justify-content-center align-items-center vh-100 mb-3"
          style={{ backgroundColor: "#508bfc" }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <h4>Welcome to iNoteS..!</h4>
                  <div className="form-outline">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={credenitial.email}
                      onChange={onChange}
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-outline ">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="name"
                      name="name"
                      value={credenitial.name}
                      onChange={onChange}
                      required
                      minLength={5}
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={credenitial.password}
                      onChange={onChange}
                      required
                      minLength={5}
                    />
                  </div>
                  <button className="btn btn-primary btn-sm btn-block" type="submit">SignUp</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sgp;
