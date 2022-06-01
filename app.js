const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.get("/", function(req, res){
  res.sendFile(String(__dirname)+"/signup.html")
})
app.post("/", function(req, res){
  console.log(req.body.fname);
  console.log(req.body.lastName);
  console.log(req.body.email);
  const data = {
    members:[
      {

        status: "subscribed",
        merge_fields:{
          FNAME: req.body.fname,
          LNAME: req.body.lastName,
          email_adress: req.body.email
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/0c70318687" ;
  const options = {
    method:"POST",
    auth:"blazerr918:a3a954d5f9596de863f1518e0d3d70d7-us17"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname+"/success.html")
    };
    response.on("data", function(data){
      res.sendFile(__dirname+"/failure.html")
    })

  })
  request.write(jsonData);
  request.end();
})
app.post("/failure", function(req, res){
  res.redirect("/");
})




app.listen(process.env.PORT, function(){
  console.log("Server is running on port 3000")
})
//c958b189c27b7203d69c8c816d56c820-us17c958b189c27b7203d69c8c816d56c820-us17
//0c70318687
