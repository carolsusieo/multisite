import api from '../api'
import React, { useState, useEffect } from 'react';
import { css } from 'aphrodite';
import {Button} from 'reactstrap';

export default function DisplayDBData(input){
     /* input:
     key,styles,name,header,api,classList,
        deleteArticle ,editState ,
      */
  const [apiData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 var i = 0;

  useEffect(() => {
    //console.log("api",input.api);
    async function getData() { api.displayOut(input.article.api)
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


  const renderPre = (deleteArticle) => {
      return(
      <Button
        id="qsDeleteArticle"
        color="primary"
        block
        onClick={() => deleteArticle()}
      >
      Delete Section
      </Button>
      );
  }

     if(!isLoading){
      return(
        <article className={css(input.styles.articleContainer)}>
          <a id={input.article.name} name={input.article.name}>
          </a>
         {input.editState && (renderPre(input.deleteArticle))}
          <div className="row">
            <div className="three columns header-col">
              {apiData.map(item => (
                <p key={i++}> {JSON.stringify(item)} </p>
              ))}
            </div>
          </div>
        </article>
      )
    }
    else {
        return(<p>Loading</p>)
    }
}
