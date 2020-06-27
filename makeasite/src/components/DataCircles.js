import React, { Component } from 'react';

import BubbleChart from '@weknow/react-bubble-chart-d3';

export default class DataCircles extends Component {

  constructor(props) {
        super(props);
    }

  bubbleClick = (label) =>{
    console.log("Custom bubble click func")
  }
  legendClick = (label) =>{
    console.log("Customer legend click func")
  }

render(){
  const dataCircles = this.props.dataCircles;
  if(dataCircles)  {
  return(
    <div className="row skill">
        <div className="three columns header-col">
          <h1><span>this.props.header</span></h1>
        </div>
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
      data={dataCircles}
    />
    </div>
  )
}
return(<p>Error</p>)
}
}
