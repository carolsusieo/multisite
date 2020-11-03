import React, { Component } from 'react';
// no longer using database for contact information
import { StyleSheet, css } from 'aphrodite';

export default class ContactSpecifics extends Component {

    constructor(props) {
          super(props)

          this.articleStyle = {
          width: "100%"
          };
      }

      render() {
        let test = this.props.contact;
        if(test)  {
            return (
              <section >
                  <span>{test.FirstName} {test.LastName}</span><br/>
                  <span>{test.street}</span><br/>
                  <span>{test.city}, {test.state} {test.zip}</span><br/>
                  <span>{test.email}</span><br/>
                  <span>{test.phone}</span><br/>
                </section>
            )
          }
          else
            return(<p> No Data </p>);
    }
}
