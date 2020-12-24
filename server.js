const express= require("express") ;
const session = require("express-session") ; 
const{db, record}=require("./db/db") 
const app= express() ; 


app.use(session({
    resave:false , 
    saveUninitialized:true , 
    secret:"anjhhJBdnciHIODJKQWdjIJidu" 
}))
app.use (express.urlencoded({extended:true})) ; 
app.use (express.json()) ; 
app.set("view engine" , "hbs") ; 


app.get("/" , (req, res)=>{
    res.render("signup.hbs") ; 
})
app.get("/login" , (req, res)=>{
    res.render("login.hbs")  ; 
})

app.post("/login" ,async  (req , res)=>{

    const  user =  await record.findOne({where:{Email :req.body.email}})  ; 
    if(user){
        if(user.Password==req.body.password){
            req.session.userId= user.id 
           return res.render("profile.hbs") ; 
        }
        else {

          res.render("login.hbs" , {
              Error:"Invalid Email or Passowrd " 
          })

        }
    }
    
})
app.get("/profile" , (req, res)=>{
    if(!req.session.userId){
        res.redirect("/login") ; 
    }
    else {
        res.render("profile.hbs") ; 
    }
})
app.post("/signup" , async (req, res)=>{
    console.log(req.body) ; 
  await record.create({
      Username:req.body.username , 
      Email:req.body.email , 
      Password:req.body.password
  })

    res.render("profile.hbs") ; 
})
   db.sync()

   .then(()=>{
       console.log("hello world") ; 
    app.listen(6565 , ()=>{
        console.log("server started on http://localhost:6565") ; 
   })

}).catch((err)=>{
    console.log(err) ; 
})
