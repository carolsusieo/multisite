import React, {Component} from 'react'
import api from '../api'
import { Form, Field } from 'react-final-form'
import {Button} from 'reactstrap';

export default class FinalForm extends Component{

constructor(props){
  super(props)
  this.state = {

  }
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

onClear = () =>{
  this.setState({

  })
}
onChange = (event) => {
  console.log("on Change " + event)
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
   <section class='jumptarget'  id={this.props.name}>
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

  <div style={this.sectionStyle} >
    <p>{this.props.text}</p>
    <Form
      onSubmit={this.onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
         {my_divs.map(div =>{
          if(div.Field){
            if(div.Field.option){
              return(
                <div class="form-group row">
                 <div class="col-2">
                    <label>{div.label}</label>
                 </div>
                 <div class="col-4">
                  <Field  name={div.Field._name}
                    component={div.Field._component}
                    inputOnChange={this.onChange}
                    >
                    {div.Field.option.map(aoption =>{
                     return(<option key = {i++} value={aoption._value}>{aoption.__text}</option>)
                    })}
                  </Field>
                 </div>
                </div>
              )
            }
            else if(div.Field.option_multiple){
              return(
                <div class="form-group row">
                 <div class="col-2">
                  <label>{div.label}</label>
                 </div>
                 <div class="col-2">
                  <Field name={div.Field._name}
                  component={div.Field._component} multiple
                  inputOnChange={this.onChange}
                  >
                  {div.Field.option_multiple.map(aoption =>{
                    return(
                      <option value={aoption._value}>{aoption.__text}</option>
                    )
                  })}
                  </Field>
                 </div>
                </div>
              )
            }
            else
            return(
              <div class="form-group row">
               <div class="col-2">
             <label>{div.label}</label>
             </div>
             <div class="col-4">
             <Field
              name={div.Field._name}
              component={div.Field._component}
              type={div.Field._type}
              placeholder={div.Field._placeholder}
              >
             </Field>
             </div>
            </div>
           )
          }
          else if(div.button){
            return(


              <div class="row justify-content-start">
              <div class='col-2'/>

              {div.button.map(abutton=>{
                  if(abutton._type == 'reset'){
                    return(

                      <button class='col-2'
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                        >
                        {abutton.__text}
                      </button>

                    )

                }
                else{
                return(
                  <button class='col-2' type={abutton._type} disabled={submitting || pristine}>
                    {abutton.__text}
                  </button>
                )
               }
             })}
             </div>
            )
          }
          else if(div.div){
            return(
              <div class="form-group row">
               <div class="col-2">
                <label>{div.label}</label>
               </div>
               <div class='col-2'>
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
