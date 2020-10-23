import api from '../api'
import React, { useState, useEffect } from 'react';
import { css } from 'aphrodite';
import {Button} from 'reactstrap';
import BBHome from "../barebones/components/BBHome";

export default function DisplayDBData(input){
     /* input:
     key,styles,name,header,api,classList,
        deleteArticle ,editState ,setBackgroundImage ,  aStyle
      */
  const [apiData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 var i = 0;

  useEffect(() => {
    //console.log("api",input.api);
    async function getData() { api.displayOut(input.api)
      //.then(res =>  res.json())
       .then((apidata) => {
         //console.log("got data for ", input.api, apidata.data.data)
         setData(apidata.data.data);
         setIsLoading(false);
       })
       .catch(console.log);
     }
     getData();
  }, []);


  const renderPre = (input) => {
    if(input.editState === true){
      return(
      <Button
        id="qsDeleteArticle"
        color="primary"
        block
        onClick={() => input.deleteArticle()}
      >
      Delete Section
      </Button>
      );
    }
    else return (<div/>)
  }

  const renderPost = (input) => {
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
    if(input.editState)
      return(<BBHome setBackgroundImage={input.setBackgroundImage} name={input.name}/>)
    else {
      return (<div/>)
    }
  }




     if(!isLoading)
      return(
        <article className={css(input.styles.articleContainer)}>
          <a id={input.name} name={input.name}>
            <h2 className={css(input.styles.anchor)}>{input.header}</h2>
         </a>
         {renderPre(input)}
         <div className="row">
            <div className="three columns header-col">
              {apiData.map(item => (
                <p key={i++}> {JSON.stringify(item)} </p>
              ))}
            </div>
         </div>
         {renderPost(input)}
        </article>
      )
      else {
        return(<p>Loading</p>)
      }
}

/*

            <div className="nine columns main-col">
            {dbData.map(record =>(
              <div className="row item">
                <div className="twelve columns">
                  <h3>{record.header}</h3>
                  {record.map(field =>(
                    <p>{record.field}</p>
                  ))}
                </div>
              </div>
            ))}
            </div>
*/
