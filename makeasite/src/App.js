import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header'
import Info from './components/Info'
import DataCircles from './components/DataCircles'
import DisplayColumns from './components/DisplayColumns'
import DisplayDBData from './components/DisplayDBData'
import Footer from './components/Footer'
import FinalForm from './components/FinalForm'
import Section from './components/Section'
//import OutsideAlerter from './components/OutsideAlerter'

import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./src_auth0/components/PrivateRoute";
import Loading from "./src_auth0/components/Loading";
import NavBar from "./src_auth0/components/NavBar";
import Profile from "./src_auth0/views/Profile";
import {appConfig} from "./res/myconfig";
import { useAuth0 } from "./src_auth0/react-auth0-spa";
import history from "./src_auth0/utils/history";
import AddItemPopUp from "./components/AddItemPopUp";
import AddSectionPopUp from "./components/AddSectionPopUp";
import PopUp from "./components/PopUp";

// Edit state - if in Edit mode the Navigation Menu is a different color...
// Edit Toggle on the Navigation menu.

// todos:
// ability to change font type and color on a change page.
// font size changes - or wraps to manage mutlicolumn (columns don't overwrite each other)

// change text on screen
// add items to a section. - image, text or button

     class App2 extends Component {


       constructor(props) {
             super(props);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
             this.addSection = this.addSection.bind(this);
             this.addItem = this.addItem.bind(this);
             this.deleteSection = this.deleteSection.bind(this);
             this.setBackgroundImage = this.setBackgroundImage.bind(this);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
             this.getStyle = this.getStyle.bind(this);
             this.addSectionPop = this.addSectionPop.bind(this);
             this.addItemPop = this.addItemPop.bind(this);
             this.editItem = this.editItem.bind(this);
             this.deleteItem = this.deleteItem.bind(this);
             this.state = { showItemPopUp: false,
                        showSectionPopUp: false,
                        currentSection: ''};
         };


         forceUpdateHandler = () => {
           this.forceUpdate();
         }
         addItem = (sectionName,values) => {
           this.setState({currentSection: sectionName})
           console.log(sectionName + " " + values)
           this.setState({showItemPopUp: !this.state.showItemPopUp})

           for(var i = 0; i < appConfig.sections.length;i++){
             if(appConfig.sections[i].name == this.state.currentSection){
               console.log("adding item to " + this.state.currentSection)
               // create a unique id for the item
               values.id = Date.now();
               if(appConfig.sections[i].items){
               const newItems = [
                   ...appConfig.sections[i].items,
                   values
               ]
               appConfig.sections[i].items = newItems;

             }
             else{
               appConfig.sections[i].items = [values];
             }

                 this.forceUpdateHandler();
               break;
             }
           }

         }
         editItem = (name, id, values) => {
           console.log("app edit " + name + id + JSON.stringify(values) + this.state.currentSection)
           for(var i = 0; i < appConfig.sections.length;i++){
             if(appConfig.sections[i].name == name){
               console.log("editing item in " + name)
               // create a unique id for the item
               for(var j = 0; j < appConfig.sections[i].items.length;j++){
                 if(appConfig.sections[i].items[j].id === id){
                   appConfig.sections[i].items[j] = values;
                   console.log(JSON.stringify(appConfig.sections[i]));
                   this.forceUpdateHandler();
                   break;
                 }
               }
              break;

             }
           }
         }
         deleteItem = (name, id) => {
           console.log("app delete " + name + id)
           for(var i = 0; i < appConfig.sections.length;i++){
             if(appConfig.sections[i].name === name){
                for(var j = 0; j < appConfig.sections[i].items.length;j++){
                  if(appConfig.sections[i].items[j].id === id){
                    appConfig.sections[i].items.splice(j,1);
                    this.forceUpdateHandler();
                    break;
                  }
                }
               break;
             }
           }

         }
         addSection = (values) => {
           const dataSections =appConfig.sections;
              const newSections = [
                  ...dataSections,
                  values
              ]

              appConfig.sections = newSections;
              this.forceUpdateHandler();
              this.setState({
                   showSectionPopUp: !this.state.showSectionPopUp
              });
              this.forceUpdate();

              console.log(appConfig.sections);
      }
      addSectionPop = () => {
        this.setState({showSectionPopUp: !this.state.showSectionPopUp})

      }
      addItemPop = (inCurrentSection) => {
        this.setState({currentSection: inCurrentSection});
        this.setState({showItemPopUp: !this.state.showItemPopUp})

      }

     getStyle = (name) => {
       var imageIn;
       var type;
          for(var i = 0; i < appConfig.sections.length;i++){
            if(appConfig.sections[i].name === name){
               imageIn =  appConfig.sections[i].backimg ;
               type = appConfig.sections[i].type;
              break;
            }
          }



        var currentStyle;
        // this was original just for info
       if(type && type.includes("info")){
           if(imageIn && imageIn != ""){
            currentStyle = {
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: 20,
              backgroundImage: "url(" +  imageIn + ")",
           }
         }
         else{
           currentStyle = {
             width: "100%",
             display: "grid",
             gridTemplateColumns: "repeat(3, 1fr)",
             gridGap: 20,
          }
         }
        }
        else if (type){
          if(imageIn && imageIn != ""){
          currentStyle = {
            width: "100%",
            backgroundImage: "url(" +  imageIn + ")",
            }
          }
          else{
           currentStyle = {
             width: "100%",
             }
          }
       }
        return currentStyle;
     }

      deleteSection = (sectionName)=> {
        /*
        console.log("delete Section " + this.props.name);
        this.props.deleteSection(this.props.name);
        this.forceUpdateHandler();
        */
        // need to change appConfig appropriately
      // sectionName == info
      for(var i = 0; i < appConfig.sections.length;i++){
        if(appConfig.sections[i].name == sectionName){
          console.log("deleting " + sectionName)
          appConfig.sections.splice(i,1);
          this.forceUpdateHandler();
          break;
        }
      }

      };
      setBackgroundImage = (name,current)=> {
        for(var i = 0; i < appConfig.sections.length;i++){
          if(appConfig.sections[i].name == name){
            console.log("change background section name "+ appConfig.sections[i].name);
              appConfig.sections[i].backimg = current.substr(1);
            break;
          }
        }
      };

    render(){

    return (

      // if isAuthenticated, there will be an extra button to choose - to allow things
      // to be changed (back image, and font....)


      // if menutitle filled out, will display in Navbar
      // if loginDisplay is true, will display on logout
      <Router history={history}>
        <div id="app" className="d-flex flex-column h-100">

          <NavBar editable={appConfig.editable} sections ={appConfig.sections}/>


          <Container className="flex-grow-1 mt-5">
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
            {appConfig.sections.map(section =>{
          //    console.log(section.login + " " + isAuthenticated);

              if (!section.loginDisplay || section.loginDisplay === 'false' || this.props.isAuthenticated){
              if(section.type == 'header'){
                return (<Header
                  name='header'
                  key = 'header'
                  header = {section.header}
                  title = {section.title}
                  toptext={section.toptext}
                  imgref = {section.imgref}
                  mission = {section.mission}
                  buttonLabel = {section.buttonLabel}
                  text = {section.text}
                  classList = {section.classList}
                  social={appConfig.include.social}
                  contact={appConfig.include.contact}
                  setBackgroundImage={this.setBackgroundImage}
                  editState = {this.props.editState}
                  deleteSection = {this.deleteSection}
                  getStyle = {this.getStyle}
                  addItem = {this.addItem}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  />);

              }
              else if(section.type == 'info' ){

                // profile ?
                  return(<Info key = {section.name}
                    name={section.name}
                    header = {section.header}
                    text = {section.text}
                    classList = {section.classList}
                    contact={appConfig.include.contact}
                    img={section.img}
                    editState = {this.props.editState}
                    deleteSection = {this.deleteSection}
                    setBackgroundImage = {this.setBackgroundImage}
                    getStyle = {this.getStyle}
                    addItem = {this.addItem}
                    editItem = {this.editItem}
                    deleteItem = {this.deleteItem}
                    />)
              }
              else if(section.type == 'subcolumns'){
                  return(<DisplayColumns
                    key = {section.name}
                    name={section.name}
                    header = {section.header}
                    text = {section.text}
                    classList = {section.classList}
                    data={section.data}
                    editState = {this.props.editState}
                    deleteSection = {this.deleteSection}
                    setBackgroundImage = {this.setBackgroundImage}
                    getStyle = {this.getStyle}
                    addItem = {this.addItem}
                    editItem = {this.editItem}
                    deleteItem = {this.deleteItem}

                    />)
              }
              else if(section.type == 'circles'){
                return(<DataCircles key = {section.name}
                  name={section.name}
                  header = {section.header}
                  text = {section.text}
                  classList = {section.classList}
                  data={section.data}
                  editState = {this.props.editState}
                  deleteSection = {this.deleteSection}
                  setBackgroundImage = {this.setBackgroundImage}
                  getStyle = {this.getStyle}
                  />)
              }
              else if(section.type == 'infoPic'){
              }
              else if(section.type == 'final-form'){
                return(<FinalForm key = {section.name}
                  name={section.name}
                  header = {section.header}
                  api = {section.api}
                  text = {section.text}
                  submit = {section._onSubmit}
                  classList = {section.classList}
                  data = {section.data}
                 editState = {this.props.editState}
                 deleteSection = {this.deleteSection}
                 setBackgroundImage = {this.setBackgroundImage}
                 getStyle = {this.getStyle}
                 />)
              }
              else if(section.type == "cards"){
              }
              else if(section.type == 'dbdata'){
                return(<DisplayDBData key = {section.name}
                  name = {section.name}
                  header = {section.header}
                  api = {section.api}
                  classList = {section.classList}
                  deleteSection = {this.deleteSection}
                  editState = {this.props.editState}
                  deleteSection = {this.deleteSection}
                  setBackgroundImage = {this.setBackgroundImage}
                  getStyle = {this.getStyle}
                  />
                )
              }

              else {
                return(<Section key = {section.name}
                  name={section.name}
                  header={section.header}
                  text={section.text}
                  html = {section.html}
                  classList = {section.classList}
                  items = {section.items}
                  url = {section.url}
                  editState = {this.props.editState}
                  deleteSection={this.deleteSection}
                  setBackgroundImage= {this.setBackgroundImage}
                  getStyle={this.getStyle}
                  addItem={this.addItem}
                  social={appConfig.include.social}
                  contact={appConfig.include.contact}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  />)
              }
              }
            })}

            <Footer contact = {appConfig.include.contact}
            name = 'footer'
            editState = {this.props.editState}
            addSection = {this.addSection}
            addSectionPopUp = {this.addSectionPop}
            />
            </Container>


            {this.state.showSectionPopUp ?
          <AddSectionPopUp
            text='Add New Section'
            addSection={this.addSection.bind(this)}
            />:null
           }

        </div>
      </Router>
    );

  }
};


const App = () => {
  const { loading, isAuthenticated, editState} = useAuth0();
   if (loading) {
      return <Loading />;
    }
    else{
    return(
    <App2 isAuthenticated={isAuthenticated} editState={editState}/>
  )};
}

export default App;
/*
{this.state.showItemPopUp ?
<AddItemPopUp
text='Add New Item'
currentSection = {this.state.currentSection}
addItem={this.addItem.bind(this)}
/>:null
}
*/
