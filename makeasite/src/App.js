import React, { Component ,useState, useEffect } from 'react';
import './App.scss';
import { Router, Route, Switch } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from "./src_auth0/components/Loading";
import NavBar from "./src_auth0/components/NavBar";
import Profile from "./src_auth0/views/Profile";
import PrivateRoute from "./src_auth0/components/PrivateRoute";
import { useAuth0 } from "./src_auth0/react-auth0-spa";
import history from "./src_auth0/utils/history";

import DisplayColumns from './components/DisplayColumns'
import DisplayDBData from './components/DisplayDBData'
import Footer from './components/Footer'
import FinalForm from './components/FinalForm'
import Article from './components/Article'
import AddArticlePopUp from "./components/AddArticlePopUp";

import api from "./api";
import { useData } from "./ctrl/DataController"
// better from db
import {initConfig} from "./res/myconfig";


// Edit state - if in Edit mode the Navigation Menu is a different color...
// todos:
// move items around in a section - mouse down and pull
// change the order of sections
// buttons...  what do buttons accomplish?
// background images, need to be able to add links. - or, add pictures
// to the app (upload)

// todo - need a gallery..... - probably work well as a carddeck -
// and that is already possible - need to be able to upload pictures.
// be able to select one thing - not overall CardDeck

class App2 extends Component {

       constructor(props) {
             super(props);
             this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

             this.addArticle = this.addArticle.bind(this);
             this.addArticlePop = this.addArticlePop.bind(this);
             this.deleteArticle = this.deleteArticle.bind(this);

             this.navChoices = this.navChoices.bind(this);
             this.toggleEditState = this.toggleEditState.bind(this);

               this.state = {
                        showArticlePopUp: false,
                        currentArticle: '',
                        appConfig: props.initConfig,
                        editState: false,
                        editStateLabel: "Edit",
                        edited: 0,
                        itemPopup: false
                      };
         };

         // article updates need to be pushed up this way
         // until we do the updates in a database

         forceUpdateHandler = (articleName,article) => {

           if(articleName){
             var i = this.whichArticle(articleName);
             let currConfig = Object.assign({}, this.state.appConfig);
             currConfig.articles[i] = article;
             this.setState({appConfig: currConfig, edited: 1});
           }
           this.props.saveEdit(this.props.initConfig.website,this.state.appConfig);
            this.forceUpdate();
         }



     whichArticle = (name) => {
         for(var i = 0; i < this.state.appConfig.articles.length;i++){
           if(this.state.appConfig.articles[i].name === name){
             return i;
           }
         }
         return -1;
       }


       // best way to deal with item popup...
       // only want to show it once...
       // would like to show a toast otherwise
       // that goes away
       manageItemPopup = (turnOn) => {
         if(turnOn === true){

           if(this.state.itemPopup === true){
             toast("Exit currently open item popup");
             return false;
           }
           else if(this.state.editState === true){
             this.setState({itemPopup: true});
             return true;
           }
           else {
             return false;
           }
         }
         else {
           if(this.state.itemPopup === true){
             this.setState({itemPopup: false})
             return true;
           }
           else
            return true;
          }
       }

       // article updates need to be pushed up this way
       // until we do the updates in a database

/* start manage articles*/

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
                   showArticlePopUp: false
              });
        }

      deleteArticle = (articleName)=> {

          var currConfig = this.state.appConfig;
          var i = this.whichArticle(articleName);
          if(i != -1){
            currConfig.articles.splice(i,1);
            this.setState({appConfig:currConfig});
            this.forceUpdateHandler();

          }
       };
   /* end manage articles*/

   /* start manage editing*/
         addArticlePop = () => {
           this.setState({showArticlePopUp: !this.state.showArticlePopUp})
         }
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

/* end manage edit */

// extra stuff part of the login menu - better name would be additional
      additionalNavButtons = () => {
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
      var appStyle = StyleSheet.create(this.state.appConfig.appStyle);

     return (
      <Router history={history}>
      <Helmet>
        <title>{this.state.appConfig.website}</title>
        <meta name="description" content={this.state.appConfig.description} />
      </Helmet>
        <div id="app" className={css(appStyle.mainWrapper)}>
          <ToastContainer />
          <NavBar styles={appStyle} articles ={this.state.appConfig.articles}
            navChoices={this.navChoices}
            additionalNavButtons = {this.additionalNavButtons}/>
            <Switch>
              <PrivateRoute path="/Profile" component={Profile} />
            </Switch>
            {this.state.appConfig.articles.map(article =>{
              if (!article.loginDisplay || article.loginDisplay === 'false' || this.props.isAuthenticated){
              if(article.type == 'subcolumns'){
                  return(<DisplayColumns
                    article={article}
                    styles={appStyle}
                    editState = {this.state.editState}
                    include = {this.state.appConfig.include}
                    deleteArticle = {this.deleteArticle}
                    manageItemPopup = {this.manageItemPopup}
                    forceUpdateHandler = {this.forceUpdateHandler}
                    />)
              }
              else if(article.type == 'final-form'){
                return(<FinalForm key = {article.name}
                  styles={appStyle}
                  article={article}
                  editState = {this.state.editState}
                  deleteArticle = {this.deleteArticle}
                  manageItemPopup = {this.manageItemPopup}
                  forceUpdateHandler = {this.forceUpdateHandler}
               />)
              }
              else if(article.type == 'dbdata'){
                return(<DisplayDBData key = {article.name}
                  styles={appStyle}
                  article={article}
                  editState = {this.state.editState}
                  deleteArticle = {this.deleteArticle}
                  manageItemPopup = {this.manageItemPopup}
                  forceUpdateHandler = {this.forceUpdateHandler}
                  />
                )
              }

              else {
                return(<Article key = {article.name}
                  styles={appStyle}
                  article={article}
                  include={this.state.appConfig.include}
                  editState = {this.state.editState}
                  deleteArticle={this.deleteArticle}
                  manageItemPopup = {this.manageItemPopup}
                  forceUpdateHandler = {this.forceUpdateHandler}
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
