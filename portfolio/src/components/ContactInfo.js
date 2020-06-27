import React, { Component } from 'react';
// no longer using database
import api from '../api'
/*
import styled from 'styled-components'


const Button = styled.button.attrs({
    className: `btn in the futureconsole.log
              <div className="row">
                <div className="columnin the future
              <div className="row">
                <div className="columnbtn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
*/

/*import "bootstrap/dist/css/bootstrap.min.css";*/
class ContactInfo extends Component {
  constructor(props) {
	super(props);
	this.state = {
  	firstName: '',
    lastName: '',
  	email: '',
  	message: ''
	}
  }
  /*<form> id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">*/
  /*  </form>*/

render() {
 return(
   <div className="ContactInfo">
    <div className="form-group">
        <label htmlFor="first">First Name</label>
        <input type="text" className="form-control" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="first">Last Name</label>
        <input type="text" className="form-control" value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} />
    </div>

    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
    </div>

    <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Submit</button>
    </div>
 );
}

  onFirstNameChange(event) {
	this.setState({firstName: event.target.value})
  }

  onLastNameChange(event) {
	this.setState({lastName: event.target.value})
  }

  onEmailChange(event) {
	this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	this.setState({message: event.target.value})
  }



handleSubmit = async () => {
      let firstName = this.state.firstName;
      let lastName = this.state.lastName;
      let email = this.state.email;
      let message  = this.state.message;
      console.log({firstName}, {lastName});
      const payload = { firstName, lastName, email,message }

      await api.insertContact(payload).then(res => {
          window.alert(`Contact inserted successfully`)
          this.setState({
              firstName: '',
              lastName:'',
              email: '',
              message: '',
          })
      })
  }


}

export default ContactInfo;
