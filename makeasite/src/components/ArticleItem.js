import React from 'react';
import Dropdown from 'react-dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {Button} from 'reactstrap';
import ReactPlayer from "react-player";
import ContactSpecifics from "./ContactSpecifics";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import EditItemPopUp from "./EditItemPopUp";
import renderHTML from 'react-render-html';
import Draggable from 'react-draggable';
import styles from '../res/header.module.css';
import 'font-awesome/css/font-awesome.min.css';

// wrapper to allow items to be edited or deleted

export default class ArticleItem extends React.Component {
  constructor(props) {
        super(props);
        // 2 reasons for popup - add it, or edit it
        this.state ={ popup: false, position: props.item.position };
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.itemButton = this.itemButton.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);


    };


    // decision to add item was selected from withing the Article component -
    // and this indicated the popup should display.


  onExit = () => {
    this.setState({popup: false})
    this.props.onExit();
  }

  editItem = (id,values) => {

    console.log( this.props.item.id)
    var id = this.props.item.id;
    values.id = id;
//    values.type = this.props.item.type;
    this.props.editItem(id,values);
    this.setState({popup: false})
  };

  deleteItem = () => {
    //console.log("deleting" + this.props.item.id)
    this.setState({popup: false})
    this.props.deleteItem(this.props.item.id)
  };

  selectItem = (e) => {
    // need to know if another item has been selected already and is
    // displaying a popup, because we don't want to let more than one

    if(this.state.popup == false && this.props.manageItemPopup(true)){
        this.setState({popup: true});
    }
  };

  itemButton = (e) => {
    if(this.props.editState === true)
      this.selectItem(e);
    else{
      //console.log("button pressed")
    }
  }

  renderPlus = (data) => {
    var new1;
      if(this.state.popup === true) {
        new1 = "Edit or Delete ";
      }
      else if(this.props.showItemPopup === true){
        new1 = "Add ";
      }

      if(new1 != undefined){

        if(this.props.item.type != 'carddeck'){
          new1 = new1 + data;
        }


        return(
          <EditItemPopUp styles={this.props.styles}
          text={new1}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          onExit={this.onExit}
          item={this.props.item}/>
        )
      }
      else return(<p/>);
  }


  onDrop(e) {
    // your code
  //  console.log("drop " + JSON.stringify(e) + " " + JSON.stringify(this.state))
  }

  onDrag(e) {
    if(this.props.editState === true){
      this.setState({dragging: true})

      this.setState({
          position:{
              x: `${e.pageX-this.state.offsetX}px`,
              y: `${e.pageY-this.state.offsetY}px`
          }
      })
    }
  }

  onStop = (e:MouseEvent) => {
    if(this.props.editState === true){
      const {dragging} = this.state
      this.setState({dragging: false})
      if (dragging) {
        this.setState({
            position:{
                x: e.clientX,
                y: e.clientY
            }
        })
        this.onDrop(e)
      }
    }
    else{
      this.itemButton(e);
    }
  }


 getStyleVal = (item) =>{
   return(
     (item.type != 'include' && item.type != 'html' && item.style == undefined)?
     {
     'fontFamily': 'Open Sans',
     'color': 0x0000,
     'fontSize': "15px",
     }
     :item.style);

 }


  render() {
    var item = this.props.item;
    var i=1;
    var styleval = this.getStyleVal(item);

    var id =item.id;
    if(item.id == undefined){
      id = Date.now();
    }

      if(item.type == 'text'){
        console.log("item ", item.id)
          if(styleval != undefined && styleval != null){
            return(
                <div>
                        {(this.state.popup == false) && (
                          <p style={styleval} onClick={this.selectItem} > {item.data} </p>
                        )}
                        {this.renderPlus(item.data)}
                </div>
            )
          }
          else{
            return(
                  <div className={styles.Header}>
                        {(this.state.popup == false) && (
                          <p style={styleval} onClick={this.selectItem} > {item.data} </p>
                        )}
                        {this.renderPlus(item.data)}
                  </div>
              )
          }
        }
        else if(item.type == 'html'){
          return(
                <div onClick={this.selectItem}>
                  {(this.state.popup == false && item.data && item.data.length) && (
                    renderHTML(item.data)
                )}
                {this.renderPlus(item.data)}
                </div>
            )
        }
        else if(item.type == 'carddeck'){
          return(
            <div >
              {(this.state.popup == false) && (
                <CardDeck
                onClick={this.selectItem}
                className={item.className}
                >
                {item.data.map(card =>(

                <Card  key={i++} style={{ width: '18rem' }}>
                  {(card.header) && (
                  <Card.Header as="h3">{card.header}</Card.Header>
                  )}
                  {card.img && (
                    <Card.Img src={card.img}/>
                  )}
                  {card.body && (
                  <Card.Body>
                    {card.body.title && (
                    <Card.Title>{card.body.title}</Card.Title>
                    )}
                    {card.body.text && (
                    <Card.Text>{card.body.text}</Card.Text>
                    )}
                    {card.body.contact && (
                    <ContactSpecifics contact={this.props.include.contact}></ContactSpecifics>
                    )}
                    {card.body.image && (
                      <Card.Img src={card.body.image}/>
                    )}
                  </Card.Body>
                  )}
                  {(card.footer) && (
                  <Card.Footer as="h4">{card.footer}</Card.Footer>
                  )}
                </Card>
              ))}
                </CardDeck>
              )}

            {this.renderPlus(item.data)}
          </div>
         )
        }
        else if (this.props.item.type == 'video') {
          return(
            <div className={item.className} style={styleval} >
              <div className="col-1">
                {(this.state.popup == false) && (
                  <div className="col-9" onClick={this.selectItem}>
                    <ReactPlayer url={item.data}/>
                  </div>
                )}
                {this.renderPlus(item.data)}
              </div>
            </div>
          )
        }
        //images should be done differently... like part of carddecks....
        else if(this.props.item.type == 'image') {
          return(
              <div>
              {(this.state.popup == false) && (
              <img onClick={this.selectItem} className="profile-pic" src={this.props.item.data} alt="" />
              )}
              {this.renderPlus(item.data)}
              </div>
          )
        }
        else if(this.props.item.type == 'include'){
          if(this.props.item.data == 'social'){
            return(
              <div>
                {(this.state.popup === false) && (
                  <div>
                {this.props.include.social.map(social =>(
                  <li style={styleval} key={i++}><a href={social.full} > <i className={social.fa} /></a></li>
                ))}
                </div>

               )}
               {this.renderPlus(item.data)}
              </div>
            )
          }
          else{
            return(
               <div>
               {(this.state.popup === false) && (
                 <ContactSpecifics contact = {this.props.include.contact}/>)
               }
               {this.renderPlus(item.data)}
              </div>
            )
          }
        }
        else {
          return(<p/>)
        }
  }
}
