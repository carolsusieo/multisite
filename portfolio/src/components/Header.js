import React, { Component } from 'react';

/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import Work from './Work';
//import References from './References'
//import Education from './Education'
//import Skills from './Skills'
//import BubbleChart from './BubbleChart'

export default class Header extends Component {

    constructor(props) {
          super(props)
          this.state = {
              socialLinks: [],
              contact: "",
              isLoading: false,
              apiError: false,
          }
      }


      componentDidMount = async () => {

          let test = require('../myconfig.json');
          this.setState({
            socialLinks: test.social,
            contact: test.appContact,
            isLoading: false,
          });

      };


  render() {


    if(this.state.isLoading){
      return <p>Social Loading ...</p>;
    }

    const socials = this.state.socialLinks;
    const contact = this.state.contact;
    if(socials)  {
      return(

            <header id="home">
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
              <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
              <li><a className="smoothscroll" href="#about">About</a></li>
              <li><a className="smSkillsoothscroll" href="#resume">Resume</a></li>
              <li><a className="smoothscroll" href="#contact">Contact</a></li>
            </ul> {/* end #nav */}
          </nav> {/* end #nav-wrap */}
          <div className="row banner">
            <div className="banner-text">
              <h3 className="responsive-headline1">{contact.greeting}</h3>
              <h1 className="responsive-headline"><span>{contact.FirstName} </span><span>{contact.LastName}</span></h1>
              <h3>{contact.desc}<span> Please <a className="smoothscroll" href="#about">start scrolling </a>
              and learn more <a className="smoothscroll" href="#about">about me</a></span></h3>
              <hr />
               <ul className="social">
               {socials.map(test =>(
                 <li><a href={test.full} ><i className={test.fa} /></a></li>

               ))}
              </ul>
            </div>
          </div>
          <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
          </p>
        </header>



      );
    }


    return ( <p>Error</p>)

}
}
