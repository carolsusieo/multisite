import React from 'react';
import Dropdown from 'react-dropdown';
import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

class EditItemPopUp extends React.Component {
  constructor(props) {
        super(props);
      this.state ={ type: '',
                      data: ''
                    };


        this.setState({data: this.props.item.data, type: this.props.item.Type});

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExit = this.onExit.bind(this);
    //    this.onEditItem = this.onEditItem.bind(this);
    };


    onClear = () => {
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
        this.setState({type: value})
      }
    }

    onSubmit = async (values) => {
          console.log(JSON.stringify(values) + " " + this.props.currentSection)
          this.props.editItem(values);
    }

    onDelete = () => {
      console.log("selected to delete")
      this.props.deleteItem();
    }

    onExit = () => {
      console.log("selected to exit")
    }

  render() {
    var i=1;
    return (
     <div className='popup'>
      <div className='popup\_inner'>
       <div class="col-1"/>
        <h1>{this.props.item.text}</h1>
       </div>
       <div class="form-group row"><Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
         <div>
          <h2> {this.props.text}</h2>
          <div class="form-group row">
           <div class="col-1"/>
           <div class="col-4">
              <label>Item Type</label>
           </div>
           <div class="col-4">
            <Field  name='type'
              component='select'
              value={this.state.type}
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

          {(this.state.type === 'text' || values.type === 'text') &&(

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
             placeholder={this.props.item.data}
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
              placeholder={this.props.item.data}
              ></Field>
            </div>
          </div>
        }

          <div class="row justify-content-start">
           <div class="col-1"/>
               <button class='col-2'
                  type="submit"
                  onClick={this.onExit}
                  >
                 Exit
               </button>

               <button class='col-2'
                    type="submit"
                    onClick={this.onDelete}
                    disabled={submitting || pristine}
                    >
                 Delete
               </button>

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
          </div>
        </form>
        )}/></div>
       </div>

    );
  }
}

export default EditItemPopUp;
