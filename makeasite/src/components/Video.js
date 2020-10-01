import React, { Component } from 'react';

import ReactPlayer from "react-player";
import {Button} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";

export default class Video extends Component {

  constructor(props) {
        super(props);
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
render(){
  const urlin = this.props.url;
  if(urlin)  {
  return(
    <section class='jumptarget'  id={this.props.name} >
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

   <div classname = "row" style={this.getSectionStyle()}>
    <div class="row justify-content-start">
     <div class="col-2">
      <p/>
     </div>
     <div class="col-7">
        <ReactPlayer
            url={urlin}
          />

     </div>
    </div>
    </div>
    {this.props.editState &&(
      <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
    )}
    </section>




  )
}
return(<p>Error</p>)
}
}
