const express=require('express')
const app=express()
const port=process.env.PORT || 4000





app.get('/',(req,res)=>{
    res.send({name:"korim",roll:"220"})
})



app.listen(port,()=>console.log("Run todo app"))


