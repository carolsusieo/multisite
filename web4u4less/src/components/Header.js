import React, {Component} from 'react';
import * as Scroll from 'react-scroll';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      props:props,
    }
  }
  render(){
  return (
    <header id="scroll-to-top" name="scroll-to-top" className="masthead">
    <div name="home" className="container d-flex h-100 align-items-center">
      <div className="mx-auto text-center">
      <h1 className="mx-auto my-0 text-uppercase">{this.state.props.title}</h1>
      <h2 className="text-white-50 mx-auto mt-2 mb-5">{this.state.props.text}</h2>
      <Scroll.Link smooth={true} duration={500} spy={true} to="about" className="btn btn-primary js-scroll-trigger">{this.state.props.buttonLabel}</Scroll.Link>
      </div>
    </div>
  </header>
    );
  }
}
