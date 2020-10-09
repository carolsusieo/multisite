import React from 'react';
import Dropdown from 'react-dropdown';
import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {Button} from 'reactstrap';
import ReactPlayer from "react-player";
import ContactSpecifics from "./ContactSpecifics";
import EditItemPopUp from "./EditItemPopUp";
import renderHTML from 'react-render-html';

// wrapper to allow items to be edited or deleted
export default class SectionItem extends React.Component {
  constructor(props) {
        super(props);
        this.state ={ popup: false  };
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.itemButton = this.itemButton.bind(this);

        console.log("SectionItem " + JSON.stringify(this.props.item))
    };

  editItem = (values) => {
    console.log("edit " + this.props.item.id)
    var id = this.props.item.id;
    values.id = id;
//    values.type = this.props.item.type;
    this.props.editItem(id,values);
    this.setState({popup: false})
    console.log("values " + JSON.stringify(values))
  };

  deleteItem = () => {
    console.log("deleting" + this.props.item.id)
    this.setState({popup: false})
    this.props.deleteItem(this.props.name,this.props.item.id)
  };

  selectItem = (e) => {
    console.log("edit " + e.target.id);
    if(this.props.editState === true)
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
      var new1 = "Edit or Delete " + data;
      return(
        <EditItemPopUp text={new1} deleteItem={this.deleteItem} editItem={this.editItem} item={this.props.item}/>
        )
      }
      else return;
  }

  render() {
    var i=1;
    var id = this.props.item.id;
    if(this.props.item.id == undefined){
      id = Date.now();
    }
        if(this.props.item.type === 'button'){
          return(
            <div>
            <Button
            id={id}
            color={this.props.item.color}
            class="btn btn-sm btn-outline-success"
            block
            onClick={(event) => this.itemButton(event)}
          >
          {this.props.item.data}
          </Button>
          {this.renderPlus(this.props.item.data)}
          </div>
          )
        }
        else if(this.props.item.type === 'text'){
          return(
            <div>
            <p onClick={this.selectItem}> {this.props.item.data} </p>
            {this.renderPlus(this.props.item.data)}
            </div>
          )
        }
        else if(this.props.item.type === 'html'){
          return(
                <div className="content" onClick={this.selectItem}>
                {renderHTML(this.props.item.data)}
                {this.renderPlus(this.props.item.data)}
                </div>
            )
        }
        else if (this.props.item.type === 'video') {
          return(
            <div class="row justify-content-start" onClick={this.selectItem}>
              <div class="col-1"><p/></div>
              <div class="col-9">
                <ReactPlayer url={this.props.item.data}/>
              </div>
              {this.renderPlus(this.props.item.data)}
              </div>
          )
        }
        else if(this.props.item.type === 'image') {
          return(
            <div onClick={this.selectItem}>
              <img className="profile-pic" src={this.props.item.data} alt="" />
              {this.renderPlus(this.props.item.data)}
              </div>
          )
        }
        else if(this.props.item.type === 'include'
          && this.props.item.data === 'social'){
            return(
              <div>
               <ul className="social" onClick={this.selectItem}>
                {this.props.item.social.map(test =>(
                  <ul>
                   <li key = {i++}><a href={test.full} ><i className={test.fa} /></a></li>
                  </ul>
                ))}
               </ul>
               {this.renderPlus(this.props.item.data)}
              </div>
          )
        }
        else if(this.props.item.type === 'include'
          && this.props.item.data === 'contact'){
            return(
              <div className="row" onClick={this.selectItem}>
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <ContactSpecifics contact={this.props.contact}></ContactSpecifics>
                </div>
                {this.renderPlus(this.props.item.data)}
              </div>
        )}
  }
}
