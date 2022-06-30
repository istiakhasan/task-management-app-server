const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send("Started app successfully")
})


//user:todoadmin
//passwsord:ULrZLvHNeWv4XX71



const uri = "mongodb+srv://todoadmin:ULrZLvHNeWv4XX71@cluster0.l0msl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run=async()=>{
   try{
   await client.connect();
   const todoCollections=client.db('todo').collection('todolist');
    
   app.post('/addtodo',async(req,res)=>{
        const todoContent=req.body 
        const result=await  todoCollections.insertOne(todoContent)
        console.log(result)
        res.send(result)
   })
 

   }finally{}
}

run().catch(console.dir)




app.listen(port,()=>console.log("Run todo app"))


