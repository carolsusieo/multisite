import React, { Component } from 'react';
// no longer using database for contact information

export default class ContactSpecifics extends Component {

    constructor(props) {
          super(props)
      }

      render() {
        let test = this.props.contact;
        if(test)  {
            return (
                <div>
                  <span>{test.FirstName} {test.LastName}</span><br />
                  <span>{test.street}</span><br/>
                  <span>{test.city}, {test.state} {test.zip}</span><br />
                  <span>{test.email}</span><br/>
                  <span>{test.phone}</span><br/>
                </div>
            );
          };
        return(<p> No Data </p>);
    }
}
