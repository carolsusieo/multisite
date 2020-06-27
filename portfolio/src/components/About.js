import React, { Component } from 'react';
import ContactSpecifics from './ContactSpecifics'
import resume from './Resume.pdf'
/*import "bootstrap/dist/css/bootstrap.min.css";*/

export default class About extends Component {

  render() {

    return (


     <div>

        <section id="about">
          <div className="row">
            <div className="three columns">
              <img className="profile-pic" src="images/profilepic.jpg" alt="" />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <ContactSpecifics></ContactSpecifics>
               </div>
                <div className="columns download">

                  <p><a href={resume} download="Resume.pdf" className="button"><i className="fa fa-download" />Download Resume</a>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
	</div>
)}
};
