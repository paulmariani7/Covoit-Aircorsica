const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const url =  "mongodb://database:27017/chat";
const connect  =  mongoose.connect(url, { useNewUrlParser: true  })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
module.exports  =  connect;
