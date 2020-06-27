import React, {Component} from 'react';
import Section from './Section';


class About extends Component {
  constructor(props) {

          super(props);
          this.state = {
               props: props,
           }
      }



render(){

  return(
  <Section name = {this.state.props.name} classList = {this.state.props.classList}
    html={
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2 className="text-white mb-4">{this.state.props.header}</h2>
                <p className="text-white-50">{this.state.props.text}
                </p>
              </div>
            </div>
            <img src={this.state.props.img} className="img-fluid" alt=""></img>
          </div>
        }>
  </Section>
)
}
}
export default About;
