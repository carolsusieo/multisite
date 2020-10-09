import React from 'react';
import Dropdown from 'react-dropdown';
import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

class AddItemPopUp extends React.Component {
  constructor(props) {
        super(props);
        this.state ={ type: 'text',
                        data: ''
                    };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
    };
    onClear = () =>{
      console.log("clear")
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
      console.log("change "+ which + " " + value + " " + previous)
      if(which == 'type'){
        if(value == 'text'){
        }
        else if(value == 'button'){
          // get the url on the internet for this  - allow it to be
          // pasted in
        }
        else if(value == 'html'){

        }
        else if(value == 'image'){

        }
      }
    }

    onSubmit = async (values) => {
          console.log(JSON.stringify(values) + " " + this.props.currentSection)
          this.props.addItem(this.props.currentSection,values);
    }

  render() {
    var i=1;


return (
<div className='popup'>
<div className='popup\_inner'>
<div class="form-group row">
   <div class="col-1"/>
   <h1>{this.props.text}</h1>
 </div>
  <Form
    onSubmit={this.onSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>


      <div class="form-group row">
      <div class="col-1"/>
       <div class="col-4">
          <label>Item Type</label>
       </div>
       <div class="col-4">
        <Field  name='type'
          component='select'
          inputOnChange={this.onChange}
          >
          <option key = {i++} value='text'>text</option>
          <option key = {i++} value='html'>html</option>
          <option key = {i++} value='image'>image</option>
          <option key = {i++} value='button'>button</option>
         </Field>
         <OnChange name="type">
           {(value, previous) => {this.onChange("type", value,previous)}}
         </OnChange>
        </div>
      </div>


      {(values.type === 'text') &&(

      <div class="form-group row">
      <div class="col-1"/>
       <div class="col-4">
        <label>Text Value :</label>
       </div>
       <div class="col-4">
        <Field
         name='data'
         component='input'
         type='text'
         placeholder='text to display'
        ></Field>
       </div>
      </div>

    )}
    {(values.type ==='html') &&
      <div class="form-group row">
        <div class="col-1"/>
        <div class="col-2">
         <label>Html:</label>
        </div>
        <div class="col-2">
         <Field
          name='data'
          component='input'
          type='text'
          placeholder='html'
          ></Field>
        </div>

      </div>
    }

      <div class="row justify-content-start">
      <div class="col-1"/>
          <button class='col-2'
                    type="reset"
                  onClick={this.onClear}
                    disabled={submitting || pristine}
                    >
                    Reset
            </button>
            <button class='col-2'
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

export default AddItemPopUp;
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
