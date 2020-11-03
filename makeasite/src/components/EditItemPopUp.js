import React from 'react';
import Dropdown from 'react-dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import EditItemText from './EditItemText';
import EditItemCardDeck from './EditItemCardDeck';
import {  css } from 'aphrodite';
import renderHTML from 'react-render-html';

/* add of edit an item in container.  popup screen allows you to add
specifics about the item (text, links, etc)
*/
class EditItemPopUp extends React.Component {
  constructor(props) {
        super(props);
      this.state ={ type: '',
                      style: {
                        fontFamily: "Open Sans",
                        color: '#333333',
                        fontSize: '12px'
                      },
                      cardnum : -1,
                      carddata : "",
                      cardtype :"carddeck",
                      data: "",
                      id: ''
                  };


//        console.log(JSON.stringify(this.props))
        if(this.props.item != undefined){
          this.state.data = this.props.item.data;
          this.state.type = this.props.item.type;
          this.state.id = this.props.item.id;
          if(this.props.item.style != undefined){
            this.state.style = this.props.item.style;
          }
        }
        else{
  //        console.log("item was undefined")
          this.state.type = 'text';
          this.state.id = Date.now();
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onExit = this.onExit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateWhichCard = this.updateWhichCard.bind(this);
        this.getWhichCard = this.getWhichCard.bind(this);

  //      this.pickCard = this.pickCard.bind(this);
  //      this.pickCardUpdate = this.pickCardUpdate.bind(this);
    };



    onClear = () => {
    //  console.log("clear")

      if(this.props.item){
        this.setState({
          id: this.props.item.id,
          style: this.props.item.style,
            cardnum: -1,
            carddata: "",
            cardtype: "carddeck"

        })
      }
    }

    handleChange(event) {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        this.setState({type: event.target.value});
        // if a carddeck has been added, and there isn't currently information
        // about carddecks in the article, we need to remedy that problem.
      }
    }


// values available at remake:
// this props - original data passed in
// values: - from the form...
// data - edit string...  - this needs to be reformatted
//

// needs to look like:
/*
{
  "type", "id", - NO CHANGE - IF THEY WANT TO CHANGE THIS, WILL NEED TO delete
   and DELETE IS A TODO

  "data": remap TO FOLLOWING- from STRING IN VALUES - COULD ALSO BE A CHANGE IN TYPE
  - WILL NEED TO KNOW THE VALUE CHOSEN FOR TYPE

   [{
      "name": "card1",
      "img": "images/webpic_sml/sample-image.jpg"
    },
    {
      "name": "card2",
      "body": {
        "text": "This is text about the image"
      }
    },
    {
      "name": "card3",
      "classlist": "text-center",
      "header": "Contact Details",
      "body": {
        "contact": "Contact"
      }
    }
  ]
},
*/

      remakeForCard = (values) =>
      {
          var cardnum;
          var addCard = false;
          var carddata = this.state.carddata;

        // console.log(this.state.carddata, values);

        //  console.log(this.state.card)

         cardnum = this.state.cardnum;
         if(cardnum === this.state.data.length
           || typeof this.state.data === 'string'){
           addCard = true;
           if(typeof this.state.data === 'string' && this.state.carddata === ""){
             carddata = this.state.data;
           }


           if(cardnum == -1){
             cardnum = 0
           }
         }

        console.log(this.state.data,this.state.carddata)


        //  console.log(cardnum)
          var remake;
          if(!this.state.data || typeof this.state.data === 'string'){
            remake = [{}];
          }
          else{
            remake = this.state.data;
          }
          // might be a new article too, or something that was not previously
          // a carddeck
          if(addCard && cardnum > 0){
            remake.push({img:"",body:{},header:"",footer:""});
          }
          else if(addCard){
            remake[0] = {img:"",body:{},header:"",footer:""};
          }

      //    console.log(remake)
          if(this.state.cardtype === 'img'){
            remake[cardnum].img = carddata;
            if(remake[cardnum].body){
              remake[cardnum].body = undefined;
            }
          }

          if(this.state.cardtype === 'header'){
            remake[cardnum].header = carddata;
            if(remake[cardnum].body){
              remake[cardnum].body = undefined;
            }
        }
          else if(this.state.cardtype === 'footer'){
            remake[cardnum].footer = carddata;
            if(remake[cardnum].body){
              remake[cardnum].body = undefined;
            }
          }
          else if(this.state.cardtype === 'title'){
            if(!remake[cardnum].body){
              remake[cardnum].body = {title: "", text: ""}
            }
            remake[cardnum].body.title = carddata;
          }
          else {//        console.log(JSON.stringify(this.props))
            if(!remake[cardnum].body){
              remake[cardnum].body = {title: "", text: ""}
            }
            remake[cardnum].body.text = carddata
          }
          console.log(remake)
          values.data = remake;

          return values;

      }


