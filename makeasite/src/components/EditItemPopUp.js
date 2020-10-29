import React from 'react';
import Dropdown from 'react-dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import FontPicker from "font-picker-react";
import { SliderPicker } from 'react-color';
import FontSizeChanger from 'react-font-size-changer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import {  css } from 'aphrodite';
import renderHTML from 'react-render-html';

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
                      },
                      cardnum: -1,
                      card: ""
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
        this.onClear = this.onClear.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExit = this.onExit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pickCard = this.pickCard.bind(this);
        this.pickCardUpdate = this.pickCardUpdate.bind(this);
    };


    onClear = () => {
      console.log("clear")

      if(this.props.item){
        this.setState({
          id: this.props.item.id,
          style: this.props.item.style,
          cardnum: -1,
          card: ""
        })
      }
    }

    handleChange(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined)
        this.setState({type: event.target.value});
    }

    pickCard(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        console.log(event.target.value)
        this.setState({cardnum: event.target.value});
        this.setState({card: this.state.data[event.target.value]});
        this.setState({cardData: this.state.data});
        this.setState({data: this.state.data[event.target.value]})
      }

    }
    pickCardUpdate(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        this.setState({cardItem:event.target.value});
        // need to allow for the information needed to manage the type of item selected...
        // header, text, title, img, footer
        if(event.target.value === 'img'){
          this.setState({type: 'img'})

        }else {
          // get the input text for the header, text, title, or footer.
          this.setState({type:'text'})
        }
      }

    }

      onSubmit = async (values) => {
        console.log("On Submit")
          values.style = this.state.style;
          values.type = this.state.type;
          if(this.state.cardnum != -1){
            values.type = 'carddeck';
            var remake = this.state.cardData;
            console.log(remake)
            if(this.state.cardItem === 'img'){
              remake[this.state.cardnum].img = values.data;
              if(remake[this.state.cardnum].body)
                remake[this.state.cardnum].body = null;
            }
            else if(this.state.cardItem === 'header'){
              remake[this.state.cardnum].header = values.data;
            }
            else if(this.state.cardItem === 'footer'){
              remake[this.state.cardnum].footer = values.data;
            }
            else if(this.state.cardItem === 'title'){
              remake[this.state.cardnum].body.title = values.data;
            }
            else //        console.log(JSON.stringify(this.props))

              remake[this.state.cardnum].body.text = values.data;

            values.data = remake;
          }


          this.setState({cardnum : -1, card: "", cardItem : "",cardData: ""});

          if(this.props.editItem != undefined){
            this.props.editItem(values);
          }
          else if(this.props.addItem != undefined){
            this.props.addItem(this.props.articleName,values)
          }

    }

    onDelete = () => {
      console.log("selected to delete")
      this.props.deleteItem(this.state.id);
    }

    onExit = () => {
      // Don't update the data from the original
      console.log("selected to exit");
      this.props.onExit();
    }






  render() {

    function textStyle(props){ return(props.item && props.item.style)?
      props.item.style:(props.styles)?props.styles.textPrimary:
      ({
        fontFamily: "Open Sans",
        color: '#333333',
        fontSize: '12px'
      })}


    function renderCardDeck(props,state,pickCard){

        return(
          <div >
           <label className = {css(textStyle(props))}>Pick Card:</label>
           <Field name="cardnum" component="select" onChange={pickCard}
           className = {css(textStyle(props))} value={state.cardnum}>
             <option />
             {state.cardData ? state.cardData.map((card, index) => {
                return <option value={index}>Card {index + 1}</option>
              }): state.data.map((card,index) => {
                return <option value={index}>Card {index + 1}</option>})
            }
         </Field>
         </div>
       )
    }
    function renderCardPart(props,state,pickCardUpdate){

        return(
          <div >
            <label className = {css(textStyle(props))}>Pick Card Update:</label>
            <Field name="carditem" component="select" onChange={pickCardUpdate}
            className = {css(textStyle(props))} value={state.cardItem}>

              <option />
              <option value='header'>Header</option>
              <option value='text'>Body Text</option>
              <option value='title'>Body Title</option>
              <option value='img'>Image</option>
              <option value='footer'>Footer</option>
            </Field>
          </div>
       )
    }

    var i=1;
    var styleval = {
      'fontFamily': this.state.style.fontFamily,
      'color': this.state.style.color,
      'fontSize': this.state.style.fontSize,
    }
    console.log(this.state)
    var dirty = 1;




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

           initialValues={{ data: this.state.data, type: this.state.type,
             cardnum: this.state.cardnum, card: this.state.card,
              cardItem: this.state.carditem}}

           render={({ handleSubmit, form, submitting, pristine, values  }) => (
             <form onSubmit={handleSubmit} >

            {(this.state.type === 'text' && this.state.cardnum === undefined) &&
             <pre className="apply-font" style={styleval}>{values.data} </pre>
            }
            {(this.state.type === 'html' && values.data && values.data.length)
              && renderHTML(values.data)}

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

               {this.state.type == 'carddeck'  && renderCardDeck(this.props,this.state,this.pickCard)}
               {(this.state.card)  && renderCardPart(this.props,this.state,this.pickCardUpdate)}

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
                 {(this.state.type == 'text' ) && (
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
                          <p className="apply-font">{this.state.header}</p>
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

               <Field
                 style={{display: 'none'}}
                 name="dirtyit"
                 component="input"
                 type="text"
               />

               <div >
                 <button
                  type="submit" disabled={submitting || pristine}
                  style={{fontSize:15}}
                  >
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

export default EditItemPopUp;
