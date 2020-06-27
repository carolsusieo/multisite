import React, { Component } from 'react';

/*import "bootstrap/dist/css/bootstrap.min.css";*/

export default class Education extends Component {
  constructor(props) {
        super(props)
        this.state = {
            education: [],
            isLoading: false,
//              apiError: false,
        }
    }


          componentDidMount = async () => {
              let test = require('../myconfig.json');
              this.setState({
                education: test.education,
                isLoading: false,
              });

          }

  render() {

    if(this.state.isLoading){
      return <p>Work Loading ...</p>;
    }
    //if(this.state.apiError){
    //  return(<p>Error in API</p>)
    //}

    const educations = this.state.education;
    if(educations)  {

      return (

          <div className="row education">
            <div className="three columns header-col">
              <h1><span>Education</span></h1>
            </div>

            <div className="nine columns main-col">
            {educations.map(test =>(
              <div className="row item">
                <div className="twelve columns">
                  <h3>{test.school}</h3>
                  <p className="info">{test.degree} <span>{test.field}</span><span>•</span> <em className="date">{test.years}</em><span>•</span><span>{test.gpa}</span> </p>
                </div>
              </div>
            ))}

            </div>
          </div>
        )};
        return(<p>"error"</p>);

      }
};
