import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Lgn() {
  const [credenitial, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  // login form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenitial.email,
        password: credenitial.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("user", json.n);
      navigate("/");  /// if token is valid then user will be redirect to the home page
    }
  };
  const onChange = (e) => {
    setCredential({ ...credenitial, [e.target.name]: e.target.value });
  };
  return (
    <div className="vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100 mb-3" style={{ backgroundColor: "#508bfc" }}>
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <h3>Login to iNoteS</h3>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    value={credenitial.email}
                    onChange={onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={credenitial.password}
                    onChange={onChange}
                  />
                </div>
                <span className="text-muted">
                  {" "}
                  Don't have an account <Link to="/signup">Sign Up</Link>{" "}
                </span>
                <br />
                <button type="submit" className="btn btn-primary btn-sm my-2">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lgn;
