import React from 'react';
import Dropdown from 'react-dropdown';
//import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

class AddArticlePopUp extends React.Component {
  constructor(props) {
        super(props);
        this.state ={ type: 'info',
                      menutitle: '',
                      loginDisplay: false,
                      selectMenu: true,
                      getText: false,
                      header: '',
                      url: '',
                      html: '',
                      data: []
                    };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.addLabel = this.addLabel.bind(this);
    };
    onClear = () =>{
  //    console.log("clear")
      this.setState({
        type:'info',
        loginDisplay: true,
        selectMenu: false,
        getText: false,
        header: "",
        url: "",
        menutitle: "",
        html:""
      })
    }


    onChange = (which,value,previous) => {
      //console.log("change "+ which + " " + value + " " + previous)
      if(which == 'type'){
        if(value == 'info'){

        }
        else if(value == 'subcolumns'){
        }
        else if(value == 'video'){
          // get the url on the internet for this  - allow it to be
          // pasted in
        }
        else if(value == 'circles'){

        }
        else if(value == 'final-form'){

        }
        else if(value == 'dbdata'){

        }
        else{

        }
      }
      else if(which === 'loginDisplay'){
          this.setState({selectLogout: value});
      }
      else if(which === 'selectMenu'){
         this.setState({selectMenu: value});
         if(value === true)
          this.setState({menutitle: this.state.header});
         else
          this.setState({menutitle: ''});
       }
       else if(which === 'cvalue'){

        // console.log(value + " " + previous);
         var newValue = {
           "label": previous,
           "value": value
         }
         var newData = [
             ...this.state.data,
             newValue
         ];
         this.setState({data: newData});


       }
    }

    addLabel = async (values) => {

      //console.log(values);
      const newValue = {
        "label": values.clabel,
        "value": values.cvalue
      }
      const newData = [
          ...this.state.data,
          newValue
      ];
      this.setState({data: newData});
    }

    onSubmit = async values => {
        //  console.log("submit " + values.header + " " + values.type + " " + values.url + " " + this.state.menutitle);
          if(this.state.menutitle === true)
            values.menutitle = this.state.header;

          if(values.type === 'circles'){
            values.data = this.state.data
          }
          //  console.log(values);
          this.props.addArticle(values);
    }

  render() {
    var i=1;



/*
popup: {
width: '65%',
height: '25%',
top: '15%',
left: 0,
right: 0,
bottom: 0,
margin: 'auto',
backgroundColor: 'white',
position:"relative",
zIndex:'3000',
},
popupInner: {
left: '25%',
right: '25%',
top: '5%',
bottom: '5%',
margin: 'auto',
borderRadius: '20px',
backgroundColor: 'white',
position:"relative",
zIndex:'4000',
},
popupTitle:{
fontSize:"14px",
color:"black"
},
popupText:{
fontSize:"12px",
color:"black"
}

*/
return (
<div className='popup'>
<div className='popup\_inner'>
<div className="form-group row">
   <div className="col-1"/>
   <h1>{this.props.text}</h1>
 </div>
  <Form
    onSubmit={this.onSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>

      <div className="form-group row">
      <div className="col-1"/>
       <div className="col-4">
        <label>Section Title</label>
       </div>
       <div className="col-4">
        <Field
         name='header'
         component='input'
         type='text'
         placeholder='Section Title'
        ></Field>
       </div>
      </div>

      <div className="form-group row">
      <div className="col-1"/>
       <div className="col-4">
          <label>Section Type</label>
       </div>
       <div className="col-4">
        <Field  name='type'
          component='select'
            >
          <option key = {i++} value='info'>Info</option>
          <option key = {i++} value='subcolumns'>Subcolumns</option>
          <option key = {i++} value='video'>Video</option>
          <option key = {i++} value='circles'>Circles</option>
          <option key = {i++} value='final-form'>Form</option>
          <option key = {i++} value='dbdata'>Data Display</option>
          <option key = {i++} value='other'>Other</option>
         </Field>
         <OnChange name="type">
           {(value, previous) => {this.onChange("type", value,previous)}}
         </OnChange>
        </div>
      </div>

      <div className="form-group row">
      <div className="col-1"/>
     <div className="col-4">
          <label>Display when Logged in only</label>
       </div>
       <div className="col-4">
        <Field  name='loginDisplay'
          component='input'
          type='checkbox'
          format={v => v}
          parse={v => (v)}>
        </Field>
        <OnChange name="loginDisplay">
          {(value, previous) => {this.onChange("loginDisplay", value,previous)}}
        </OnChange>
       </div>
      </div>
      <div className="form-group row">
      <div className="col-1"/>
       <div className="col-4">
          <label>Display On Menu</label>
       </div>

       <div className="col-4">
        <Field  name='selectMenu'
        component='input'
        type='checkbox'
        format={v => v}
        parse={v => (v)}>
        </Field>
        <OnChange name="selectMenu">
          {(value, previous) => {this.onChange("selectMenu", value,previous)}}
        </OnChange>
       </div>
      </div>

      {(values.type === 'video') &&(

      <div className="form-group row">
      <div className="col-1"/>
       <div className="col-4">
        <label>URL:</label>
       </div>
       <div className="col-4">
        <Field
         name='url'
         component='input'
         type='text'
         placeholder='url'
        ></Field>
       </div>
      </div>

    )}
    {(values.type === 'circles') &&
     <div>
      <div className="form-group row">
        <div className="col-1"/>
        <div className="col-2">
         <label>Circle Label:</label>
        </div>
        <div className="col-2">
         <Field
          name='clabel'
          component='input'
          type='text'
          placeholder='circle label'
          ></Field>
        </div>

        <div className="col-1">
         <label>Circle Value</label>
        </div>
        <div className="col-1">
         <Field  name='cvalue'
          component='select'
          >
          <option key = {i++} value='1'>1</option>
          <option key = {i++} value='2'>2</option>
          <option key = {i++} value='3'>3</option>
          <option key = {i++} value='4'>4</option>
          <option key = {i++} value='5'>5</option>
          <option key = {i++} value='6'>6</option>
          <option key = {i++} value='7'>7</option>
          <option key = {i++} value='8'>8</option>
          <option key = {i++} value='9'>9</option>
          <option key = {i++} value='10'>10</option>
          </Field>
          <OnChange name="cvalue">
           {(value, previous) => {this.onChange("cvalue", value,values.clabel)}}
          </OnChange>
        </div>

      </div>
      <pre>{JSON.stringify(this.state.circles, 0, 2)}</pre>
     </div>
    }

      <div className="row justify-content-start">
      <div className="col-1"/>
          <button className='col-2'
                    type="reset"
                  onClick={this.onClear}
                    disabled={submitting || pristine}
                    >
                    Reset
            </button>
            <button className='col-2'
                  type="submit" disabled={submitting || pristine}>
                 Submit
            </button>
      </div>
    </form>
  )}
    />
</div>
</div>

);
}
}

export default AddArticlePopUp;
/*







<p> <span> Select type item: </span>
<span><Dropdown value={this.state.selectValue}
options={options} onChange={this.handleSelect} value={defaultOption} placeholder="Select an option" />;
</span> </p>


<h4>You selected {this.state.selectValue}</h4>



<button onClick={this.props.closePopUp}>Add It</button>
</div>
</div>
*/
