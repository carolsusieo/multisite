const mongoose = require('mongoose')

connectToDB = (env) => {

  var trys = 3;

// need to wait and allow the database app to churn up in docker

  const options = {
    user: env.REACT_APP_DB_USER,
    pass: env.REACT_APP_DB_PASS,
    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    reconnectTries: 3,
//    reconnectInterval:500,
    poolSize:10,
  };
  // connection string needs to depend on where it's deployed doesn't it?
  // assumption is this server is running on the localhost not on browser
  const mongooseConnectionString = process.env.REACT_APP_MONGOOSE_CONNECTION;

  var mongoDB = mongoose.connection;

  function connectIt(){
  mongoose.connect(mongooseConnectionString, options).then(
    () => {console.log("Mongoose connected")},
    err => {console.log("Mongoose connect error ", err)}
  )
  }

  connectIt();

  mongoose.connection.on('error',function(err){
    console.log("Mongoose error default connection has occurred " + err );

    // try again with 0.0.0.0?

  });

 mongoose.connection.on('disconnected', function(){
    console.log("Mongosse default connection is disconnected");
    trys--;
    if(trys > 0)
    // want to try again in a bit
      setTimeout(connectIt,1000);
  });

  mongoose.connection.on('connected',function(){
    console.log("Mongoose default connection is open");
  });

}
module.exports = {
    connectToDB
}
