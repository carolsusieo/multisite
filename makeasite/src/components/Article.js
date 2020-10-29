import React, { Component } from 'react';
import ReactPlayer from "react-player";

import {Button, Container} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";
import renderHTML from 'react-render-html';
import EditItemPopUp from "./EditItemPopUp";
import ArticleItem from "./ArticleItem";
import {Draggable} from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import BubbleChart from '@weknow/react-bubble-chart-d3';




// todo - update the db at the article level, or, can send a
// routine to cause a forced update at the app level when something
// changes in article....
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



        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.addItemPopUp = this.addItemPopUp.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onExit = this.onExit.bind(this);

        // based on whether we're in edit mode or standard mode,
        // the style to use might change.
    };


    whichItem = (id,article) => {
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

        this.setState({showItemPopUp:false});
        this.forceUpdate();
      }

      addItemPopUp = () =>{

        var values = { "id": Date.now(),"type": "text", "data":"add..." };

        let currConfig = Object.assign({}, this.state.article);
            if(currConfig.items != undefined){
              const newItems = [
                ...currConfig.items,
                values
              ]
              currConfig.items = newItems;
              this.setState({article: currConfig});
            }
            else{
              currConfig.items = [values];
              this.setState({article: currConfig});
            }
            this.forceUpdateHandler();

        this.setState({showItemPopUp:true});
        // and, we need to create the itme in the articles set of items
        // even if it's removed on Exit...
        this.forceUpdate();
      }

      addItem = (values,style) => {
        let currConfig = Object.assign({}, this.state.article);

         console.log(values, style)
          // the values need to be checked and possibly modified
          // a submit could of been an update for a carddeck card.

              values.id = Date.now();
            if(currConfig.items != undefined){
              const newItems = [
                ...currConfig.items,
                values
              ]
                currConfig.items = newItems;
              this.setState({article: currConfig});
            }
            else{
              currConfig.items = [values];
              this.setState({article: currConfig});
            }
            this.forceUpdateHandler();

        this.setState({showItemPopUp: false})
      }


      editItem = (id, values) => {
        console.log("edit", values)
        let currConfig = Object.assign({}, this.state.article);

           var j = this.whichItem(id,currConfig);
           if(j != -1){
               currConfig.items[j] = values;
               this.setState({article: currConfig});
               this.forceUpdateHandler();
           }

        this.setState({showItemPopUp:false})
    }

      deleteItem = (id) => {
        console.log("deleting item ", id)
        let currConfig = Object.assign({}, this.state.article);
       // console.log("app delete " + name + id)

         var j = this.whichItem(id,currConfig);
         if(j != -1){
           currConfig.items.splice(j,1);
           this.setState({article:currConfig});
           this.forceUpdateHandler();
         }

      }


    formatStyleWithImg = () =>{
      var backgroundImage;
      if(this.state.article.backimg != undefined) {
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
      return backgroundImage;
    }


    getStyle = () => {
      let currentStyle = Object.assign({}, this.state.cStyle);  // creating copy of state variable jasper

      if(this.state.backimgEdited){
        // need to update the style to include the newly set value.
        currentStyle.backgroundImage = this.formatStyleWithImg();
        console.log(currentStyle.backgroundImage)

      }
      return currentStyle;
    }

forceUpdateHandler = () => {
  this.forceUpdate();
}

 deleteArticle = ()=> {
   this.props.deleteArticle(this.props.article.name);
   this.forceUpdateHandler();
 }

 setBackgroundImage = (current) => {
   /*
   this.props.setBackgroundImage(name,current);
   //console.log("forcing Update")
   // props are read only
     */

     console.log(current)

    this.setState(prevState =>  ({
      article:{
        ...prevState.article,
        backimg: current
      },
      backimgEdited: true
    }));
    this.forceUpdateHandler();

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
   if(!this.props.showItemPopup === true){
     return(<div>
       <BBHome setBackgroundImage={this.setBackgroundImage} />
       <Button
         id='addItem'
         block
         onClick={(event) => this.addItemPopUp(event)}
       >
       Add Item
       </Button>
     </div>
   )}
   else {
       return(<EditItemPopUp styles={this.props.styles}
         text='Add New Item'
         articleName = {this.props.article.name}
         addItem={this.addItem}
         deleteItem={this.deleteItem}
         onExit={this.onExit}
         />);
   }
 }


 render(){


   var i = 0;
    return(
      <article className={css(this.props.styles.articleContainer)}>
        <a id={this.props.article.name} name={this.props.article.name}>
         <h2 className={css(this.props.styles.anchor)}>{this.props.article.header}</h2>
       </a>
       {this.props.editState && (this.renderPre())}

        <div style={this.getStyle()} className={this.props.article.className}>
<Container>
          {this.props.article.items && (
            this.props.article.items.map(item =>{
             return(
              <ArticleItem key={i++}
              editState={this.props.editState}
              item={item}
              deleteItem={this.deleteItem}
              editItem={this.editItem}
              include={this.props.include}
              addItem={this.addItem}
              styles={this.props.styles}
              onExit={this.props.onExit}

              />
            )}
          ))}


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
