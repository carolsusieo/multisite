
import React, { Component } from 'react'
/*import "bootstrap/dist/css/bootstrap.min.css";*/
export default class Footer extends Component {

    constructor(props) {
          super(props)
          this.deleteSection = this.deleteSection.bind(this);
          this.setBackgroundImage = this.setBackgroundImage.bind(this);
          this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.getSectionStyle = this.getSectionStyle.bind(this);
      };




  getSectionStyle = () => {
    return this.props.getStyle('footer');
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
    return(
      <footer>
          <div className="row">
            <div className="twelve columns">
              <ul className="copyright">
                <li>© Copyright 2020 Carol Odiorne</li>
                <li>Design by <a title="Carol Odiorne" href="http://www.odiorne.info/">Carol Odiorne</a></li>
              </ul>
            </div>
            <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
          </div>
     </footer>
    )
  }
}
