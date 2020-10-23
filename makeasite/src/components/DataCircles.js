import React, { Component } from 'react';
import BBHome from "../barebones/components/BBHome";

import BubbleChart from '@weknow/react-bubble-chart-d3';
import {Button} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';


// todo come up with a variable width....


export default class DataCircles extends Component {

  constructor(props) {
        super(props);

        this.deleteArticle = this.deleteArticle.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getArticleStyle = this.getArticleStyle.bind(this);
    };




getArticleStyle = () => {
  return this.props.aStyle(this.props.name);
}
forceUpdateHandler = () => {
  this.forceUpdate();
}

 deleteArticle = ()=> {
   this.props.deleteArticle(this.props.name);
 };
 setBackgroundImage = (name,current)=> {
   this.props.setBackgroundImage(name,current);
   //console.log("forcing Update")
   // props are read only
     this.forceUpdateHandler();
 };

  bubbleClick = (label) =>{
    console.log("Custom bubble click func")
  }
  legendClick = (label) =>{
    console.log("Customer legend click func")
  }


  renderPre = (e) => {
    if(this.props.editState === true){
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
    else return (<div/>)
  }

  renderPost = (e) => {
/*
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
*/
    if(this.props.editState)
      return(<BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>)
    else {
      return <div/>;
    }
  }



render(){
  if(this.props.data)  {
  return(
    <article className={css(this.props.styles.articleContainer)}>
      <a id={this.props.name} name={this.props.name}>
        <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
     </a>

    {this.renderPre()}

    <div id={this.props.name} name={this.props.name}
      className={css(this.props.styles.articleContainer,this.props.styles.articleContainer.jump)} display="inline">
    <div style={this.getArticleStyle()}>
    <BubbleChart
      graph= {{
        zoom: 1.1,
        offsetX: -0.05,
        offsetY: -0.01,
      }}
      width={1000}
      height={800}
      padding={0} // optional value, number that set the padding between bubbles
      showLegend={true} // optional value, pass false to disable the legend.
      legendPercentage={20} // number that represent the % of with that legend going to use.
      legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
      valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
      labelFont={{
            family: 'Arial',
            size: 16,
            color: '#fff',
            weight: 'bold',
          }}
      //Custom bubble/legend click functions such as searching using the label, redirecting to other page
      bubbleClickFunc={this.bubbleClick}
      legendClickFun={this.legendClick}
      // these are the bubbles
      data={this.props.data}
    />
    </div>
    </div>
    {this.renderPost()}
    </article>
  )
}
return(<p>Error</p>)
}
}
