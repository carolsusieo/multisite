import React, { Component } from 'react';
import BBHome from "../barebones/components/BBHome";

import BubbleChart from '@weknow/react-bubble-chart-d3';
import {Button} from 'reactstrap';

export default class DataCircles extends Component {

  constructor(props) {
        super(props);

        this.deleteSection = this.deleteSection.bind(this);
        this.setBackgroundImage = this.setBackgroundImage.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.getSectionStyle = this.getSectionStyle.bind(this);
    };




getSectionStyle = () => {
  return this.props.aStyle(this.props.name);
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

  bubbleClick = (label) =>{
    console.log("Custom bubble click func")
  }
  legendClick = (label) =>{
    console.log("Customer legend click func")
  }

render(){
  if(this.props.data)  {
  return(
    <section  id={this.props.name}>
    <div className="row skill" >
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
    </div>
    <div style={this.getSectionStyle()}>
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
    {this.props.editState &&(
      <BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>
    )}
    </div>
    </section>
  )
}
return(<p>Error</p>)
}
}
