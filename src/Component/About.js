import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
function About() {
  let a = useContext(noteContext);
  return (
    <div>
      <div className="about-section paddingTB60 gray-bg vh-100">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-6">
              <div className="about-title clearfix">
                <h1>
                  About <span>iNoteS</span>
                </h1>
                <h3>Welcome to iNotes - Your Cloud-Based Note Management App! </h3>
                <p className="about-paddingB">
                At iNotes, we provide you with a secure and efficient platform to manage your notes hassle-free. Whether you are a student, a professional, or someone who loves jotting down ideas, iNotes has got you covered.
                </p>
                <h4>Data Security</h4>
                <p>
                At iNotes, we understand the importance of data security. Your notes are encrypted and protected with the latest security measures, ensuring that your personal information remains confidential and safe.
                </p>
                
                <h4>Join Us Today</h4>
                <p>Simplify your note management and stay organized with iNotes. Sign up now and experience the convenience of cloud-based note storage, seamless CRUD functionality, and efficient note search. Start managing your notes efficiently with iNotes today!</p>

                <p>Disclaimer: iNotes is a fictional app created for demonstration purposes only. Any resemblance to real products or services is purely coincidental.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
