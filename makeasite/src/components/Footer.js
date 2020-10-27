
import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {css } from 'aphrodite';

/*import "bootstrap/dist/css/bootstrap.min.css";*/
export default class Footer extends Component {

    constructor(props) {
          super(props)
          this.addArticle = this.addArticle.bind(this);
          this.addArticlePopUp = this.addArticlePopUp.bind(this);
      };


   addArticle = ()=> {
  //   console.log("add Article ");
     this.props.addArticlePopUp();
   };

   addArticlePopUp = ()=> {
  //   console.log("add Article Popup  ");
     this.props.addArticlePopUp();
   };

  render() {
    return(

      <footer className={css(this.props.styles.articleContainer)}
          id={this.props.name} name={this.props.name}>

        {this.props.editState == true && (
          <Button
              id="qsAddArticle"
              color="primary"
              block
              onClick={() => this.addArticlePopUp({})}
              >
            Add Section
          </Button>
         )}

          <div className="row">
            <div className="twelve columns">
              <ul className="copyright">
                <li>© Copyright 2020 Web4U4Less</li>
                <li>Design by <a title="Web4U4Less"
                  href="https://www.web4u4less/">Web4U4Less</a></li>
              </ul>
            </div>
            <div id="go-top"><a className="smoothscroll" title="Back to Top"
              href="#home"><i className="icon-up-open" /></a></div>
          </div>
     </footer>
    )
  }
}
