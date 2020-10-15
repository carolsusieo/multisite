import React, { Component ,useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header'
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
// let's a the configuration from the database.
import {initConfig} from "./res/myconfig";
import { useAuth0 } from "./src_auth0/react-auth0-spa";
import history from "./src_auth0/utils/history";
import AddSectionPopUp from "./components/AddSectionPopUp";
import api from "./api"

// Edit state - if in Edit mode the Navigation Menu is a different color...
// todos:
// logo on navbar
// font size changes or word wraps to manage mutlicolumn (columns don't overwrite each other)
// move items around in a section - mouse down and pull
// insure that gallery doesn't override the popup on screen

// put the json in a database..
// change the order of sections


//container
// card
//

     class App2 extends Component {


       constructor(props) {
             super(props);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
             this.addSection = this.addSection.bind(this);
             this.addItem = this.addItem.bind(this);
             this.deleteSection = this.deleteSection.bind(this);
             this.setBackgroundImage = this.setBackgroundImage.bind(this);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
             this.aStyle = this.aStyle.bind(this);
             this.addSectionPop = this.addSectionPop.bind(this);
             this.editItem = this.editItem.bind(this);
             this.deleteItem = this.deleteItem.bind(this);
             this.state = { showItemPopUp: false,
                        showSectionPopUp: false,
                        currentSection: '',
                        appConfig: props.initConfig};
         };


         forceUpdateHandler = () => {
           this.forceUpdate();
         }

         addItem = (sectionName,values) => {
           this.setState({currentSection: sectionName})
           console.log(sectionName + " " + JSON.stringify(values));
           var currConfig = this.state.appConfig;

           for(var i = 0; i < currConfig.sections.length;i++){
             if(currConfig.sections[i].name == sectionName){
               console.log("adding item to " + sectionName)
               // create a unique id for the item
               values.id = Date.now();
               if(currConfig.sections[i].items != undefined){
                 const newItems = [
                   ...currConfig.sections[this.state.i].items,
                   values
                 ]
                   currConfig.sections[i].items = newItems;
                 this.setState({appConfig: currConfig});
               }
               else{
                 currConfig.sections[i].items = [values];
                 this.setState({appConfig: currConfig});
               }
               console.log("items " + JSON.stringify(this.state.appConfig.sections[i].items))
               this.forceUpdateHandler();
               break;
             }
           }
           this.setState({showItemPopUp: !this.state.showItemPopUp})

         }

         editItem = (name, id, values) => {
           var currConfig = this.state.appConfig;
           console.log("app edit " + name + id + JSON.stringify(values) + this.state.currentSection)
           for(var i = 0; i < currConfig.sections.length;i++){
             if(currConfig.sections[i].name == name){
               console.log("editing item in " + name)
               // create a unique id for the item
               for(var j = 0; j < currConfig.sections[i].items.length;j++){
                 if(currConfig.sections[i].items[j].id === id){
                   currConfig.sections[i].items[j] = values;
                   this.setState({appConfig: currConfig});
                   console.log(JSON.stringify(this.state.appConfig.sections[i]));
                   this.forceUpdateHandler();
                   break;
                 }
               }
              break;

             }
           }
         }

         deleteItem = (name, id) => {
           var currConfig = this.state.appConfig;
           console.log("app delete " + name + id)
           for(var i = 0; i < currConfig.sections.length;i++){
             if(currConfig.sections[i].name === name){
                for(var j = 0; j < currConfig.sections[i].items.length;j++){
                  if(currConfig.sections[i].items[j].id === id){
                    currConfig.sections[i].items.splice(j,1);
                    this.setState({appConfig:currConfig});
                    this.forceUpdateHandler();
                    break;
                  }
                }
               break;
             }
           }

         }

      addSection = (values) => {
        var currConfig = this.state.appConfig;
           const dataSections =currConfig.sections;
              const newSections = [
                  ...dataSections,
                  values
              ]

              currConfig.sections = newSections;
              this.setState({appConfig: currConfig});
              this.forceUpdateHandler();
              this.setState({
                   showSectionPopUp: !this.state.showSectionPopUp
              });
              this.forceUpdate();

              console.log(this.state.appConfig.sections);
      }

      addSectionPop = () => {
        this.setState({showSectionPopUp: !this.state.showSectionPopUp})
      }


     aStyle = (name) => {
       var imageIn;
       var type;
          for(var i = 0; i < this.state.appConfig.sections.length;i++){
            if(this.state.appConfig.sections[i].name === name){
               imageIn =  this.state.appConfig.sections[i].backimg ;
               type = this.state.appConfig.sections[i].type;
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
        // need to change this.state.appConfig appropriately
      // sectionName == info
      var currConfig = this.state.appConfig;
      for(var i = 0; i < currConfig.sections.length;i++){
        if(currConfig.sections[i].name == sectionName){
          console.log("deleting " + sectionName)
          currConfig.sections.splice(i,1);
          this.setState({appConfig:currConfig});
          this.forceUpdateHandler();
          break;
        }
      }

      };
      setBackgroundImage = (name,current)=> {
        var currConfig = this.state.appConfig;
        for(var i = 0; i < currConfig.sections.length;i++){
          if(currConfig.sections[i].name == name){
            console.log("change background section name "+ currConfig.sections[i].name);
              currConfig.sections[i].backimg = current.substr(1);
              this.setState({appConfig: currConfig});
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

          <NavBar editable={this.state.appConfig.editable} sections ={this.state.appConfig.sections}/>


          <Container className="flex-grow-1 mt-5">
            <Switch>
              <PrivateRoute path="/profile" component={this.state.appConfig} />
            </Switch>
            {this.state.appConfig.sections.map(section =>{
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
                  include = {this.state.appConfig.include}
                  setBackgroundImage={this.setBackgroundImage}
                  editState = {this.props.editState}
                  deleteSection = {this.deleteSection}
                  aStyle = {this.aStyle}
                  addItem = {this.addItem}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  />);

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
                    aStyle = {this.aStyle}
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
                  aStyle = {this.aStyle}
                  />)
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
                 aStyle = {this.aStyle}
                 />)
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
                  aStyle = {this.aStyle}
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
                  aStyle={this.aStyle}
                  addItem={this.addItem}
                  include={this.state.appConfig.include}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  />)
              }
              }
            })}

            <Footer include = {this.state.appConfig.include}
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

  const [isDBLoading, setDBIsLoading] = useState(true);
  const [configData, setData] = useState(null)
  const [apiforconfig, setWebsite] = useState("/api/config/config?website=" + initConfig.website)


  useEffect(() => {
      console.log(api);
      async function getData() { api.configOut(apiforconfig)
      //.then(res =>  res.json())
       .then((configdata) => {
         console.log(configdata)
         setData(configdata.data.data);
         setDBIsLoading(false);
       })
       .catch(console.log);
     }
     getData();
  }, []);


  const { loading, isAuthenticated, editState} = useAuth0();

   if (loading ) {
     // get the configuration from the database if possible:
      return <Loading />;
    }
    else{
        console.log("got data", configData)

      if(configData != undefined && configData != null){
        console.log("using db")
      return(
        <App2 isAuthenticated={isAuthenticated} editState={editState} initConfig={configData[0]}/>
      )
      }
      else{
      return(
    <App2 isAuthenticated={isAuthenticated} editState={editState} initConfig={initConfig}/>
    )
  }
  };
}

export default App;
