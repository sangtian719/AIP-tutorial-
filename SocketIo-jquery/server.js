const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', (req, res) =>
    {
        res.sendFile(__dirname + '/index.html')
    });

//
// io.on('connection', (socket)=>
//     {
//         console.log('User connected');
//
//         socket.on('chat message', (msg)=>
//         {
//             console.log('message:' + msg);
//         });
//         // socket.on('disconnect', ()=>
//         // {
//         //     console.log('User disconnected');
//         // });
//     });



io.on('connection', (socket)=>{
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
        console.log(msg);
    });
});

http.listen(3000, ()=>
{
   console.log('Listen on port 3000')
});
