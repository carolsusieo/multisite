import React from 'react';
import Dropdown from 'react-dropdown';
//import '../scss/main.scss';
//import '../scss/header.css';
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

  addItem = (value) => {

  }

  onExit = () => {
    this.setState({popup: false})
    this.props.onExit();
  }

  editItem = (values) => {
    console.log("edit " + this.props.item.id)
    var id = this.props.item.id;
    values.id = id;
//    values.type = this.props.item.type;
    this.props.editItem(id,values);
    this.setState({popup: false})
  };

  deleteItem = () => {
    //console.log("deleting" + this.props.item.id)
    this.setState({popup: false})
    this.props.deleteItem(this.props.name,this.props.item.id)
  };

  selectItem = (e) => {
    //console.log("edit " + e.target.id);
    if(this.props.editState === true && this.state.popup == false)
      this.setState({popup: true});
  };

  itemButton = (e) => {
    if(this.props.editState === true)
      this.selectItem(e);
    else{
      //console.log("button pressed")
    }
  }

  renderPlus = (data) => {
    var new1 = "";
      if(this.state.popup === true) {
        new1 = "Edit or Delete ";
      }
      else if(this.props.showItemPopUp === true){
        new1 = "Add ";
      }

      if(new1 != ""){

        if(this.props.item.type != 'carddeck'){
          new1 = new1 + data;
        }
        return(
          <EditItemPopUp styles={this.props.styles} text={new1}
          deleteItem={this.deleteItem} editItem={this.editItem}
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





  render() {
    var item = this.props.item;
    var i=1;
    var styleval =
      (item.type != 'include' && item.type != 'html' && item.style == undefined)?
      {
      'fontFamily': 'Open Sans',
      'color': 0x0000,
      'fontSize': "15px",
      }
      :item.style;

if(item.type == 'text')
  console.log("styleval1" ,styleval, item.id)

    var id =item.id;
    if(item.id == undefined){
      id = Date.now();
    }
    //console.log(item.type + " " + item.data)
        if(item.type == 'button'){
          return(
            <Draggable
              onDrag={this.onDrag}
              onStop={this.onStop}
                    >
                    {item.className ?
                      <Button
                      style={{styleval}}
                      id={id}
                      className={item.className}
                      variant= {item.variant}
                      >
                      {item.data}
                    </Button>
                    :
                <Button
                style={{styleval}}
                id={id}
                className="btn btn-sm btn-outline-success"
                variant= {item.variant}
                >
                {item.data}
              </Button>
            }
            </Draggable>
          )
        }
        else if(item.type == 'text'){
          if(styleval != undefined && styleval != null){
  //          console.log("styleval ", styleval)
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
    //        console.log("css")

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
                  {(this.state.popup == false) && (
                    renderHTML(item.data)
                )}
                {this.renderPlus(item.data)}
                </div>
            )
        }
        else if(item.type == 'card'){
          return(
            <div>
              {(this.state.popup == false) && (

                <Card onClick={this.selectItem}  style={{ width: '18rem' }}>
                {(item.header) && (
                <Card.Header as="h3">{item.header}</Card.Header>
                )}
                {item.img && (
                  <Card.Img src={item.img}/>
                )}
                {item.body && (
                <Card.Body>
                  {item.body.title && (
                  <Card.Title>{item.body.title}</Card.Title>
                  )}
                  {item.body.text && (
                  <Card.Text>{item.body.text}</Card.Text>
                  )}
                  {item.body.contact && (
                  <ContactSpecifics contact={this.props.include.contact}></ContactSpecifics>
                  )}
                </Card.Body>
                )}
                {(item.footer) && (
                <Card.Footer as="h4">{item.footer}</Card.Footer>
                )}
                </Card>
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
        else if(this.props.item.type == 'include'
          && this.props.item.data == 'social'){
  //          console.log("social ",this.props.include);
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
        else {
          return(<p/>)
        }
  }
}


/*
<SocialMediaIconsReact url={social.full} icon={social.type} />

<li key={i++}><a href={social.full} > <i className={social.fa} /></a></li>

onClick(event) {
  // your code
}

onDrop(event) {
  // your code
}

onDrag() {
  this.setState({dragging: true})
}

onStop(...args) {
  const {dragging} = this.state
  this.setState({dragging: false})
  if (dragging) {
    this.onDrop(...args)
  } else {
    this.onClick(...args)
  }
}

render() {
  return (
    <Draggable
      onDrag={this.onDrag} // assume it's bound to `this`
      onStop={this.onStop} // assume it's bound to `this`
    />
  )
}

*/
/*
<div style={styleval}>
*/
