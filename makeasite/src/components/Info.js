import React, { Component } from 'react';
import ContactSpecifics from './ContactSpecifics'
//import resume from './Resume.pdf'
/*import "bootstrap/dist/css/bootstrap.min.css";*/

export default class Info extends Component {
  constructor(props) {
        super(props);
  }

  render() {
    return (
     <div>
        <section id={this.props.name}>
          <div className="row">
          {(this.props.img &&

            <div className="three columns">
              <img className="profile-pic" src={this.props.img} alt="" />
            </div>
          )}

            <div className="nine columns main-col">
              <h2>{this.props.header}</h2>
              {(this.props.text &&
                <p> {this.props.text}</p>
              )}

              {(this.props.contact &&

              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <ContactSpecifics contact={this.props.contact}></ContactSpecifics>
               </div>
              </div>
            )}
            </div>
          </div>
        </section>
	    </div>
   )}
};
