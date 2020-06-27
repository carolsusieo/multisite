




import React, { Component } from 'react';
// no longer using database for contact information

export default class ContactSpecifics extends Component {

    constructor(props) {
          super(props)
          this.state = {
             isLoading: false,
              contact: {},
          }
      }


      componentDidMount = async () => {
          this.setState({ isLoading: true })
          let test = require('../myconfig.json');
          this.setState({
            contact: test.appContact,
            isLoading: false,
          });


      }


      render() {

        if(this.state.isLoading){
          return <p>Loading ...</p>;
        }

        let test = this.state.contact;
        console.log(test);

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
