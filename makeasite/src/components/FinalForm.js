import React, {Component} from 'react'
import api from '../api'
import { Form, Field } from 'react-final-form'

export default class FinalForm extends Component{

constructor(props){
  super(props)
  this.state = {
  }
}
onClear = () =>{
  this.setState({

  })
}
onChange = (event) => {
  this.setState({

  })
}
onSubmit = async values => {
      const payload = values;
      const where = this.props.api;
      const input = {where,payload};
      // the api we should use.. is sent in
      await api.formIn(input).then(res => {
          window.alert(`Form submitted`)
      })
}

render(){
 const my_divs = this.props.data;
 var i=1;
 return(
   <section id={this.props.name}>

  <div stype={{textAlign: "center"}}>
    <h1>{this.props.header}</h1>
    <p>{this.props.text}</p>
    <Form
      onSubmit={this.onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
         {my_divs.map(div =>{
          if(div.Field){
            if(div.Field.option){
              return(
                <div>
                  <label>{div.label}</label>
                  <Field name={div.Field._name}
                    component={div.Field._component}>
                    {div.Field.option.map(aoption =>{
                     return(<option key = {i++} value={aoption._value}>{aoption.__text}</option>)
                    })}
                  </Field>
                </div>
              )
            }
            else if(div.Field.option_multiple){
              return(
                <div>
                  <label>{div.label}</label>
                  <Field name={div.Field._name}
                  component={div.Field._component} multiple>
                  {div.Field.option_multiple.map(aoption =>{
                    return(
                      <option value={aoption._value}>{aoption.__text}</option>
                    )
                  })}
                  </Field>
                  </div>
              )
            }
            else
            return(
            <div >
             <label>{div.label}</label>
             <Field
              name={div.Field._name}
              component={div.Field._component}
              type={div.Field._type}
              placeholder={div.Field._placeholder}
              >
             </Field>
            </div>
           )
          }
          else if(div.button){
            return(
              <div className="buttons">
              {div.button.map(abutton=>{
                  if(abutton._type == 'reset'){
                    return(
                      <div>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                        >
                        {abutton.__text}
                      </button>
                      </div>
                    )

                }
                else{
                return(
                  <div key = {i++}>
                  <button type={abutton._type} disabled={submitting || pristine}>
                    {abutton.__text}
                  </button>
                  </div>
                )
               }
             })}
             </div>
            )
          }
          else if(div.div){
            return(
              <div>
              <label>{div.label}</label>
                <div>
                   {div.div[0].label.map(alabel =>{
                     return(
                    <label>
                      <Field
                        name={alabel.Field._name}
                        component={alabel.Field._component}
                        type={alabel.Field._type}
                        value={alabel.Field._value}>
                      </Field>{' '}{alabel.__text}
                    </label>
                    )
                  })}
                </div>
              </div>
            )
          }
         })}
        </form>
      )}
    />
  </div>
  </section>
)
}
}
