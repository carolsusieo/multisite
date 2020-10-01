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
import Video from './components/Video'
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

// Edit state - if in Edit mode the Navigation Menu is a different color...
// Edit Toggle on the Navigation menu.

//Lifting State.  A requirement for managing changes on the fly..
// Or, would it be easier to change database with an overlay,
// and do a restart everytime a change is made...  if possible
// but I wonder...

//  Let's start with changing font....
// todos:

// ability to change font type and color on a change page. That then affects
// font and color on other pages.
// ability to change the background pictures on pages.
// font size changes - or wraps to manage mutlicolumn


// the NAVBAR  menu items are managed by the authentication package -
// and create items for
//    all items in configuration that are marked with "menutitle"
//I think it might be

const App = () => {
  const { loading, isAuthenticated, editState} = useAuth0();
   if (loading) {
      return <Loading />;
    };


    const deleteSection = (sectionName) =>
    {
      console.log("app delete section ");

      // need to change appConfig appropriately
      // sectionName == info
      for(var i = 0; i < appConfig.sections.length;i++){
        console.log("section name "+ appConfig.sections[i].name);
        if(appConfig.sections[i].name == sectionName){
          console.log("deleting " + sectionName)
          appConfig.sections.splice(i,1);

        }
      }
     }

     const setBackgroundImage = (name,current) =>
     {
       console.log("app changeImage " + name + " " + current);
       if(name == "header"){
         appConfig.sections[0].backimg = current.substr(1);
       }

       else{
         for(var i = 0; i < appConfig.sections.length;i++){
           console.log("section name "+ appConfig.sections[i].name);
           if(appConfig.sections[i].name == name){
               appConfig.sections[i].backimg = current.substr(1);
             break;
           }
         }
       }
     }

    const getStyle = (name)  =>{

      console.log("getStyle " + name);
      var imageIn;
      var type;
      if(name == "header"){
        imageIn =  appConfig.sections[0].backimg ;
             type = name;
      }
      else{
         for(var i = 0; i < appConfig.sections.length;i++){
           if(appConfig.sections[i].name == name){
              imageIn =  appConfig.sections[i].backimg ;
              type = appConfig.sections[i].type;
             break;
           }
         }
       }
       var currentStyle;
       // this was original just for info
      if(type.includes("info")){
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
       else{
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
     };

     const addSection = () =>
     {

     }

     const changeSectionImage = () =>
     {

     }

     const changeSectionFont = () =>
     {

     }
     var name = "header"
    return (

      // if isAuthenticated, there will be an extra button to choose - to allow things
      // to be changed (back image, and font....)
      <Router history={history}>
        <div id="app" className="d-flex flex-column h-100">
          <NavBar editable={appConfig.editable} sections ={appConfig.sections}/>
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
            {appConfig.sections.map(section =>{
          //    console.log(section.login + " " + isAuthenticated);

              if (!section.login || section.login === 'false' || isAuthenticated){
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
                  setBackgroundImage={setBackgroundImage}
                  editState = {editState}
                  deleteSection = {deleteSection}
                  getStyle = {getStyle}
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
                    editState = {editState}
                    deleteSection = {deleteSection}
                    setBackgroundImage = {setBackgroundImage}
                    getStyle = {getStyle}
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
                    editState = {editState}
                    deleteSection = {deleteSection}
                    setBackgroundImage = {setBackgroundImage}
                    getStyle = {getStyle}

                    />)
              }
              else if(section.type == 'circles'){
                return(<DataCircles key = {section.name}
                  name={section.name}
                  header = {section.header}
                  text = {section.text}
                  classList = {section.classList}
                  data={section.data}
                  editState = {editState}
                  deleteSection = {deleteSection}
                  setBackgroundImage = {setBackgroundImage}
                  getStyle = {getStyle}
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
                 editState = {editState}
                 deleteSection = {deleteSection}
                 setBackgroundImage = {setBackgroundImage}
                 getStyle = {getStyle}
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
                  deleteSection = {deleteSection}
                  editState = {editState}
                  deleteSection = {deleteSection}
                  setBackgroundImage = {setBackgroundImage}
                  getStyle = {getStyle}
                  />
                )
              }
              else if(section.type == 'video'){
                return(<Video key = {section.name}
                name = {section.name}
                 header = {section.header}
                 url= {section.url}
                 classlist = {section.classList}
                 editState = {editState}
                 deleteSection = {deleteSection}
                 setBackgroundImage = {setBackgroundImage}
                 getStyle = {getStyle}
                 />)
              }
              else {
                return(<Section key = {section.name}
                  name={section.name}
                  header={section.header}
                  text={section.text}
                  classList = {section.classList}
                  mission={section.mission}
                  editState = {editState}
                  deleteSection = {deleteSection}
                  setBackgroundImage = {setBackgroundImage}
                  getStyle = {getStyle}
                  />)
              }
              }
            })}

            <Footer contact = {appConfig.include.contact}
            name = 'footer'
            editState = {editState}
            setBackgroundImage = {setBackgroundImage}
            getStyle = {getStyle}
            />
            </Container>
        </div>
      </Router>
    );
};

export default App;
/*<Header
  name='header'
  key = {appConfig.sections[0].name}
  header = {appConfig.sections[0].header}
  title = {appConfig.sections[0].title}
  toptext={appConfig.sections[0].toptext}
  ref = {appConfig.sections[0].imgref}
  mission = {appConfig.sections[0].mission}
  buttonLabel = {appConfig.sections[0].buttonLabel}
  text = {appConfig.sections[0].text}
  classList = {appConfig.sections[0].classList}
  social={appConfig.include.social}
  contact={appConfig.include.contact}
  setBackgroundImage={setBackgroundImage}
  editState = {editState}
  deleteSection = {deleteSection}
  getStyle = {getStyle}
  />
*/
