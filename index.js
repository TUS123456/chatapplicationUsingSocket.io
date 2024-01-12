const express=require('express');
const app=express();
//handling server
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');


//handling ejs
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.resolve('views'));

app.get('/',(req,resp)=>{
    resp.render('home');
})


//handle Socket
const io=new Server(server,()=>{
    console.log('io Created')
});
io.on('connection',(socket)=>{
    console.log('New Connection id',socket.id);
    socket.on('received-message',(message)=>{
    io.emit('send-message',message);
    })
})


PORT=20001;
server.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})