import React from 'react';
import Dropdown from 'react-dropdown';
import '../scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {Button} from 'reactstrap';
import ReactPlayer from "react-player";
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover';
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
    };

  editItem = (values) => {

        console.log("edit " + this.props.item.id)
    this.setState({popup: false})
    this.props.editItem(this.props.name,this.props.item.id,values)

  };

  deleteItem = () => {

      console.log("deleting" + this.props.item.id)

    this.setState({popup: false})
    this.props.deleteItem(this.props.name,this.props.item.id)

  };

  selectItem = (e) => {
    console.log("edit " + e.target.id);
    this.setState({popup: true});

  };

  itemButton = (e) => {
    console.log("button pressed")
  }

  render() {
    var i=1;
       if(this.props.editState === true){
           return(
         <div class="row justify-content-start">
         <div class='col-2'/>
           <input
            id={this.props.item.id}
            type="button"
            value={this.props.item.data}
            onClick={this.selectItem}/>

          {this.state.popup == true && (
            <EditItemPopUp text="Edit or Delete this Item" deleteItem={this.deleteItem} editItem={this.editItem} item={this.props.item}/>
          )}
          </div>
        );
      }
      else{
        if(this.props.item.type === 'button'){
          return(
            <Button
            id={this.props.item.id}
            color={this.props.item.color}
            class="btn btn-sm btn-outline-success"
            block
            onClick={(event) => this.itemButton(event)}
          >
          {this.props.item.data}
          </Button>
          )
        }
        else if(this.props.item.type === 'text'){
          return(<p> {this.props.item.data} </p>)
        }
        else if(this.props.item.type === 'html'){
          return(
                <div className="content">
                {renderHTML(this.props.item.data)}
              </div>
            )
        }
        else if (this.props.item.type === 'video') {
          return(
            <div class="row justify-content-start">
              <div class="col-1"><p/></div>
              <div class="col-9">
                <ReactPlayer url={this.props.item.data}/>
              </div>
            </div>
          )
        }
        else if(this.props.item.type === 'image') {
          return(
            <div>
              <img className="profile-pic" src={this.props.item.data} alt="" />
            </div>
          )
        }
        else if(this.props.item.type === 'include'
          && this.props.item.data === 'social'){
            return(
            <ul className="social">
            {this.props.item.social.map(test =>(
              <ul>
                <li key = {i++}><a href={test.full} ><i className={test.fa} /></a></li>
              </ul>
            ))}
            </ul>
          )
        }
        else if(this.props.item.type === 'include'
          && this.props.item.data === 'contact'){
            return(
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <ContactSpecifics contact={this.props.contact}></ContactSpecifics>
                </div>
              </div>
        )}
      }
  }
}
