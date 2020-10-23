import React, { Component ,useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header'
import DataCircles from './components/DataCircles'
import DisplayColumns from './components/DisplayColumns'
import DisplayDBData from './components/DisplayDBData'
import Footer from './components/Footer'
import FinalForm from './components/FinalForm'
import Article from './components/Article'
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./src_auth0/components/Loading";
import NavBar from "./src_auth0/components/NavBar";
import Profile from "./src_auth0/views/Profile";
import {initConfig} from "./res/myconfig";
import { useAuth0 } from "./src_auth0/react-auth0-spa";
import history from "./src_auth0/utils/history";
import AddArticlePopUp from "./components/AddArticlePopUp";
import api from "./api";
import { useData } from "./ctrl/DataController"
import PrivateRoute from "./src_auth0/components/PrivateRoute";
import { StyleSheet, css } from 'aphrodite';

// Edit state - if in Edit mode the Navigation Menu is a different color...
// todos:
// logo on navbar
// font size changes or word wraps to manage mutlicolumn (columns don't overwrite each other)
// move items around in a section - mouse down and pull
// change the order of sections

//container

class App2 extends Component {

       constructor(props) {
             super(props);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

             this.addArticle = this.addArticle.bind(this);
             this.addArticlePop = this.addArticlePop.bind(this);
             this.deleteArticle = this.deleteArticle.bind(this);
             /* edit article?  Like the name, or some other specific?
             */

             this.setBackgroundImage = this.setBackgroundImage.bind(this);
             this.aStyle = this.aStyle.bind(this);

             this.navChoices = this.navChoices.bind(this);
             this.toggleEditState = this.toggleEditState.bind(this);

             this.addItem = this.addItem.bind(this);
             this.deleteItem = this.deleteItem.bind(this);
             this.editItem = this.editItem.bind(this);
             this.onExit = this.onExit.bind(this);

             this.state = {
                        showItemPopUp: false,
                        showArticlePopUp: false,
                        currentArticle: '',
                        appConfig: props.initConfig,
                        editState: false,
                        editStateLabel: "Edit",
                        edited: 0
                      };
         };

         forceUpdateHandler = () => {
           // store the record for this...
           var edited = this.state.edited;
           this.props.saveEdit(this.props.initConfig.website,this.state.appConfig);
           this.setState({edited: 1})
           this.forceUpdate();
         }


/* managing ITEMS  couldn't this be done in Article?*/

         onExit = () => {
           if(this.state.showItemPopup){
             var currConfig = this.state.appConfig;
           // the item added to the end, is not valid..
             // best to remove
             for(var i = 0; i < currConfig.articles.length;i++){
               if(currConfig.articles[i].name == this.state.currentArticle){
                 if(currConfig.articles[i].items != undefined){
                   // the last one...
                   currConfig.articles[i].items.pop();
                   this.setState({appConfig: currConfig});
                 }

                 this.forceUpdateHandler();
                 break;
               }
             }

           }
           // todo probably want to read in the record from the database...
           // no... we want to do that when they exit out...

           this.setState({showItemPopUp:false});
           this.forceUpdate();
         }

         addItemPopUp = (inArticle) =>{

           var values = { "id": Date.now(),"type": "text", "data":"add..." };

           this.setState({currentArticle:inArticle});
           console.log("app addItem popup")
           var currConfig = this.state.appConfig;

           for(var i = 0; i < currConfig.articles.length;i++){
             if(currConfig.articles[i].name == inArticle){
               // create a unique id for the item
               if(currConfig.articles[i].items != undefined){
                 console.log("current article = " + currConfig.articles[i].name)

                 const newItems = [
                   ...currConfig.articles[i].items,
                   values
                 ]
                 currConfig.articles[i].items = newItems;
                 this.setState({appConfig: currConfig});
               }
               else{
                 currConfig.articles[i].items = [values];
                 this.setState({appConfig: currConfig});
               }
               this.forceUpdateHandler();
               break;
             }
           }
           this.setState({showItemPopUp:true});
           // and, we need to create the itme in the articles set of items
           // even if it's removed on Exit...
           this.forceUpdate();
         }

         addItem = (articleName,values) => {
           this.setState({currentArticle: articleName})
             var currConfig = this.state.appConfig;

           for(var i = 0; i < currConfig.articles.length;i++){
             if(currConfig.articles[i].name == articleName){
               // create a unique id for the item
               values.id = Date.now();

               if(currConfig.articles[i].items != undefined){
                 const newItems = [
                   ...currConfig.articles[i].items,
                   values
                 ]
                   currConfig.articles[i].items = newItems;
                 this.setState({appConfig: currConfig});
               }
               else{
                 currConfig.articles[i].items = [values];
                 this.setState({appConfig: currConfig});
               }
                   this.forceUpdateHandler();
               break;
             }
           }
           this.setState({showItemPopUp: !this.state.showItemPopUp})
         }


         editItem = (name, id, values) => {
           var currConfig = this.state.appConfig;
             for(var i = 0; i < currConfig.articles.length;i++){
             if(currConfig.articles[i].name == name){
        //       console.log("editing item in " + name)
               // create a unique id for the item
               for(var j = 0; j < currConfig.articles[i].items.length;j++){
                 if(currConfig.articles[i].items[j].id === id){
                   currConfig.articles[i].items[j] = values;
                   this.setState({appConfig: currConfig});
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
          // console.log("app delete " + name + id)
           for(var i = 0; i < currConfig.articles.length;i++){
             if(currConfig.articles[i].name === name){
                for(var j = 0; j < currConfig.articles[i].items.length;j++){
                  if(currConfig.articles[i].items[j].id === id){
                    currConfig.articles[i].items.splice(j,1);
                    this.setState({appConfig:currConfig});
                    this.forceUpdateHandler();
                    break;
                  }
                }
               break;
             }
           }

         }
/* END managing ITEMS*/



      addArticle = (values) => {
        var currConfig = this.state.appConfig;
           const dataArticles =currConfig.articles;
              const newArticles = [
                  ...dataArticles,
                  values
              ]

              currConfig.articles = newArticles;
              this.setState({appConfig: currConfig});
              this.forceUpdateHandler();
              this.setState({
                   showArticlePopUp: !this.state.showArticlePopUp
              });
              this.forceUpdate();

        }

      addArticlePop = () => {
        this.setState({showArticlePopUp: !this.state.showArticlePopUp})
      }
      deleteArticle = (articleName)=> {

          var currConfig = this.state.appConfig;
          for(var i = 0; i < currConfig.articles.length;i++){
            if(currConfig.articles[i].name == articleName){
      //        console.log("deleting " + articleName)
              currConfig.articles.splice(i,1);
              this.setState({appConfig:currConfig});
              this.forceUpdateHandler();
              break;
            }
          }

       };


     aStyle = (name) => {
       var imageIn;
       var type;
       var currentStyle = undefined;
          for(var i = 0; i < this.state.appConfig.articles.length;i++){
            if(this.state.appConfig.articles[i].name == name){
               imageIn =  this.state.appConfig.articles[i].backimg ;
               type = this.state.appConfig.articles[i].type;
               if(this.state.appConfig.articles[i].style != undefined){
                currentStyle = this.state.appConfig.articles[i].style;
              }
              break;
            }
          }

        if(currentStyle == undefined){
  //        console.log("currentStyle not defined");
          // this was original just for info
          if(type && type.includes("header")){
            if(imageIn && imageIn != ""){
              currentStyle = {
               width: "100%",
               backgroundImage: "url(" +  imageIn + ")",
               position: "relative",
               height: "550px",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "top",
               backgroundSize: "cover",
               textAlign: "center",
               overflow: "hidden",

              }
            }
            else{
              currentStyle = {
                 width: "100%",
                 position: "relative",
                 height: "800px",
              }

             }
          }
        else if (type){
  //        console.log(type, imageIn)
          if(imageIn && imageIn != ""){
           currentStyle = {
            width: "100%",
            background: "url(" +  imageIn + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
           }
          }
          else{
           currentStyle = {
             width: "100%",
             }
          }
        }
        else{
  //        console.log("no type", imageIn)
        }
      }

      else if(imageIn != undefined){
  //      console.log(currentStyle)
        if(currentStyle.background != undefined && currentStyle.background.includes("url(")){
          // getting an error when I select to Edit....
          // but, I'm not sure why I'm even here.
         currentStyle.background = currentStyle.background + imageIn + ")";
        }
        else if(currentStyle.backgroundImage == undefined){
          currentStyle.backgroundImage= "url(" +  imageIn + ")";
        }
  //      console.log(currentStyle)
      }

      return currentStyle;
  }

        setBackgroundImage = (name,current)=> {
        var currConfig = this.state.appConfig;
        for(var i = 0; i < currConfig.articles.length;i++){
          if(currConfig.articles[i].name == name){
    //        console.log("change background article name "+ currConfig.articles[i].name);
              currConfig.articles[i].backimg = current.substr(1);
              this.setState({appConfig: currConfig});
            break;
          }
        }
      };

      toggleEditState = () =>{
        var current = !this.state.editState
        this.setState({editState: current})
        // opposite of what it was.
        if(current === true){
          this.setState({editStateLabel: "Stop Edit"})

        }
        else{
          if(this.state.edited != undefined && this.state.edited != 0){
            this.props.saveAllEdits(this.props.initConfig.website,this.state.appConfig);
          }

          this.setState({editStateLabel: "Edit",edited: 0})
        }
      }

// extra stuff part of the login menu
      addButtons = () => {
        if(this.state.appConfig.editable && this.state.appConfig.editable == true)
        {
          return([{
                  "label": this.state.editStateLabel,
                  "id": 'editState',
                  "nav": 'editState'
                }])
        }
        else{
          return(null);
        }
      }

// allows additional of actionable buttons to the nav menu
      navChoices = (which) =>{
  //      console.log("navChoices ", which)
        if(which == 'editState'){
              this.toggleEditState();
          }
      }

    render(){
      // update the display style based on whether or not we are in edit mode
      // edit mode will not allow all of the bells and whistles of normal mode
      var appStyle = {};

/*
      const basicStyle={
    		mainWrapper: {
    			width: "100%",height: "cover",textAlign: "center"
    		},
    		articleContainer: {
    		  width: "100%",height: "cover",position: "relative",margin: "0px"
    		},
    		jump:{
    			margin:"0",display:"block",position: "relative",height:"0px",
    		}
      }

      var appStyle = {};
      if(this.state.editState === true){
        appStyle = StyleSheet.create(basicStyle);
      }
      else
      */
        appStyle = StyleSheet.create(this.state.appConfig.appStyle);


    return (

      // if isAuthenticated, there will be an extra button to choose - to allow things
      // to be changed (back image, and font....)


      // if menutitle filled out, will display in Navbar (based on login values)
      // if loginDisplay is false, will always display
      <Router history={history}>
        <div id="app" className={css(appStyle.mainWrapper)}>

          <NavBar styles={appStyle} articles ={this.state.appConfig.articles} navChoices={this.navChoices} addButtons = {this.addButtons}/>

          <Container>

            <Switch>
              <PrivateRoute path="/Profile" component={Profile} />
            </Switch>

            {this.state.appConfig.articles.map(article =>{
          //    console.log(article.login + " " + isAuthenticated);

              if (!article.loginDisplay || article.loginDisplay === 'false' || this.props.isAuthenticated){
              if(article.type == 'header'){
                return (<Header
                  styles={appStyle}
                  name='header'
                  key = 'header'
                  header = {article.header}
                  title = {article.title}
                  toptext={article.toptext}
                  imgref = {article.imgref}
                  mission = {article.mission}
                  buttonLabel = {article.buttonLabel}
                  text = {article.text}
                  classList = {article.classList}
                  include = {this.state.appConfig.include}
                  setBackgroundImage={this.setBackgroundImage}
                  editState = {this.state.editState}
                  deleteArticle = {this.deleteArticle}
                  aStyle = {this.aStyle}
                  addItem = {this.addItem}
                  showItemPopUp = {this.state.showItemPopUp}
                  addItemPopUp = {this.addItemPopUp}
                  onExit = {this.onExit}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  items = {article.items}
                />);

              }
              else if(article.type == 'subcolumns'){
                  return(<DisplayColumns
                    styles={appStyle}
                    key = {article.name}
                    name={article.name}
                    header = {article.header}
                    text = {article.text}
                    classList = {article.classList}
                    data={article.data}
                    editState = {this.state.editState}
                    deleteArticle = {this.deleteArticle}
                    setBackgroundImage = {this.setBackgroundImage}
                    aStyle = {this.aStyle}
                    addItem = {this.addItem}
                    editItem = {this.editItem}
                    deleteItem = {this.deleteItem}
                    showItemPopUp = {this.state.showItemPopUp}
                    addItemPopUp = {this.addItemPopUp}
                    onExit = {this.onExit}

                    />)
              }
              else if(article.type == 'circles'){
                return(<DataCircles key = {article.name}
                  styles={appStyle}
                  name={article.name}
                  header = {article.header}
                  text = {article.text}
                  classList = {article.classList}
                  data={article.data}
                  editState = {this.state.editState}
                  deleteArticle = {this.deleteArticle}
                  setBackgroundImage = {this.setBackgroundImage}
                  aStyle = {this.aStyle}
                  showItemPopUp = {this.state.showItemPopUp}
                  addItemPopUp = {this.addItemPopUp}
                  onExit = {this.onExit}
                />)
              }
              else if(article.type == 'final-form'){
                return(<FinalForm key = {article.name}
                  styles={appStyle}
                  name={article.name}
                  header = {article.header}
                  api = {article.api}
                  text = {article.text}
                  submit = {article._onSubmit}
                  classList = {article.classList}
                  data = {article.data}
                 editState = {this.state.editState}
                 deleteArticle = {this.deleteArticle}
                 setBackgroundImage = {this.setBackgroundImage}
                 aStyle = {this.aStyle}
                 showItemPopUp = {this.state.showItemPopUp}
                 addItemPopUp = {this.addItemPopUp}
                 onExit = {this.onExit}
               />)
              }
              else if(article.type == 'dbdata'){
                return(<DisplayDBData key = {article.name}
                  styles={appStyle}
                  name = {article.name}
                  header = {article.header}
                  api = {article.api}
                  classList = {article.classList}
                  deleteArticle = {this.deleteArticle}
                  editState = {this.state.editState}
                  setBackgroundImage = {this.setBackgroundImage}
                  aStyle = {this.aStyle}
                  showItemPopUp = {this.state.showItemPopUp}
                  addItemPopUp = {this.addItemPopUp}
                  onExit = {this.onExit}
                  />
                )
              }

              else {
                return(<Article key = {article.name}
                  styles={appStyle}
                  name={article.name}
                  header={article.header}
                  classList = {article.classList}
                  items = {article.items}
                  editState = {this.state.editState}
                  deleteArticle={this.deleteArticle}
                  setBackgroundImage= {this.setBackgroundImage}
                  aStyle={this.aStyle}
                  addItem={this.addItem}
                  include={this.state.appConfig.include}
                  editItem = {this.editItem}
                  deleteItem = {this.deleteItem}
                  showItemPopUp = {this.state.showItemPopUp}
                  addItemPopUp = {this.addItemPopUp}
                  onExit = {this.onExit}
                />)
              }
              }
            })}

            <Footer include = {this.state.appConfig.include}
            name = 'footer'
            styles={appStyle}
            editState = {this.state.editState}
            addArticle = {this.addArticle}
            addArticlePopUp = {this.addArticlePop}
            />
            </Container>


            {this.state.showArticlePopUp ?
          <AddArticlePopUp styles={appStyle}
            text='Add New Section'
            addArticle={this.addArticle.bind(this)}
            />:null
           }

        </div>
      </Router>

    );

  }
};

const App = () => {

  const [isDBLoading, setDBIsLoading] = useState(true);
  // this is the unchanged original record for the user.  - no intermediate changes
  const [configData, setData] = useState(null)
  const [apiforconfig, setWebsite] = useState("/api/config/config?website=" + initConfig.website)


  useEffect(() => {
      //console.log(api);
      async function getData() { api.configOut(apiforconfig)
      //.then(res =>  res.json())
       .then((configdata) => {
        // console.log(configdata)
         setData(configdata.data.data);
         setDBIsLoading(false);
       })
       .catch(console.log);
     }
     getData();
  }, []);


  const { loading, isAuthenticated} = useAuth0();

  // we could have access to all the in process changes here
  const { saveEdit, saveAllEdits } = useData();

    if (loading ) {
     // get the configuration from the database if possible:
      return <Loading />;
    }
    else{
        //console.log("got data", configData)

      if(configData != undefined && configData != null){
        //console.log("using db")
        return(
          <App2 isAuthenticated={isAuthenticated}  initConfig={configData[0]}
           saveEdit={saveEdit} saveAllEdits={saveAllEdits} />)
      }
      else{
       return(
        <App2 isAuthenticated={isAuthenticated}  initConfig={initConfig}
         saveEdit={saveEdit} saveAllEdits={saveAllEdits} />)
      }
    }
  };


export default App;
/*          saveEdit={saveEdit} saveAllEdits={saveAllEdits} />)

<div id="app" className="d-flex flex-column h-100">

*/
