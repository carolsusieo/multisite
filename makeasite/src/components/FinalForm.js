import React, {Component} from 'react'
import api from '../api'
import { Form, Field } from 'react-final-form'
import {Button} from 'reactstrap';
import { css } from 'aphrodite';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";
import Article from "./Article";

export default class FinalForm extends Article{

constructor(props){
  super(props)


};


onClear = () =>{
  this.setState({

  })
}
onChange = (event) => {
  //console.log("on Change " + event)
  this.setState({

  })
}
onSubmit = async values => {
      var where = this.props.article.api;
      var input = {where,values};
      // the api we should use.. is sent in
      await api.formIn(input).then(res => {
          window.alert(`Form submitted`)
      })
}


render(){
 const my_divs = this.props.article.data;
 var i=1;
 return(

   <article className={css(this.props.styles.articleContainer)}>
     <a id={this.props.article.name} name={this.props.article.name}>
       <h2 className={css(this.props.styles.anchor)}>{this.props.article.header}</h2>
    </a>

      {this.props.editState && (this.renderPre())}

    <div style={this.articleStyle} >
      <p>{this.props.article.text}</p>
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
           {my_divs.map(div =>{
             if(div.Field){
              if(div.Field.option){
                return(
                  <div className="form-group row">
                   <div className="col-2">
                    <label>{div.label}</label>
                   </div>
                   <div className="col-4">
                    <Field name={div.Field._name}
                      component={div.Field._component}
                      onChange={this.onChange}
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
                  <div className="form-group row">
                   <div className="col-2">
                    <label>{div.label}</label>
                   </div>
                   <div className="col-2">
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
                  <div className="form-group row"><div className="col-2">
                    <label>{div.label}</label>
                    </div>
                    <div className="col-4">
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
                <div className="row justify-content-start"><div className='col-2'/>
                  {div.button.map(abutton=>{
                   if(abutton._type == 'reset'){
                    return(
                      <button key={i++} className='col-2'
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
                      <button key={i++} className='col-2' type={abutton._type} disabled={submitting || pristine}>
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
                <div className="form-group row">
                 <div className="col-2">
                  <label>{div.label}</label>
                 </div>
                 <div className='col-2'>
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
   {this.props.editState && (this.renderPost())}
  </article>
)
}
}
