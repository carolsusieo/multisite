import api from '../api'
import React, { useState, useEffect } from 'react';

export default function DisplayDBData(input) {

  const [apiData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log("api",input.api);
    async function getData() { api.displayOut(input.api)
      //.then(res =>  res.json())
       .then((apidata) => {
         console.log("got data for ", input.api, apidata.data.data)
         setData(apidata.data.data);
         setIsLoading(false);
       })
       .catch(console.log);
     }
     getData();
  }, []);

     if(!isLoading)
      return(
        <section>
        <div className="row">
            <div className="three columns header-col">
              <h1><span>{input.header}</span></h1>
              {apiData.map(item => (
                <p> {JSON.stringify(item)} </p>
              ))}
            </div>

          </div>
          </section>
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
