import React, { Component } from 'react';
import dotenv from 'dotenv';

export default class Header extends Component {

    constructor(props) {
          super(props)
      }

  render() {
  const social = this.props.social;
  const landing = this.props.landing;
  const contact = this.props.contact;
  var texthere = '';
  var ref = '';
  var buttonLabel = '';
  var title = '';
  var mission = '';
  var img = '';
  var i= 1;
  if(landing){
    texthere = landing.lpage.texthere;
    ref = landing.lpage.ref;
    buttonLabel =landing.lpage.buttonLabel;
    title = landing.lpage.title;
    mission = landing.lpage.mission;
    img = landing.lpage.img;
  }
  // the className may change for every possible background image that might be used.
    if(social && contact)  {
      return(
        <section id={this.props.name}>
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
            </div>
          </div>
          </section>
      );
    }
    return ( <p>Error</p>)
  }
}
