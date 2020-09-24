import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
  }
  render() {
    var i = 1;
        return (
          <section id={this.props.name}>

          <div className="row education">
            <div className="three columns header-col">
              <h1><span>{this.props.header}</span></h1>
            </div>
            <div className="nine columns main-col">
            {this.props.data.map(record =>(
              <div className="row item" key={i++}>
               <div className="row data">
                <div className="twelve columns">
                  <h3>{record.header}</h3>
                  <p className="info">{record.main}<span>•</span> <em className="date">{record.submain}</em></p>
                  <p className="info">
                    {record.text}
                  </p>
                  {record.subtext.map(subdesc =>(
                  <li className="info" key = {i++}>{subdesc}</li>
                   ))}
                </div>
               </div>
              </div>
            ))}
            </div>
          </div>
          </section>
        )
    }
  }
