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

import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./src_auth0/components/PrivateRoute";
import Loading from "./src_auth0/components/Loading";
import NavBar from "./src_auth0/components/NavBar";
import Profile from "./src_auth0/views/Profile";
import {appConfig} from "./res/myconfig";
import { useAuth0 } from "./src_auth0/react-auth0-spa";
import history from "./src_auth0/utils/history";


const App = () => {
  const { loading, isAuthenticated} = useAuth0();
   if (loading) {
      return <Loading />;
    }
    return (
      <Router history={history}>
        <div id="app" className="d-flex flex-column h-100">
          <NavBar sections ={appConfig.sections}/>
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
            <Header social={appConfig.include.social}
              landing={appConfig.landing}
              contact={appConfig.include.contact}/>
            {appConfig.sections.map(section =>{


              if (!section.login || section.login === 'false' || isAuthenticated){
              if(section.type == 'info' ){
                  return(<Info name={section.name}
                    header = {section.header}
                    text = {section.text}
                    img = {section.img}
                    classList = {section.classList}
                    contact={appConfig.include.contact}/>)
              }
              else if(section.type == 'subcolumns'){
                  return(<DisplayColumns name={section.name}
                    header = {section.header}
                    text = {section.text}
                    classList = {section.classList}
                    data={section.data}/>)
              }
              else if(section.type == 'circles'){
                return(<DataCircles name={section.name}
                  header = {section.header}
                  text = {section.text}
                  classList = {section.classList}
                  data={section.data}/>)
              }
              else if(section.type == 'infoPic'){
              }
              else if(section.type == 'final-form'){
                return(<FinalForm name={section.name}
                  header = {section.header}
                  api = {section.api}
                  text = {section.text}
                  submit = {section._onSubmit}
                  classList = {section.classList}
                  data = {section.data}/>)
              }
              else if(section.type == "cards"){
              }
              else if(section.type == 'dbdata'){
                return(<DisplayDBData name = {section.name}
                  header = {section.header}
                  api = {section.api}
                  classList = {section.classList}/>
                )
              }
              else {
                return(<Section name={section.name}
                  header={section.header}
                  text={section.text}
                  img={section.img}
                  classList = {section.classList}
                  mission={section.mission}/>)
              }
              }
            })}
            <Footer contact = {appConfig.include.contact}
            />
            </Container>
        </div>
      </Router>
    );
};

export default App;
