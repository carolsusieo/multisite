import React, { Component } from 'react';

import ReactPlayer from "react-player";

export default class Video extends Component {

  constructor(props) {
        super(props);
    }


render(){




  const urlin = this.props.url;
  if(urlin)  {
  return(
    <section id={this.props.name}>

    <div className="row skill">
        <div className="video">
          <h1><span>{this.props.header}</span></h1>
        </div>
        <ReactPlayer
            url={urlin}
          />
    </div>
    </section>
  )
}
return(<p>Error</p>)
}
}
