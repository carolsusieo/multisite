import React, {Component} from 'react'
import api from '../api'
import { Form, Field } from 'react-final-form'
import {Button} from 'reactstrap';
import { css } from 'aphrodite';
import BBHome from "../barebones/components/BBHome";
import ContactSpecifics from "./ContactSpecifics";

export default class FinalForm extends Component{

constructor(props){
  super(props)
  this.state = {

  }
  this.deleteArticle = this.deleteArticle.bind(this);
  this.setBackgroundImage = this.setBackgroundImage.bind(this);
  this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  this.getArticleStyle = this.getArticleStyle.bind(this);
};




getArticleStyle = () => {
return this.props.aStyle(this.props.name);
}
forceUpdateHandler = () => {
this.forceUpdate();
}

deleteArticle = ()=> {
//console.log("delete Article " + this.props.name);
this.props.deleteArticle(this.props.name);
};
setBackgroundImage = (name,current)=> {
this.props.setBackgroundImage(name,current);
//console.log("forcing Update")
// props are read only
this.forceUpdateHandler();
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
      var where = this.props.api;
      var input = {where,values};
      // the api we should use.. is sent in
      await api.formIn(input).then(res => {
          window.alert(`Form submitted`)
      })
}
renderPre = (e) => {
  if(this.props.editState === true){
    return(
    <Button
      id="qsDeleteArticle"
      color="primary"
      block
      onClick={() => this.deleteArticle()}
    >
    Delete Section
    </Button>
    );
  }
  else return (<div/>)
}

renderPost = (e) => {
/*
  if(this.props.showItemPopup === true){

      return(<EditItemPopUp styles={this.props.styles}
        text='Add New Item'
        articleName = {this.props.name}
        addItem={this.addItem}
        onExit={this.onExit}
        />);
  }
  else {
    return <div/>;
  }
*/
  if(this.props.editState)
    return(<BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>)
  else {
    return <div/>;
  }
}

render(){
 const my_divs = this.props.data;
 var i=1;
 return(

   <article className={css(this.props.styles.articleContainer)}>
     <a id={this.props.name} name={this.props.name}>
       <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
    </a>
    {this.renderPre()}

    {this.props.editState == true && (
     <Button
       id="qsDeleteArticle"
       color="primary"
       className="btn btn-sm btn-outline-success"
       block
       onClick={() => this.deleteArticle({})}
       >
      Delete Section
     </Button>
    )}

    <div style={this.articleStyle} >
      <p>{this.props.text}</p>
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
   {this.renderPost()}
  </article>
)
}
}
