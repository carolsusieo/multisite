import React, { Component } from 'react';
import ContactSpecifics from './ContactSpecifics'
import PropTypes from 'prop-types';
//import resume from './Resume.pdf'
/*import "bootstrap/dist/css/bootstrap.min.css";*/

export default class Info extends Component {
  constructor(props) {
        super(props);
        this.sectionStyle = {
        width: "100%",
        backgroundImage: "url(" +  props.backimg + ")",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20

        };

  }


/*{(this.props.backimg && style="background-image: url({this.props.backimg})")}*/
/* an image specific to the About.....*/

    render() {
    return (

           <section class='jumptarget'   id={this.props.name} >
           <h2 >{this.props.header}</h2>

        <div className="container" style={this.sectionStyle}>
            <div>
              <img className="profile-pic" src={this.props.img} alt="" />
            </div>
            <div>
              {(this.props.text &&
                <p> {this.props.text}</p>
              )}
            </div>
              {(this.props.contact &&

              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <ContactSpecifics contact={this.props.contact}></ContactSpecifics>
               </div>
              </div>


             )}

          </div>
        </section>

   )}
};
