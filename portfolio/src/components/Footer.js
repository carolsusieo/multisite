
import React, { Component } from 'react'
/*import "bootstrap/dist/css/bootstrap.min.css";*/
export default class Footer extends Component {

    constructor(props) {
          super(props)
          this.state = {
              contacts: [],
              isLoading: false,
          }
      }

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