    onSubmit = async (values) => {
          values.style = this.state.style;
          values.type = this.state.type;
          if(this.state.cardnum != -1){
              values = this.remakeForCard(values);
          }
          this.props.editItem(this.state.id,values);
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

    updateWhichCard = (value) => {
      this.setState({cardnum:value})
    }
    getWhichCard = () => {
          return this.state.cardnum;
    }
    updateCardDataType = (value) => {
      this.setState({cardtype:value})
    }
    getCardDataType = () => {
        return this.state.cardtype;
    }

// need to look at this closely in regards to carddeck
    updateStyle= (which,value) => {
      if(which == 'color'){
        this.setState(prevState =>({style:{...prevState.style,color:value}}))
      }
      else if(which == 'fontFamily'){
        this.setState(prevState =>({style:{...prevState.style,fontFamily:value}}));
      }
      else if(which == 'fontSize'){
        this.setState(prevState=>({style:{...prevState.style,fontSize:value}}));
      }
    }

    handleTextChange = (event) => {


      console.log("value ",event.target.value)
      console.log("more ",event.nativeEvent)

// probably shouldn't use nested state in react according to some....
      if(event && event.target && event.target.value != null && this.state.type === 'carddeck'){
            this.setState({carddata: event.target.value})
       }
       else if(event && event.target && event.target.value != null){
           this.setState({data: event.target.value})
       }
   }
   // only card by carddeck stuff
   getText = () =>
   {
     return this.state.carddata;

   }
  render() {
  //  console.log(this.state.card)

    function textStyle(props){ return(props.item && props.item.style)?
      props.item.style:(props.styles)?props.styles.textPrimary:
      ({
        fontFamily: "Open Sans",
        color: '#333333',
        fontSize: '12px'
      })}


    var i=1;
    var styleval = {
      'fontFamily': this.state.style.fontFamily,
      'color': this.state.style.color,
      'fontSize': this.state.style.fontSize,
    }
  //  console.log(this.state)
    var dirty = 1;

    var initialValues = {};
    if(typeof this.state.data != 'object' && typeof this.state.data != 'array')
      initialValues = { html: this.state.data, type: this.state.type, data: this.state.data}
    else {
      // cannot know which will get selected so can't update this.
      initialValues = { html: this.state.data, type: this.state.type}
    }
    // popup styles are part of this app, not configurable
    // by other apps.
    return (

       <Form
          mutators=
          {{
           makeDirty: (args, state, utils) => {
             utils.changeValue(state, 'dirtyit', () => this.state.data + dirty++)
           }
          }}
           onSubmit={this.onSubmit}

           initialValues={initialValues}

           render={({ handleSubmit, form, submitting, pristine, values  }) => (
             <form onSubmit={handleSubmit}
               className="block-example border border-primary popup">

              {(this.state.type === 'html' && values.html && values.html.length)
              && renderHTML(values.html)}

               <div >
                 <label className = {css(this.props.styles.text)}>Enter type:</label>
                 <Field className = {css(this.props.styles.text)} name="type"
                    component="select" onChange={this.handleChange}>
                   <option />
                   <option value="text">Text</option>
                   <option value="html">Html</option>
                   <option value="image">Image</option>
                   <option value="video">Video</option>
                   <option value="carddeck">CardDeck</option>
                   <option value="button">Button</option>
                 </Field>
               </div>

               {(this.state.type == 'carddeck') &&
               <EditItemCardDeck
                  updateCardDataType = {this.updateCardDataType}
                  getCardDataType = {this.getCardDataType}
                  updateWhichCard = {this.updateWhichCard}
                  getWhichCard = {this.getWhichCard}
                  data = {this.state.data}
                  id = {this.state.id}
                  styles={this.props.styles}
                  style = {this.state.style}
                  mutators = {form.mutators}
                  updateStyle = {this.updateStyle}
                  handleTextChange = {this.handleTextChange}
                  getText = {this.getText}
                    />
                }

               {this.state.type == 'text' && (
                 <EditItemText styles={this.props.styles} data = {values.html}
                  style = {this.state.style} mutators = {form.mutators}
                  handleTextChange = {this.handleTextChange}
                  updateStyle = {this.updateStyle}
                  header = {this.state.header}
                  card = {values.card}/>
                )}
               {this.state.type === 'html' && (
                 <div id="thisone">
                  <label className = {css(this.props.styles.text)}>Enter Data:</label>
                  <Field className = {css(this.props.styles.text)}
                   name="data"
                   component="input"
                   type="text"
                   value={this.state.data}
                    />
                 </div>
               )}
                 {(this.state.type == 'video' || this.state.type == 'image' ) && (
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
               {(this.state.type == 'button'  ) && (
                   <div>
                   <div id="thislink">
                   <label >TODO NEED TO ALLOW SELECTION OF WHAT bUTTON does</label>
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
    );
  }
}
export default EditItemPopUp;
