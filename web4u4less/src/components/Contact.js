import React, {Component} from 'react';
import Section from './Section';


class Contact extends Component {
  constructor(props) {

          super(props);
          this.state = {
               props: props,
           }
      }



render(){

  return(
  <Section name = {this.state.props.name} classList = {this.state.props.classList}
          html= {
            <div className="container">

            <div className="row">
            {this.state.props.items.map(item =>{
              return(

              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fa fa-map text-primary mb-2"></i>
                    <h4 className="text-uppercase m-0">{item.title}</h4>
                    <hr className="my-4"></hr>
                    <div className="small text-black-50">{item.value}</div>
                  </div>
                </div>
              </div>
            )})}
            <div className="social d-flex justify-content-center">
            {this.state.props.social.map(social =>{
              return(

              <a href={social.full} className="mx-2">
                <i className={social.className}></i>
              </a>
              )})}
            </div>

            </div>
            </div>
          }>
  </Section>
)
}
}
export default Contact;
