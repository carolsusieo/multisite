import React, { Component } from 'react';
// no longer using database for contact information

export default class ContactSpecifics extends Component {

    constructor(props) {
          super(props)

          this.sectionStyle = {
          width: "100%",
          backgroundImage: "url(" +  props.backimg + ")"
        };
      }

      render() {
        let test = this.props.contact;
        if(test)  {
            return (
            <section class='jumptarget' id={this.props.name}>
             <div>
                  <span>{test.FirstName} {test.LastName}</span><br/>
                  <span>{test.street}</span><br/>
                  <span>{test.city}, {test.state} {test.zip}</span><br/>
                  <span>{test.email}</span><br/>
                  <span>{test.phone}</span><br/>
                </div>
                </section>
            );
          };
        return(<p> No Data </p>);
    }
}
