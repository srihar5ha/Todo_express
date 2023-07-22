const express=require("express");
const bodyParser=require('body-parser');
const app= express();
const port = 3000;
const fs=require("fs");

app.use(bodyParser.json());

//let todos=[];




app.get('/todos',(req,res)=>{
    fs.readFile('./todos.json',(err,data)=>{
      if(err) throw err;
      res.send(JSON.parse(data));
    })
 //   res.json(todos);
})

app.get('/todos/:id',(req,res)=>{
  fs.readFile('./todos.json',(err,data)=>{
    if(err) throw err;
    const todos=JSON.parse(data);
    const todo=todos.find(t=>t.id==parseInt(req.params.id));
    console.log("inside get by id ",todo);
    res.send(todo);
  })
  
  
})

app.post('/todos', (req, res) => {
    console.log('got a post req ');
    //console.log(req.body);
    const index=Math.floor(Math.random() * 10000);
    const newTodo={
        id: index,
        title: req.body.title,
        description: req.body.description
        
    }
    fs.readFile('./todos.json',(err,data)=>{
      if(err) throw err
      const todos=JSON.parse(data);
      todos.push(newTodo);
      fs.writeFile('./todos.json',JSON.stringify(todos),(err)=>{
        if(err) throw err;
      });

    })
    res.status(201).send("added");
    

})

  app.put('/todos/:id', (req, res) => {
    console.log('Got a PUT request ')
    fs.readFile('./todos.json',(err,data)=>{
      if(err) throw err;
      const todos=JSON.parse(data);
      const todoIndex=todos.findIndex(t=>t.id==parseInt(req.params.id));
    if(todoIndex == -1){
      res.status(404).send();
    }
    todos[todoIndex].title=req.body.title;
    todos[todoIndex].description=req.body.description;
    fs.writeFile('./todos.json',JSON.stringify(todos),(err)=>{
      if(err) throw err;
    
      res.json(todos[todoIndex]);
    });
    
    })

 })

  app.delete('/todos/:id', (req, res) => {
    fs.readFile('./todos.json',(err,data)=>{
      if(err) throw err;
      const todos=JSON.parse(data);
      const todoIndex=todos.findIndex(t=>t.id==parseInt(req.params.id));
    if(todoIndex == -1){
      res.status(404).send();
    }
    console.log("delete request processed, id:",todos[todoIndex]);
    todos.splice(todoIndex,1);
    fs.writeFile('./todos.json',JSON.stringify(todos),(err)=>{
      if(err) throw err;
    });
    res.send("deleted successfully");
  })
    })
    


app.listen(port,()=>{
    console.log(`listening on ${port}`);
})


app.use((req, res, next) => {
  console.log("invalid req, check end points");
    res.status(404).send();
  });
  
  module.exports = app;