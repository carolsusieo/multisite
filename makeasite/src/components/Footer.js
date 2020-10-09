
import React, { Component } from 'react'
import {Button} from 'reactstrap';

/*import "bootstrap/dist/css/bootstrap.min.css";*/
export default class Footer extends Component {

    constructor(props) {
          super(props)
          this.addSection = this.addSection.bind(this);
          this.addSectionPopUp = this.addSectionPopUp.bind(this);
      };


   addSection = ()=> {
     console.log("add Section ");
     this.props.addSection();
   };

   addSectionPopUp = ()=> {
     console.log("add Section Popup  ");
     this.props.addSectionPopUp();
   };

  render() {
    return(
      <footer>
          {this.props.editState == true && (
          <Button
              id="qsAddSection"
              color="primary"
              class="btn btn-sm btn-outline-success"
              block
              onClick={() => this.addSectionPopUp({})}
              >
            Add Section
          </Button>

         )}
          <div className="row">
            <div className="twelve columns">
              <ul className="copyright">
                <li>© Copyright 2020 Web4U4Less</li>
                <li>Design by <a title="Web4U4Less" href="https://www.web4u4less/">Web4U4Less</a></li>
              </ul>
            </div>
            <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
          </div>
     </footer>
    )
  }
}
