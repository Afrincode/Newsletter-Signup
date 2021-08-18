const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})




app.post("/",function(req,res){
  var fname=req.body.firstname;
  var lname=req.body.lastname;
  var email=req.body.email;



  const data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
    ]
  }

  const jsonData=JSON.stringify(data);

  const url="https://us5.api.mailchimp.com/3.0/lists/507e6ec034"

  const options={
    method:"POST",
  //  auth:"Afrin:3f1f563fa96a8a6145f79ef822506605-us5"
  }

   const request= https.request(url,options,function(response)
   {

    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }
    else {
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

   })

  request.write(jsonData);
  request.end();

})


app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(3000,function(){
  console.log("Server is running on port 3000");
})

// API key mailchimp
// 3f1f563fa96a8a6145f79ef822506605-us5

//https://us5.api.mailchimp.com/3.0/lists/507e6ec034

//list id
//  507e6ec034
