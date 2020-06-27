import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/

import ContactSpecifics from './ContactSpecifics'
import ContactInfo from './ContactInfo'

export default class Contact extends Component {

  render() {
    return (
        <section id="contact">
          <div className="row section-head">
            <div className="two columns header-col">
              <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
              <p className="lead">Provide the following information so I can get back to you.
              </p>
            </div>
          </div>
          <div className="row">
            <ContactInfo></ContactInfo>

            <aside className="four columns footer-widgets"> 

              <div className="widget widget_contact">
                <ContactSpecifics></ContactSpecifics>
              </div>
          </aside>
          </div>
		</section>
)}};
