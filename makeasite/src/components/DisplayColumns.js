import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
    this.sectionStyle = {
  //  width: "100%",
    backgroundImage: "url(" +  props.backimg + ")",


    };
    this.bulletStyle = {
      display:"inline-block",

    };
  }

  // want the columns to look like this:

  //  record header
  //        record main . record submain
  //        record text........................................................
  //        ...................................................................
  //        . record bullet........
  //        . record bullet........
  render() {
    var i = 1;
        return (
          <section class='jumptarget'  id={this.props.name}>
          <div>
            <h1>{this.props.header}</h1>
          </div>

          <div class="container" style={this.sectionStyle}>


            {this.props.data.map(record =>(
              <div>
               <div class="row justify-content-start" key={i++}>
                <div class="col-3">
                  <h3>{record.header}</h3>
                  <p>{record.main}<span> • </span> <em className="date">{record.submain}</em></p>
               </div>
                 <div class="col-7">
                  <p>
                    {record.text}
                  </p>
                  </div>
               </div>
               <div class = "row">
                  <div class="col-3"><p/></div>
                  <div class="col-7">
                  <ul class="text-left" style={this.bulletStyle}>

                  {record.subtext.map(subdesc =>(
                          <li key = {i++}>{subdesc} </li>
                   ))}
                   </ul>
                   </div>

               </div>
               <div class="row">
               <p/>
               </div>

              </div>
            ))}
            </div>

          </section>
        )
    }
  }
