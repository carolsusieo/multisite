import React, { Component } from 'react';
import ReactPlayer from "react-player";

import {Button} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";
import renderHTML from 'react-render-html';
import EditItemPopUp from "./EditItemPopUp";
import ArticleItem from "./ArticleItem";
import {Draggable} from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';

export default class Article extends Component {

  constructor(props) {
        super(props);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getArticleStyle = this.getArticleStyle.bind(this);
        this.addItemPopUp = this.addItemPopUp.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onExit = this.onExit.bind(this);

        // based on whether we're in edit mode or standard mode,
        // the style to use might change.
        this.state = { styles: this.props.styles};
    };


  addItemPopUp = (e) => {
    this.props.addItemPopUp(this.props.name);
    console.log("selected to add item", e)
    this.forceUpdateHandler();
  }

  addItem = (name,values) => {
    console.log("add item selected")
    this.props.addItem(name,values)
    this.forceUpdateHandler();
  }

  onExit = (name,values) => {
    this.props.onExit()
    this.forceUpdateHandler();
  }


editItem = (id,values ) => {
  console.log("edit item " + id);
  // is it a new item, or an update?
  this.props.editItem(this.props.name,id,values);

}

deleteItem = (name, id) => {
//  console.log("delete " + name + id);
  this.props.deleteItem(this.props.name,id);
}

getArticleStyle = () => {
  return this.props.aStyle(this.props.name);
}

forceUpdateHandler = () => {
  this.forceUpdate();
}

 deleteArticle = ()=> {
  // console.log("delete Article " + this.props.name);
   this.props.deleteArticle(this.props.name);
   this.forceUpdateHandler();
 }

 setBackgroundImage = (name,current) => {
   this.props.setBackgroundImage(name,current);
   //console.log("forcing Update")
   // props are read only
   this.forceUpdateHandler();
 }

 renderPre = (e) => {
   if(this.props.editState === true){

 // delete the entire article button.  Probably look best, right on top.
 // avoid having to scroll to end to see it.... and probably the top is more like
 //to not have data on it

     return(
     <Button
       id="qsDeleteArticle"
       color="primary"
       block
       onClick={() => this.deleteArticle()}
     >
     Delete Section
     </Button>
     );
   }
   else {
     return <div/>;
   }
 }

 renderPost = (e) => {
   if(this.props.showItemPopup === true){

       return(<EditItemPopUp styles={this.props.styles}
         text='Add New Item'
         articleName = {this.props.name}
         addItem={this.addItem}
         onExit={this.onExit}
         />);
   }
   else {
     return <div/>;
   }
 }


 render(){


   var i = 0;
    return(
      <article className={css(this.props.styles.articleContainer)}>
        <a id={this.props.name} name={this.props.name}>
          <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
       </a>
       {this.renderPre()}

        <div className="container" style={this.getArticleStyle()}>
          {this.props.items && (
            this.props.items.map(item =>{
             return(
              <ArticleItem key={i++}
              editState={this.props.editState}
              item={item} deleteItem={this.deleteItem}
              editItem={this.editItem}
              include={this.props.include}
              addItem={this.addItem}
              styles={this.props.styles}
              onExit={this.props.onExit}/>
            )}
          ))}


          {(!this.props.items && this.props.url) && (
            <div className="row justify-content-start">
              <div className="col-1"><p/></div>
              <div className="col-9">
                <ReactPlayer url={this.props.url}/>
              </div>
            </div>
          )}

          {this.props.editState &&(
            <div>
              <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
              <Button
                id='addItem'
                block
                onClick={(event) => this.addItemPopUp(event)}
              >
              Add Item
              </Button>
            </div>
          )}
        </div>
      {this.renderPost()}
    </article>
  )}
}
