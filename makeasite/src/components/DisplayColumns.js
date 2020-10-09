import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'
import BBHome from "../barebones/components/BBHome";
import {Button} from 'reactstrap';


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
    this.bulletStyle = {
      display:"inline-block",

    };
    this.deleteSection = this.deleteSection.bind(this);
    this.setBackgroundImage = this.setBackgroundImage.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.getSectionStyle = this.getSectionStyle.bind(this);
};




getSectionStyle = () => {
return this.props.getStyle(this.props.name);
}
forceUpdateHandler = () => {
this.forceUpdate();
}

deleteSection = ()=> {
console.log("delete Section " + this.props.name);
this.props.deleteSection(this.props.name);
};
setBackgroundImage = (name,current)=> {
this.props.setBackgroundImage(name,current);
console.log("forcing Update")
// props are read only
//this.setSectionStyle(current.substr(1));
this.forceUpdateHandler();
};

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
          {this.props.editState == true && (

          <h2 >{this.props.header}<span>
          <Button
              id="qsDeleteSection"
              color="primary"
              class="btn btn-sm btn-outline-success"
              block
              onClick={() => this.deleteSection({})}
              >
            Delete Section
          </Button></span></h2>

         )}
         {this.props.editState != true && (
           <h2>{this.props.header}</h2>)}
          </div>

          <div class="container" style={this.getSectionStyle()}>


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
            {this.props.editState &&(
              <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
            )}

          </section>
        )
    }
  }
