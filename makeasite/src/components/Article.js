import React, { Component } from 'react';
import ReactPlayer from "react-player";

import {Button, Container} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";
import renderHTML from 'react-render-html';
import EditItemPopUp from "./EditItemPopUp";
import ArticleItem from "./ArticleItem";
import ArticleButton from "./ArticleButton";
import {Draggable} from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import BubbleChart from '@weknow/react-bubble-chart-d3';




// todo - update the db at the article level, or, can send a
// routine to cause a forced update at the app level when something
// changes in article.... (the later done for now... via forceUpdateHandler)
export default class Article extends Component {

  constructor(props) {
        super(props);
        this.state = {
          article: props.article,
          styles: props.styles,
          cStyle: props.article.style,
          backimgEdited: false,
          showItemPopup: false
        };

        // initial setup of styles
        if(this.state.cStyle == undefined || this.state.cStyle == {}){
             if(props.article.backimg && props.article.backimg != ""){
               this.state.cStyle = {
                 width: "100%",
                 backgroundImage: "url(" +  props.article.backimg + ")",
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "top",
               }
             }
       }
       else{
        this.state.article.style.backgroundImage = this.formatStyleWithImg();
       }



  //      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.addItemPopUp = this.addItemPopUp.bind(this);
  //      this.addItem = this.addItem.bind(this);
        this.onExit = this.onExit.bind(this);

        // based on whether we're in edit mode or standard mode,
        // the style to use might change.
    };


    whichItem = (id,article) => {
      console.log(id, article)
      if(article.items != undefined){
        for(var j = 0; j < article.items.length;j++){
            if(article.items[j].id === id){
              return j;
            }
          }
          return -1;
      }
      else return -1;
    }


      onExit = () => {
        if(this.state.showItemPopup){
          // restore original

           let currConfig = Object.assign({}, this.state.article);
           currConfig.items.pop();
           this.setState({article: currConfig});

        }
        // todo probably want to read in the record from the database...
        // no... we want to do that when they exit out...

        this.setState({showItemPopup:false});
        this.props.manageItemPopup(false);
        this.forceUpdate();
      }

      addItemPopUp = () =>{

        // need to add the item.... with the state set up
        // properly....
        var whichItem = 0;
        if(this.props.manageItemPopup(true)){
          console.log("add item popup")

          var values = { "id": Date.now(),"type": "text", "data":"add...", "new": true};

          let currConfig = Object.assign({}, this.state.article);
          if(currConfig.items != undefined){
            const newItems = [
              ...currConfig.items,
              values
            ]
            currConfig.items = newItems;
            whichItem = currConfig.items.length -1;
          }
          else{
            currConfig.items = [values];
            console.log (currConfig.items)
            whichItem = 0;
          }

          this.setState({showItemPopup:true,article:currConfig,currItemNum:whichItem});

          // NOT seeing the popup

          // and, we need to create the itme in the articles set of items
          // even if it's removed on Exit...
          this.forceUpdate();
        }
      }

      /* add and edit*/
      editItem = (id, values) => {
        let currConfig = Object.assign({}, this.state.article);

           var j = this.whichItem(id,currConfig);
          if(j != -1){
             // item isn't first one
             values.id = id;
               if(this.state.article.items[j].new === true){
                 values.new = false;
               }
               currConfig.items[j] = values;
           }
           else if(currConfig.items && currConfig.items[currConfig.items.length -1].new === true){
               // overwrite this one - the first one added
               values.new = false;
               values.id = id;
               if(!values.id || values.id === "" )
                  values.id = Date.now();
               currConfig.items[currConfig.items.length -1] = values;
               console.log(values,currConfig)

           }
           console.log(currConfig)
        this.props.manageItemPopup(false);
        this.setState({showItemPopup:false, article:currConfig})
        this.props.forceUpdateHandler(this.props.article.name,currConfig);

    }

      deleteItem = (id) => {
        console.log("deleting item ", id)
        let currConfig = Object.assign({}, this.state.article);
       // console.log("app delete " + name + id)

         var j = this.whichItem(id,currConfig);
         if(j != -1){
           currConfig.items.splice(j,1);
           this.setState({article:currConfig});
           this.props.forceUpdateHandler();
         }
         this.props.manageItemPopup(false);

      }


    formatStyleWithImg = () =>{
      var backgroundImage;
      if(this.state.article.backimg != undefined) {
        if(this.state.cStyle != undefined){
          if(this.state.cStyle.backgroundHold != undefined &&
                this.state.cStyle.backgroundHold.includes("url")){
                  backgroundImage =
                  this.state.cStyle.backgroundHold +
                  this.state.article.backimg + ")";
          }
          // this throws error on edit, but looks better and resizes
          else if(this.state.cStyle.backgroundImageHold != undefined &&
            this.state.cStyle.backgroundImageHold.includes("url")){
            backgroundImage =
             this.state.cStyle.backgroundImageHold +
             this.state.article.backimg + ")";
          }
          else if(this.state.cStyle.backgroundHold != undefined){
            backgroundImage = this.state.cStyle.backgroundHold;
          }
          else if(this.state.cStyle.backgroundImage == undefined){
            backgroundImage = "url(" +  this.state.article.backimg + ")";
          }
        }
        else{

        }
      }
      return backgroundImage;
    }


