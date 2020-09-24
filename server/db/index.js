const mongoose = require('mongoose')

connectToDB = (env) => {

  if( typeof connectToDB.connected == 'undefined' ) {
       connectToDB.connected = false;
       connectToDB.counter = 3;

   }
   if(!connectToDB.connected){


// need to wait and allow the database app to churn up in docker

  const options = {
    user: process.env.REACT_APP_DB_USER,
    pass: process.env.REACT_APP_DB_PASS,
    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    reconnectTries: 3,
//    reconnectInterval:500,
//    poolSize:10,
  };
  // connection string needs to depend on where it's deployed doesn't it?
  // assumption is this server is running on the localhost not on browser
  const mongooseConnectionString = process.env.REACT_APP_MONGOOSE_CONNECTION;

  console.log(mongooseConnectionString, options);
  function connectIt(){
  mongoose.connect(mongooseConnectionString, options).then(
    () => {console.log("Mongoose connected")},
    err => {console.log("Mongoose connect error ", err)})
  }

  connectIt();

  mongoose.connection.on('error',function(err){
    console.log("Mongoose error default connection has occurred " + err );
    connectToDB.counter--;
    if(connectToDB.counter > 0)
    // want to try again in a bit
      setTimeout(connectIt,1000);

  });

 mongoose.connection.on('disconnected', function(){
    console.log("Mongosse default connection is disconnected");

    connectToDB.counter--;
    if(connectToDB.counter > 0)
    // want to try again in a bit
      setTimeout(connectIt,1000);

  });

  mongoose.connection.on('connected',function(){
    console.log("Mongoose default connection is open");
    connectToDB.connected = true;
  });
}
}


const db = mongoose.connection
module.exports = {
    connectToDB
//db
}
