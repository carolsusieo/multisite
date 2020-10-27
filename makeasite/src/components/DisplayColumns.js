import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'
import BBHome from "../barebones/components/BBHome";
import {Button,Container,Row,Col} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';


export default class DisplayColumns extends Component {
  constructor(props){
    super(props);
    this.state = { bulletStyle: {display:"inline-block"}};

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
    return(<BBHome setBackgroundImage={this.setBackgroundImage} name={this.props.name}/>)

}


  // want the columns to look like this:

  //  record header
  //        record main . record submain
  //        record text........................................................
  //        ...................................................................
  //        . record bullet........
  //        . record bullet........




  dataSet = (rec) => {
    var rownum = 0;


    function rCol(col,fields,subfields) {

      console.log(col, fields)

      function getField(num,fields) {
        if(fields.length > num){
          return fields[num]
        }
        else {
          return null;
        }
      }

      if(col.subfields && subfields){
        return(

          <Col xs={col.xs} style={col.style}><li> {subfields[0]}</li></Col>

        )
      }
      else if(getField(col.field,fields)){
        return <Col xs={col.xs} style={col.style}>{getField(col.field,fields)}</Col>

      }

    }
    function rSubCol(col,subfields){
      if(col.subfields){
      return <Col xs={col.xs} style={col.style}><li> {subfields}</li></Col>
      }
      else{
        return <Col xs={col.xs}/>
      }
    }

    function addLineSpace(rownum){
      if(rownum > 1)
        return <p> </p>
    }

    if(rec.fields){
      var subfieldnum = 0;
    return(
      <div>
      {this.props.rows && this.props.rows.map(row => {
        rownum++
          return(<Row>
         {row.columns.map(column => {
           return rCol(column,rec.fields,rec.subfields)
         })}
         </Row>
        )
      })}

      {rec.subfields && rec.subfields.length > 1 && (
        rec.subfields.map(subfield =>{
        subfieldnum++

        return(subfieldnum > 1 && this.props.rows && this.props.rows.map(row => {
          rownum++
            return(<Row>
           {row.columns.map(column => {
             return rSubCol(column,subfield,rownum)
           })}
           </Row>
          )
        })
        )
      })
      )}
      {addLineSpace(rownum)}
      </div>
    )}
 }

  render() {
    //var row;
    //var fields;
    return (
      <article className={css(this.props.styles.articleContainer)}>
        <a id={this.props.name} name={this.props.name}>
          <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
       </a>

       {this.props.editState && (this.renderPre())}

         <Container>
         {this.props.data && this.props.data.map(rec =>{
            return( this.dataSet(rec)
            )
         })}
         </Container>

    </article>
    )

  }
}

/*

{this.props.data && this.props.data.map(rec =>{
   return(
     this.props.rows && this.props.rows.map(row => {
      return(<Row>
       {row.columns.map(column => {
        return this.rCol(column,rec.fields)
       })}
       </Row>
      )
     })
   )
})}





  render() {
    var i = 1;
    console.log(this.props.data);
      return (
        <article className={css(this.props.styles.articleContainer)}>
          <a id={this.props.name} name={this.props.name}>
            <h2 className={css(this.props.styles.anchor)}>{this.props.header}</h2>
         </a>

         {this.props.editState && (this.renderPre())}

          <div  style={this.getArticleStyle()}>
            {this.props.data.map(record =>(
              <div key={i++}>
               <div className="row justify-content-start" key={i++}>
                <div className="col-3">
                  <h3>{record.r1c1}</h3>
                  <p>{record.r2c1}<span> • </span> <em className="date">
                     {record.r3c1}</em></p>
                </div><div className="col-7"><p>{record.r1c2}</p></div>
               </div>
               <div className = "row">
                  <div className="col-3"><p/></div><div className="col-7">
                   <ul className="text-left">
                    {record.r2c2.map(subdesc =>(<li key={i++}>{subdesc}</li>
                    ))}
                   </ul>
                  </div>
               </div><div className="row"><p/></div>
              </div>
            ))}
          </div>


          {this.props.editState && (this.renderPost())}
        </article>
      )
    }
  }
*/
