import React, { Component } from 'react';
import dotenv from 'dotenv';
import BBHome from '../barebones/components/BBHome';

export default class Header extends Component {

    constructor(props) {
          super(props)
          this.setBackgroundImage = this.setBackgroundImage.bind(this);


      this.deleteSection = this.deleteSection.bind(this);
      this.setBackgroundImage = this.setBackgroundImage.bind(this);
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.getSectionStyle = this.getSectionStyle.bind(this);
  };




getSectionStyle = () => {
return this.props.aStyle(this.props.name);
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
  render() {
  const social = this.props.include.social;
  const landing = this.props.landing;
  const contact = this.props.include.contact;
  var texthere = '';
  var ref = '';
  var buttonLabel = '';
  var title = '';
  var mission = '';
  var  backimg = '';
  var i= 1;
    texthere = this.props.text;
    ref = this.props.ref;
    buttonLabel =this.props.buttonLabel;
    title = this.props.title;
    mission = this.props.mission;
    backimg = this.props.backimg;
  // the className may change for every possible background image that might be used.
    if(social && contact)  {
      return(
        <section class='jumptarget'  id={this.props.name}>
            <div className="header" id="home">
            <div className="banner">
              <h3 >{title}</h3>
              <h1 ><span>{contact.FirstName} </span><span>{contact.LastName}</span></h1>
              <h3>{texthere}<span> Please <a  href={ref}>start scrolling </a>
               {mission}<a href={ref}>{buttonLabel}</a></span></h3>
              <hr />
               <ul className="social">
               {social.map(test =>(
                 <li key = {i++}><a href={test.full} ><i className={test.fa} /></a></li>
               ))}
              </ul>
              {(this.props.editState) && (
              <BBHome name = {this.props.name} setBackgroundImage={this.setBackgroundImage}/>
              )}
            </div>
          </div>
          </section>
      );
    }
    return ( <p>Error</p>)
  }
}
