import React, { Component } from 'react';
import ReactPlayer from "react-player";

import {Button} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";
import renderHTML from 'react-render-html';
import EditItemPopUp from "./EditItemPopUp";
import SectionItem from "./SectionItem";
import {Draggable} from 'react-draggable';

export default class Section extends Component {

  constructor(props) {
        super(props);
        this.state = {showItemPopup: false};
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getSectionStyle = this.getSectionStyle.bind(this);
        this.addItemPopUp = this.addItemPopUp.bind(this);
        this.addItem = this.addItem.bind(this);
        this.rendorMore = this.rendorMore.bind(this);
    };


  addItemPopUp = (e) => {
    this.setState({showItemPopup: true});
  }

  addItem = (name,values) => {
    this.props.addItem(name,values)
    this.setState({showItemPopup: false})
    this.forceUpdateHandler();
  }


editItem = (id,values ) => {
  console.log("edit item " + id);
  // is it a new item, or an update?
  this.props.editItem(this.props.name,id,values);

}

deleteItem = (name, id) => {
  console.log("delete " + name + id);
  this.props.deleteItem(this.props.name,id);
}

getSectionStyle = () => {
  return this.props.aStyle(this.props.name);
}

forceUpdateHandler = () => {
  this.forceUpdate();
}

 deleteSection = ()=> {
   console.log("delete Section " + this.props.name);
   this.props.deleteSection(this.props.name);
   this.forceUpdateHandler();
 }

 setBackgroundImage = (name,current) => {
   this.props.setBackgroundImage(name,current);
   console.log("forcing Update")
   // props are read only
   //this.setSectionStyle(current.substr(1));
   this.forceUpdateHandler();
 }

 rendorMore = (e) => {
   console.log("show popup " + this.state.showItemPopup);
   if(this.state.showItemPopup === true){
       return(<EditItemPopUp style={{zIndex:'3000'}}
         text='Add New Item'
         sectionName = {this.props.name}
         addItem={this.addItem}
         />);
   }
   else if(this.props.editState === true){
     return(
     <Button
       id="qsDeleteSection"
       color="primary"
       class="btn btn-sm btn-outline-success"
       block
       onClick={() => this.deleteSection()}
     >
     Delete Section
     </Button>
     );
   }
   else {
     return <div/>;
   }
 }


 render(){


   var i = 0;
    return(
      <section class='jumptarget'
      id={this.props.name}
      name={this.props.name}
      className={this.props.name +'-section ' + this.props.classList}
       >


      <div>

        <h2>{this.props.header}</h2>

        <div className="container" style={this.getSectionStyle()}>
          {this.props.items && (
            this.props.items.map(item =>{
             return(
              <SectionItem editState={this.props.editState} item={item} deleteItem={this.deleteItem} editItem={this.editItem} include={this.props.include} addItem={this.addItem}/>
            )
            }))}

          {(!this.props.items && this.props.url) && (
            <div class="row justify-content-start">
              <div class="col-1"><p/></div>
              <div class="col-9">
                <ReactPlayer url={this.props.url}/>
              </div>
            </div>
          )}

          {this.props.editState &&(
            <div>
            <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
            <Button
              id='addItem'
              class="btn btn-sm btn-outline-success"
              block
              onClick={(event) => this.addItemPopUp(event)}
            >
            Add Item
            </Button>
            </div>
          )}
        </div>
      </div>
      {this.rendorMore()}
    </section>
  )}
}
