import React,  {useContext,useState} from 'react';
import api from "../api"

export const DataContext = React.createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({
  children

}) => {
  const [editRecord, setEditRecord] = useState(0);


  const addArticleToRecord = (currConfig) =>
  {
    return currConfig;
  }

  const deleteArticleFromRecord = (currConfig) =>
  {
    return currConfig;

  }

const addItemToArticle = (articleName,values,currConfig) => {
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
        return currConfig
      }
      else{
        currConfig.articles[i].items = [values];
        return currConfig
      }
      break;
    }
  }
}

const deleteItemFromArticle = (currArticle, currItem, currConfig) => {

}

  const saveEdit = (orgwebsite,jsonIn,edited) => {
    // store the record for this...apiforconfig
    var payload = jsonIn;
    var newwebsite;
    delete payload._id
    if(payload.editMode == undefined)
      payload = { ...payload, editMode: true};
    else if(payload.editMode === false){
      payload.editMode = true;
    }
    if( !(jsonIn.website.includes('hold'))) {
      payload.website = orgwebsite  + "hold";
      newwebsite = orgwebsite + "hold";
    }
    else
     newwebsite = jsonIn.website;

    console.log("website", payload.website, orgwebsite,newwebsite)

    // strangely, it writes over the record that was there,
    // but gives it the new name ending in hold
    var where = "/api/config/config?website=" + newwebsite;
    var input = {where,payload};

    api.configUpdate(input)
    //.then(res =>  res.json())
     .then((configdata) => {
       setEditRecord(configdata.data.id);
       console.log(configdata.data.id);
       // unfortunately, it was waiting around to send this data
       // back to the app, so, this recnum isn't returned
       // when I try to use await it says it's not async
       })
     .catch((error) => {
       console.log(error)
      })
   };

   const saveAllEdits = (orgwebsite,jsonIn,edited) => {

     // do we want to do an update of the data.....
     // update the original record.
     // delete the original record, and rename the website of the one
     // that ends in hold - remove the name hold at the end
     var newWeb = orgwebsite.replace(/hold/g, "");
     console.log(orgwebsite)
     jsonIn.website = newWeb;
     if((edited != undefined && edited != 0) || editRecord != 0){

       api.configDelete("/api/config/config?website=" + newWeb)
      //.then(res =>  res.json())
      .then((configdata) => {
        console.log("deleted",configdata);

        jsonIn.website = newWeb;
       // make sure the website name is correct now.
        var where = "/api/config/config?_id=" + editRecord;
        console.log("old name ", where)
        const input = {where,jsonIn};
        api.configUpdate(input)
        .then((changedat) => {
          setEditRecord(0);

        })
        .catch((error) => {
          console.log(error)
          // try and change it using the website className
          where = "/api/config/config?website=" + newWeb + 'hold';
          console.log("again name ", where)
          const input = {where,jsonIn};
          api.configUpdate(input)
          .then((changedat) => {
            setEditRecord(0);

          })
          .catch((error) => {
            console.log(error + "I quit")
          })

        })

      })
      .catch((error) => {
        console.log(error)
      });
    }
    else{
       console.log("record not there ", editRecord);
    }
  };


return (
  <DataContext.Provider
    value={{
      saveEdit,
      saveAllEdits,
      editRecord
    }}
  >
    {children}
  </DataContext.Provider>
);

}
