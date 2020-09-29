import React, { Component } from 'react';

import ReactPlayer from "react-player";

export default class Video extends Component {

  constructor(props) {
        super(props);
        this.sectionStyle = {
        width: "100%",
        backgroundImage: "url(" +  props.backimg + ")"
        };

    }


render(){




  const urlin = this.props.url;
  if(urlin)  {
  return(
    <section class='jumptarget'  id={this.props.name} >
      <h2>{this.props.header}</h2>

   <div classname = "row" style={this.sectionStyle}>
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
    </section>




  )
}
return(<p>Error</p>)
}
}