    getStyle = () => {
      let currentStyle = Object.assign({}, this.state.cStyle);  // creating copy of state variable jasper

      if(this.state.backimgEdited){
        // need to update the style to include the newly set value.
        currentStyle.backgroundImage = this.formatStyleWithImg();
//        console.log("getStyle" , currentStyle.backgroundImage)

      }
      return currentStyle;
    }
/*
forceUpdateHandler = () => {
  this.forceUpdate();
}
*/
 deleteArticle = ()=> {
   this.props.deleteArticle(this.props.article.name);
 }

 setBackgroundImage = (current) => {
   /*
   this.props.setBackgroundImage(name,current);
   //console.log("forcing Update")
   // props are read only
     */

  //   console.log("background" , current)
    let currArticle = Object.assign({},this.state.article,{backimg:current});
    this.setState({article:currArticle,backimgEdited:true})

    // still not 100% on how to manage state updates and push up too
    this.props.forceUpdateHandler(currArticle.name,currArticle);

 }

 renderPre = (e) => {
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

 renderPost = (e) => {
   if(this.state.showItemPopup === false){

     // because this button is at the bottom, it can be hard
     // to select when the style is such that it seems a bit hidden.

     return(<div>

       <Button
         id='addItem'
         color="primary"
         block
         zIndex='10000'
         onClick={() => this.addItemPopUp()}
       >
       Add Item
       </Button>


       <BBHome setBackgroundImage={this.setBackgroundImage} />


     </div>
   )}
   else {
       return(<EditItemPopUp styles={this.props.styles}
         text='Add New Item'
         item={this.state.article.items[this.state.currItemNum]}
         articleName = {this.props.article.name}
         editItem = {this.editItem}
         deleteItem={this.deleteItem}
         onExit={this.onExit}
         />);
   }
 }

// this isn't helping to allow selection of the buttons for adding fetures...

 setupAnchor = () => {
   if(this.props.editState === true){
     // don't use the anchor stuff cause it messes up buttons
     let anchor = Object.assign({},this.props.styles.anchor);

     //strip out the margin and padding
      delete anchor.paddingTop
      delete anchor.marginTop

//     console.log(anchor)
     return(anchor)
   }
   else{
     return this.props.styles.anchor
   }
 }

 render(){


   var i = 0;
    return(
      <article className={css(this.props.styles.articleContainer)}>
        <a id={this.props.article.name} name={this.props.article.name}>
         <h2 className={css(this.setupAnchor())}>{this.props.article.header}</h2>
       </a>
       {this.props.editState && (this.renderPre())}

        <div style={this.getStyle()} className={this.props.article.className}>
         <Container>
          {this.state.article.items && (
            this.state.article.items.map(item =>{

              if(item.type != 'button') {
                return(

              <ArticleItem key={i++}
              editState={this.props.editState}
              styles={this.props.styles}
              include={this.props.include}
              manageItemPopup = {this.props.manageItemPopup}
              showItemPopup = {item.new}
              item={item}
              deleteItem={this.deleteItem}
              editItem={this.editItem}
              onExit={this.onExit}
            />)
            }
            else {

            return(
             <ArticleButton key={i++}
             editState={this.props.editState}
             styles={this.props.styles}
             include={this.props.include}
             manageItemPopup = {this.props.manageItemPopup}
             showItemPopup = {item.new}
             item={item}
             deleteItem={this.deleteItem}
             editItem={this.editItem}
             onExit={this.onExit}
           />
           )}
          }))}


          {(!this.props.article.items && this.props.article.url) && (
            <div>
              <ReactPlayer url={this.props.article.url}/>
            </div>
          )}
          {(!this.props.article.items && this.props.article.data) && (
            <BubbleChart
              graph= {{ zoom: 1.1,offsetX: -0.05,offsetY: -0.01,}}
              width={1000}
              height={800}
              padding={0} // optional value, number that set the padding between bubbles
              showLegend={true} // optional value, pass false to disable the legend.
              legendPercentage={20} // number that represent the % of with that legend going to use.
              legendFont={{family: 'Arial',size: 12,color: '#000',weight: 'bold'}}
              valueFont={{family: 'Arial',size: 12,color: '#fff',weight: 'bold'}}
              labelFont={{family: 'Arial',size: 16,color: '#fff',weight: 'bold'}}
//              bubbleClickFunc={this.bubbleClick}
//              legendClickFun={this.legendClick}
              data={this.props.article.data}
            />
          )}
          </Container>
        </div>
      {this.props.editState && (this.renderPost())}
    </article>
  )}
}
