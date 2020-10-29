import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'
import BBHome from "../barebones/components/BBHome";
import {Button,Container,Row,Col} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import Article from "./Article";


export default class DisplayColumns extends Article {
  constructor(props){
    super(props);
    this.state = { bulletStyle: {display:"inline-block"},
                  styles: props.styles,
                  currentStyle: props.article.style,
                  backimg: props.article.backimg};

};



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

  //    console.log(col, fields)

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
      {this.props.article.rows && this.props.article.rows.map(row => {
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

        return(subfieldnum > 1 && this.props.article.rows && this.props.article.rows.map(row => {
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
        <a id={this.props.article.name} name={this.props.article.name}>
          <h2 className={css(this.props.styles.anchor)}>{this.props.article.header}</h2>
       </a>

       {this.props.editState && (this.renderPre())}

         <Container>
         {this.props.article.data && this.props.article.data.map(rec =>{
            return( this.dataSet(rec)
            )
         })}
         </Container>

    </article>
    )

  }
}
