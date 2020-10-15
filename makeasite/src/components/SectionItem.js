import React from 'react';
import Dropdown from 'react-dropdown';
import '../scss/main.scss';
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


// wrapper to allow items to be edited or deleted
export default class SectionItem extends React.Component {
  constructor(props) {
        super(props);
        this.state ={ popup: false, position: props.item.position };
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.itemButton = this.itemButton.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);

        console.log("SectionItem " + JSON.stringify(this.props.item))
    };


  addItem = (value) => {

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
    console.log("deleting" + this.props.item.id)
    this.setState({popup: false})
    this.props.deleteItem(this.props.name,this.props.item.id)
  };

  selectItem = (e) => {
    console.log("edit " + e.target.id);
    if(this.props.editState === true && this.state.popup == false)
      this.setState({popup: true});
  };

  itemButton = (e) => {
    if(this.props.editState === true)
      this.selectItem(e);
    else
      console.log("button pressed")
  }

  renderPlus = (data) => {
      if(this.state.popup == true){
      var new1 = "Edit or Delete ";
      if(this.props.item.type != 'carddeck'){
        new1 = new1 + data;
      }
      return(
        <EditItemPopUp text={new1} deleteItem={this.deleteItem} editItem={this.editItem} item={this.props.item}/>
        )
      }
      else return(<p/>);
  }


  onDrop(e) {
    // your code
    console.log("drop " + JSON.stringify(e) + " " + JSON.stringify(this.state))
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
    var styleval = {
      'fontFamily': 'Open Sans',
      'color': 0x0000,
      'font-size': 12,
    }
    if(item.font != undefined){
      styleval.fontFamily = item.font;
    }
    if(item.textcolor != undefined){
      styleval.color = item.textcolor;
    }
    if(item.fontsize != undefined){
      styleval['font-size'] = item.fontsize + 'px';

    }
    styleval.position = 'relative';


    var id =item.id;
    if(item.id == undefined){
      id = Date.now();
    }
    console.log(item.type + " " + item.data)
        if(item.type == 'button'){
          return(
            <Draggable
              onDrag={this.onDrag}
              onStop={this.onStop}
                    >
                <Button
                style={{styleval}}
                id={id}
                color={item.color}
                class="btn btn-sm btn-outline-success"
                block
                >
                {item.data}
              </Button>
            </Draggable>
          )
        }
        else if(item.type == 'text'){
          return(
            <div style={styleval}>
              {(this.state.popup == false) && (
              <p style={styleval} onClick={this.selectItem} > {item.data} </p>
              )}
              {this.renderPlus(item.data)}

              </div>
            )
        }
        else if(item.type == 'html'){
          return(
                <div className="content" onClick={this.selectItem}>
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
                <Card.Body>car
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
            <div>
              {(this.state.popup == false) && (
                <CardDeck
                onClick={this.selectItem}
                classname={item.classname}
                >

                {item.data.map(card =>(

                <Card  style={{ width: '18rem' }}>
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
            <div class="row justify-content-start" >
              <div class="col-1">
                {(this.state.popup == false) && (
                  <div class="col-9" onClick={this.selectItem}>
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
            return(
              <div>
                {(this.state.popup == false) && (
               <ul className="social" onClick={this.selectItem}>
                {this.props.include.social.map(test =>(
                  <ul>
                   <li key = {i++}><a href={test.full} ><i className={test.fa} /></a></li>
                  </ul>
                ))}
               </ul>
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
