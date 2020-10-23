import React from 'react';
import Dropdown from 'react-dropdown';
//import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import FontPicker from "font-picker-react";
import { SliderPicker } from 'react-color';
import FontSizeChanger from 'react-font-size-changer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, css } from 'aphrodite';

/* add of edit an item in container.  popup screen allows you to add
specifics about the item (text, links, etc)
*/
class EditItemPopUp extends React.Component {
  constructor(props) {
        super(props);
      this.state ={ type: '',
                      id: '',
                      style: {
                        fontFamily: "Open Sans",
                        color: '#333333',
                        fontSize: '12px'
                      }
                  };


//        console.log(JSON.stringify(this.props))
        if(this.props.item != undefined){
          this.state.data = this.props.item.data;
          this.state.type = this.props.item.type;
          this.state.id = this.props.item.id;
          }
        else{
          this.state.type = 'text';
        }
        if(this.props.item != undefined){
          if(this.props.item.style != undefined){
            this.state.style = this.props.item.style;
          }
        }

        this.onSubmit = this.onSubmit.bind(this);
      //  this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExit = this.onExit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pickCard = this.pickCard.bind(this);
        this.pickCardUpdate = this.pickCardUpdate.bind(this);
    //    this.onEditItem = this.onEditItem.bind(this);
    };


    onClear = () => {
      console.log("clear")
      this.setState({
        type:'text',
        loginDisplay: true,
        selectMenu: false,
        getText: false,
        header: "",
        url: "",
        menutitle: "",
        html:""
      })
    }

