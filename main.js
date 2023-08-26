const http = require("http");
const fs = require("fs");

const todos = [];

const listALLtodos = (req,res) => {
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(todos));

};
const addNewListIems = (req,res) =>{

    const body = [];
    req.on('data',(chunk)=>{
        body.push(chunk);
    }).on('end',() =>{
        const newitem = JSON.parse(Buffer.concat(body).toString());
        todos.push(newitem);
        res.end(JSON.stringify(newitem));
    });

};
const updateTodoItem = (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const itemIndex = todos.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        todos[itemIndex] = { ...todos[itemIndex], ...updatedItem };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todos[itemIndex]));
    } else {
        res.statusCode = 404;
        res.end("Item not found");
    }
};
const removeTodoItem = (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = todos.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        todos.splice(itemIndex, 1);
        res.statusCode = 204; 
        res.end();
    } else {
        res.statusCode = 404;
        res.end("Item not found");
    }
};


const reqlistener = (req , res) =>{
   const method = req.method;
   const route = req.url;
  // console.log(method,route);
   if (method === "GET" && route === "/"){
    listALLtodos(req,res);
   } else if(method === "POST" && route === "/"){
    addNewListIems(req,res);
   }else if (method === "PUT" && /^\/\d+$/.test(route)) {
    updateTodoItem(req, res);
   }else if (method === "DELETE" && /^\/\d+$/.test(route)) {
    removeTodoItem(req, res);
}
   else{
    res.end("true"); 
   }

};
const server = http.createServer(reqlistener);


server.listen(3000,"localhost",()=> {
    console.log("http://localhost:3000");
});

