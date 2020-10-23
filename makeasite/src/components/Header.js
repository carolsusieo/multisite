import React, { Component } from 'react';
import dotenv from 'dotenv';
import BBHome from '../barebones/components/BBHome';
import ArticleItem from '../components/ArticleItem';
import {Button} from 'reactstrap';
import styles from '../res/header.module.css';
import { css } from 'aphrodite';

// header page can have lots of specialized styling...
export default class Header extends Component {

  constructor(props) {
      super(props)
      this.state = {showItemPopup: false};
      this.setBackgroundImage = this.setBackgroundImage.bind(this);
      this.deleteArticle = this.deleteArticle.bind(this);
      this.setBackgroundImage = this.setBackgroundImage.bind(this);
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.getArticleStyle = this.getArticleStyle.bind(this);
      this.addItemPopUp = this.addItemPopUp.bind(this);
  };

  addItemPopUp = (e) => {
    console.log("selected to add item", e)
    this.setState({showItemPopup: true});
    this.forceUpdateHandler();
  }


getArticleStyle = () => {
 return this.props.aStyle(this.props.name);
}

forceUpdateHandler = () => {
 this.forceUpdate();
}

deleteArticle = ()=> {
// console.log("delete Article" + this.props.name);
 this.props.deleteArticle(this.props.name);
};

setBackgroundImage = (name,current)=> {
 this.props.setBackgroundImage(name,current);
// console.log("forcing Update")
 // props are read only
 this.forceUpdateHandler();
};

renderPre = (e) => {
  if(this.props.editState === true){
    return(
    <Button
      id="qsDeleteArticle"
      color="primary"
      block
      onClick={() => this.deleteArticle()}
    >
    Delete Section
    </Button>
    );
  }
  else return (<div/>)
}

renderPost = (e) => {
/*
  if(this.props.showItemPopup === true){

      return(<EditItemPopUp styles={this.props.styles}
        text='Add New Item'
        articleName = {this.props.name}
        addItem={this.addItem}
        onExit={this.onExit}
        />);
  }
  else {
    return <div/>;
  }
*/
  if(this.props.editState)
    return(<BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>)
  else {
    return <div/>;
  }
}

// what should the real difference be for a header page?
// as opposed to the social icons, etc.
// if should be formatting!  It needs to look really good
// and have specialized formatting.
// for a multi page applicaton, it is probably the interstitial page.
// or, it's a page that provides information about the company, etc,
// then allows a user to login, to get to the application guts
/*
<div id={this.props.name} name={this.props.name}
  className={css(this.props.styles.articleContainer.jump)} style={this.getArticleStyle()}
*/
render() {
  const social = this.props.include.social;
  const landing = this.props.landing;
  const contact = this.props.include.contact;
  var texthere = '';
  var ref = '';
  var buttonLabel = '';
  var title = '';
  var mission = '';
  var  backimg = '';
  var i= 1;
    texthere = this.props.text;
    ref = this.props.ref;
    buttonLabel =this.props.buttonLabel;
    title = this.props.title;
    mission = this.props.mission;
    backimg = this.props.backimg;
  //  console.log(this.props.classList)
      return(

        <article className={css(this.props.styles.articleContainer)}>
          <a id={this.props.name} name={this.props.name}>
            <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
         </a>
         {this.renderPre()}


                {this.props.items && (
                this.props.items.map(item => {
                  return(
                 <ArticleItem key={i++}
                 editState={this.props.editState}
                 item={item}
                 deleteItem={this.deleteItem}
                 editItem={this.editItem}
                 include={this.props.include}
                  addItem={this.addItem}
                  styles = {this.props.styles}/>
                  )
                }))}



              {this.renderPost()}
            </article>
      );
    return ( <p>Error</p>)
  }
}

/*
<div className="header" id="home">
<div className="banner">
*/