    handleChange(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined)
        this.setState({type: event.target.value});
    }

    pickCard(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        this.setState({cardnum: parseInt(event.target.value)});
        this.setState({card: this.state.data[parseInt(event.target.value)]});
      }

    }
    pickCardUpdate(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        this.setState({cardItem:event.target.value});
      }

    }

      onSubmit = async (values) => {
          values.style = this.state.style;
          values.type = this.state.type;
          if(this.state.type == 'carddeck'){
          }
          if(this.props.editItem != undefined){
            this.props.editItem(values);
          }
          else if(this.props.addItem != undefined){
                values.type = this.state.type;
              this.props.addItem(this.props.articleName,values)
            }
    }

    onDelete = () => {
      console.log("selected to delete")
      this.props.deleteItem();
    }

    onExit = () => {
      // Don't update the data from the original
      console.log("selected to exit");
      this.props.onExit();
    }


  render() {

    var i=1;
    var font = this.state.style.fontFamily;
    var styleval = {
      'fontFamily': this.state.style.fontFamily,
      'color': this.state.style.color,
      'fontSize': this.state.style.fontSize,
    }
    console.log(this.state.style)
    var dirty = 1;

// can't dirty on changing text
    return (
     <div className={css(this.props.styles.popup)}>
      <div className={css(this.props.styles.popupInner)}>

       <Form
          mutators=
          {{
           makeDirty: (args, state, utils) => {
             utils.changeValue(state, 'dirtyit', () => this.state.data + dirty++)
           }
          }}
           onSubmit={this.onSubmit}
           initialValues={{ data: this.state.data, type: this.state.type}}

           render={({ handleSubmit, form, submitting, pristine, values  }) => (
             <form onSubmit={handleSubmit} >

             <pre className="apply-font" style={styleval}>{values.data} </pre>

               <div >
                 <label className = {css(this.props.styles.text)}>Enter type:</label>
                 <Field className = {css(this.props.styles.text)} name="type"
                    component="select" onChange={this.handleChange}>
                   <option />
                   <option value="text">Text</option>
                   <option value="html">Html</option>
                   <option value="image">Image</option>
                   <option value="video">Video</option>
                   <option value="card">Card</option>
                   <option value="carddeck">CardDeck</option>
                 </Field>
               </div>

               {(this.state.type == 'carddeck' ) && (

                 <div >
                   <label className = {css(this.props.styles.text)}>Pick Card:</label>
                   <Field name="type" component="select" onChange={this.pickCard}
                   className = {css(this.props.styles.text)}>
                     <option />
                     {(this.state.data[0]) && (
                     <option value='0'>Card 1</option>
                     )}
                     {(this.state.data[1]) && (
                     <option value='1'>Card 2</option>
                     )}
                     {(this.state.data[2]) && (
                     <option value='2'>Card 3</option>
                     )}
                   </Field>
                 </div>
               )}
               {(this.state.card)  && (
                 <div >
                   <label className = {css(this.props.styles.text)}>Pick Card Update:</label>
                   <Field name="type" component="select" onChange={this.pickCardUpdate}
                   className = {css(this.props.styles.text)}>
                     <option />
                     <option value='header'>Header</option>
                     <option value='text'>Body Text</option>
                     <option value='title'>Body Title</option>
                     <option value='img'>Image</option>
                     <option value='footer'>Footer</option>
                   </Field>
                 </div>
               )}

               {(this.state.type == 'text' || this.state.type == 'html') && (
                 <div>
                 <div id="thisone">
                  <label className = {css(this.props.styles.text)}>Enter Data:</label>
                  <Field className = {css(this.props.styles.text)}
                   name="data"
                   component="input"
                   type="text"
                   value={this.state.data}
                   onBlur={(e)=>{
                     this.setState({data:e.target.value})
                     form.mutators.makeDirty();

                   }}
                    />
                 </div>
                 <div id="thistwo">
                 {(this.state.type == 'text') && (
                   <>
                      <SliderPicker color={this.state.style.color}
                        onChange={(color) =>
                        {

                          this.setState(prevState =>  ({
                            style:{
                              ...prevState.style,
                              color: color.hex
                            }
                          }));

                          form.mutators.makeDirty();
                        }
                      }
                      />
                     <FontPicker
                       apiKey="AIzaSyCwxw1i_MlbMd-9xg_bcCo8UJXyZ89fYHU"
                       activeFontFamily={this.state.activeFontFamily}
                       onChange={(nextFont) =>
                         {
                           this.setState(prevState =>  ({
                             style:{
                               ...prevState.style,
                               fontFamily: nextFont.family
                             }
                           }));
                         form.mutators.makeDirty();
                         }
                       }
                      />
                      <FontSizeChanger
                        onChange={(element, newValue, oldValue) =>
                           {
                             this.setState(prevState =>  ({
                               style:{
                                 ...prevState.style,
                                 fontSize: newValue
                               }
                             }));
                             form.mutators.makeDirty();
                           }}
                           targets={['#target-two .apply-font']}
                          options={{
                                       stepSize: 2,
                                       range: 20
                          }}
                          customButtons={{
                          up: <FontAwesomeIcon icon={faPlus}/>,
                          down: <FontAwesomeIcon icon={faMinus} />,
                          style: {
                            backgroundColor: 'red',
                            color: 'white',
                            WebkitBoxSizing: 'border-box',
                            WebkitBorderRadius: '5px',
                            width: '60px'
                          },
                          buttonsMargin: 10
                        }}
                        />
                        <div id="target-two" test="needed for font-size-changer"
                          style={{display: 'none'}}>
                          <p className="apply-font">{this.state.data}</p>
                        </div>

                        </>
                 )}
                 </div>
                 </div>
               )}
               {(this.state.type == 'video' || this.state.type == 'img' ) && (
                   <div>
                   <div id="thislink">
                   <label >Enter Link:</label>
                   <Field
                     className = {css(this.props.styles.text)}
                     name="data"
                     component="input"
                     type="text"
                     className="link"
                     value={this.state.data}
                   />

                   </div>
                   </div>
               )}

               <Field className = {css(this.props.styles.text)}
                 style={{display: 'none'}}
                 name="dirtyit"
                 component="input"
                 type="text"
               />



               <div >
                 <button
                 style={{fontSize:15}}
                  type="submit" disabled={submitting || pristine}>
                   Submit
                 </button>

                 <button
                 style={{fontSize:15}}
                   type="button"
                   onClick={form.reset}
                   disabled={submitting || pristine}
                 >
                   Reset
                 </button>

                 {this.props.deleteItem != undefined && (
                 <button
                 style={{fontSize:15}}
                 type="button"
                   onClick={this.onDelete}
                   disabled={submitting}
                 >
                   Delete
                 </button>
                 )}

                 <button
                   type="button"
                   style={{fontSize:15}}
                     onClick={this.onExit}
                   disabled={submitting}
                 >
                   Exit
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
/*
targets={['#target .content']}

<div id="target-two">
  <p className="title">This is the title of my target text</p>
  <p className="content">This is the content of my target text</p>
</div>
*/

export default EditItemPopUp;
