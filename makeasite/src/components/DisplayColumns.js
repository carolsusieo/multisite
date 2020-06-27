import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
  }
  render() {
        return (
          <div className="row education">
            <div className="three columns header-col">
              <h1><span>{this.props.header}</span></h1>
            </div>
            <div className="nine columns main-col">
            {this.props.data.map(record =>(
              <div className="row item">
              <div className="row data"> 

                <div className="twelve columns">
                  <h3>{record.header}</h3>
                  <p className="info">{record.main}<span>•</span> <em className="date">{record.submain}</em></p>
                  <p className="info">
                    {record.text}
                  </p>
                  {record.subtext.map(subdesc =>(
                  <li className="info">{subdesc}</li>
                   ))}
                </div>
              </div>
              </div>
            ))}
            </div>
          </div>
        )
    }
  }
