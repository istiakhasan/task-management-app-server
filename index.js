const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port=process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send("Started app successfully")
})





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l0msl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run=async()=>{
   try{
   await client.connect();
   const todoCollections=client.db('todo').collection('todolist');
    
   app.post('/todo',async(req,res)=>{
        const todoContent=req.body 
        const result=await  todoCollections.insertOne(todoContent)
       
        res.send(result)
   })
   app.get('/todo',async(req,res)=>{
       const query={}
       const cursor=todoCollections.find(query)
       const todo=await cursor.toArray()
       res.send(todo)
      
   })
   app.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id,"put")
    const filter={_id:ObjectId(id)}
    const updateDoc={
        $set:{status:'completed'}
    }
    const result=await todoCollections.updateOne(filter,updateDoc)
    res.send(result)

  })
  app.patch('/todo/:id',async(req,res)=>{
    const id=req.params.id 
    const updatedoc=req.body.updateContent 
    const filter={_id:ObjectId(id)}
    const updateDoc={
        $set:{todoDescription:updatedoc}
    }
    const result=await todoCollections.updateOne(filter,updateDoc)
    res.send(result)
  })

  app.delete('/todo/:id',async(req,res)=>{
   const id=req.params.id 
   const query={_id:ObjectId(id)}
   const result=await todoCollections.deleteOne(query)
   res.send(result)
  })

   }finally{}
}

run().catch(console.dir)




app.listen(port,()=>console.log("Run todo app"))


