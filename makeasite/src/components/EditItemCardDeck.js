import React from 'react';
import Dropdown from 'react-dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import EditItemText from './EditItemText';
import {  css } from 'aphrodite';
import renderHTML from 'react-render-html';

/* add of edit an item in container.  popup screen allows you to add
specifics about the item (text, links, etc)
*/
class EditItemCardDeck extends React.Component {
//default function EditCardDeck(input){


// this.props contains the original information
  constructor(props) {
       super(props);
       this.state ={ type: 'carddeck',
                      card: this.props.card,
                      data: this.props.data,
                      id: this.props.id
                  };

  //      this.handleChange = this.handleChange.bind(this);
        this.pickCard = this.pickCard.bind(this);
        this.pickCardUpdate = this.pickCardUpdate.bind(this);
  //      this.handleTextChange = this.handleTextChange.bind(this);
        console.log("constructor editItemCardDeck")
    };




    pickCard = (event) => {
      if(event != undefined && event.target != undefined && event.target.value != undefined){
        console.log(event.target.value, typeof this.state.data);
        //var data;
        var num;
        if(event.target.value === 'add'){
          /*
          // don't need the original card information, bUT
          // do need the original data stored away
          data = {
            data: this.state.data
          }
          */
          // 0 if it's the first card in the deck...
          if(typeof this.state.data === 'string')
            num = 0;
          else
            num = this.state.data.length;
        }
        else {
          /*
          data = {
            card: this.state.data[event.target.value],
            data: this.state.data
          }
          */
          num = event.target.value
        }
        this.props.updateWhichCard(num)

        console.log("data ", this.state.data[event.target.value])

        // since I update state in previous,
        // and it should render again based on that,
        // can I update state in this module based on that update?
        /*
        this.setState(prevState => ({
          "type": "card",
          "card": {
            ...prevState.card.data,
            data: this.props.data,
            num: {num}
          },
          "data":data

        }))
        */

      }
    }

    pickCardUpdate = (event) => {
/*
      var type;
      var data;

      if(event != undefined && event.target != undefined && event.target.value != undefined){
        // need to allow for the information needed to manage the type of item selected...
        // header, text, title, img, footer
        if(event.target.value === 'img'){
          type = 'img'
          data= "";
        }
        else {
          // get the input text for the header, text, title, or footer.
          if(this.state.data.body && this.state.data.body.text){
            data = this.state.data.body.text
          }
          else{
            data = "";
          }
        }
      }
      */
      console.log(event.target.value)
      this.props.updateCardDataType(event.target.value)
      /*
        this.setState({"type":'cardtext',
                  "data": data})
      // set this set of data to force it to go back...
*/
    }



  render() {
    console.log( this.state)

    function renderCardDeck(props,state,pickCard){

    //  console.log(state, typeof state.data)
        return(
          <div >
           <label>Pick Card:</label>
           <Field name="cardnum" component="select" onChange={pickCard}
            >
             <option />
             <option value='add'>Add Card</option>
             {(state.carddata && typeof state.carddata == 'object') ? (
                state.carddata.map((card,index) => {
               return <option value={index}>Card {index + 1}</option>
             })):(state.data && typeof state.data == 'object') ?  (
                 state.data.map((card,index) => {
                return <option value={index}>Card {index + 1}</option>
              })):null}

         </Field>
         </div>
       )
    }
    function renderCardPart(props,state,pickCardUpdate,pickCard){

      return(
        <>
        {renderCardDeck(props,state,pickCardUpdate)}
          <div >
            <label>Pick Card Update:</label>
            <Field name="carditem" component="select" onChange={pickCardUpdate}
             >

              <option />
              <option value='header'>Header</option>
              <option value='text'>Body Text</option>
              <option value='title'>Body Title</option>
              <option value='img'>Image</option>
              <option value='footer'>Footer</option>
            </Field>
          </div>
        </>
       )
    }

  //  console.log(this.state.type, )
    if(this.props.getCardDataType() == 'carddeck' && this.props.getWhichCard() === -1){
      return (renderCardDeck(this.props,this.state,this.pickCard));
    }
    else if(this.props.getCardDataType() === 'carddeck' &&  this.props.getWhichCard() != -1){
      return( renderCardPart(this.props,this.state,this.pickCardUpdate, this.pickCard));
    }
    else{
      return(
        <EditItemText styles={this.props.styles} data = {this.props.getText()}
         style = {this.props.style} mutators = {this.props.mutators}
         handleTextChange = {this.props.handleTextChange}
         updateStyle = {this.props.updateStyle}
         />)
    }
  }
}
export default EditItemCardDeck;
