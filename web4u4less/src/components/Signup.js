import React, {Component} from 'react';
import Section from './Section';
import api from '../api/index';

class Signup extends Component {
  constructor(props) {

          super(props);
          this.state = {
               props: props,
               value: "",
          }
          this.handleChange = this.handleChange.bind(this);
      }


render(){

  return(
  <Section name = {this.state.props.name} classList = {this.state.props.classList}
  html = {
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-lg-8 mx-auto text-center">

          <i className="fa fa-paper-plane fa-2x mb-2 text-white"></i>
          <h2 className="text-white mb-5">{this.state.props.header}</h2>



          <form className="form-inline d-flex">
            <input type={this.state.props.input}
              className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
              id={this.state.props.inputId}
              placeholder={this.state.props.inputText}
              onChange = {this.handleChange}/>
            <button type={this.state.props.button} className="btn btn-primary mx-auto" onClick={this.handleSubmit.bind(this)}>{this.state.props.buttonText}  </button>
          </form>
        </div>
      </div>
    </div>
  }
  >
  </Section>
)
}
handleSubmit = async (e) => {
  e.preventDefault();
  console.log("value", this.state.value);

      let email = this.state.value;
      const payload = {email};

      await api.insertSignup(payload).then(res => {
          window.alert(`Thank you for signing up.  Look out for our welcome email.`)
          this.setState({
              value: '',
          })
      })
  }

  handleChange (event) {
    this.setState({value: event.target.value})
   }



}
export default Signup;
