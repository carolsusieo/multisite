import React, { Component } from 'react';
import ContactSpecifics from './ContactSpecifics'
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";

//import resume from './Resume.pdf'
/*import "bootstrap/dist/css/bootstrap.min.css";*/

export default class Info extends Component {
  constructor(props) {
        super(props);
        this.deleteSection = this.deleteSection.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getSectionStyle = this.getSectionStyle.bind(this);
    };




getSectionStyle = () => {
  return this.props.getStyle(this.props.name);
}
forceUpdateHandler = () => {
  this.forceUpdate();
}

 deleteSection = ()=> {
   console.log("delete Section " + this.props.name);
   this.props.deleteSection(this.props.name);
 };
 setBackgroundImage = (name,current)=> {
   this.props.setBackgroundImage(name,current);
   console.log("forcing Update")
   // props are read only
   //this.setSectionStyle(current.substr(1));
   this.forceUpdateHandler();
 };
/*{(this.props.backimg && style="background-image: url({this.props.backimg})")}*/
/* an image specific to the About.....*/

    render() {
    return (

           <section class='jumptarget'   id={this.props.name} >
           {this.props.editState == true && (

           <h2 >{this.props.header}<span>
           <Button
               id="qsDeleteSection"
               color="primary"
               class="btn btn-sm btn-outline-success"
               block
               onClick={() => this.deleteSection({})}
               >
             Delete Section
           </Button></span></h2>

          )}
          {this.props.editState != true && (
            <h2>{this.props.header}</h2>)}


        <div className="container" style={this.getSectionStyle()}>
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
          {this.props.editState &&(
            <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
          )}
      </section>

   )}
};
