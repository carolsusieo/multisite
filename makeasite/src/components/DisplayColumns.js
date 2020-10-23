import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'
import BBHome from "../barebones/components/BBHome";
import {Button} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
    this.bulletStyle = {
      display:"inline-block",

    };
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setBackgroundImage = this.setBackgroundImage.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.getArticleStyle = this.getArticleStyle.bind(this);

};

getArticleStyle = () => {
  return this.props.aStyle(this.props.name);
}
forceUpdateHandler = () => {
  this.forceUpdate();
}

deleteArticle = ()=> {
  this.props.deleteArticle(this.props.name);
};

setBackgroundImage = (name,current)=> {
  this.props.setBackgroundImage(name,current);
//console.log("forcing Update")
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
  else   return <div/>;
*/
  if(this.props.editState)
    return(<BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>)
  else
    return (<div/>)

}


  // want the columns to look like this:

  //  record header
  //        record main . record submain
  //        record text........................................................
  //        ...................................................................
  //        . record bullet........
  //        . record bullet........
  render() {
    var i = 1;
      return (
        <article className={css(this.props.styles.articleContainer)}>
          <a id={this.props.name} name={this.props.name}>
            <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
         </a>

         {this.renderPre()}

          <div className="container" style={this.getArticleStyle()}>
            {this.props.data.map(record =>(
              <div key={i++}>
               <div className="row justify-content-start" key={i++}>
                <div className="col-3">
                  <h3>{record.header}</h3>
                  <p>{record.main}<span> • </span> <em className="date">
                     {record.submain}</em></p>
                </div><div className="col-7"><p>{record.text}</p></div>
               </div>
               <div className = "row">
                  <div className="col-3"><p/></div><div className="col-7">
                   <ul className="text-left" style={this.bulletStyle}>
                    {record.subtext.map(subdesc =>(<li key={i++}>{subdesc}</li>
                    ))}
                   </ul>
                  </div>
               </div><div className="row"><p/></div>
              </div>
            ))}
          </div>


          {this.renderPost()}
        </article>
      )
    }
  }
/*
<div className="container" style={this.getArticleStyle()}>
  {this.props.data.map(record =>(
    <div key={i++}>
     <div className="row justify-content-start" key={i++}>
      <div className="col-3">
        <h3>{record.header}</h3>
        <p>{record.main}<span> • </span> <em className="date">
           {record.submain}</em></p>
      </div><div className="col-7"><p>{record.text}</p></div>
     </div>
     <div className = "row">
        <div className="col-3"><p/></div><div className="col-7">
         <ul className="text-left" style={this.bulletStyle}>
          {record.subtext.map(subdesc =>(<li key={i++}>{subdesc}</li>
          ))}
         </ul>
        </div>
     </div><div className="row"><p/></div>
    </div>
  ))}
</div>
*/
