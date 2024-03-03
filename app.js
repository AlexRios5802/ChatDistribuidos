//crear constante de express
const express = require("express");

//objeto de la aplicación
const app = express();

//establecer el path para las rutas
const path = require("path");

//crear constante para el http
const http = require("http");

//crear el servidor
const server = http.createServer(app);

//configurar el socket.oi
const {Server} = require("socket.io");

//crear instancia de Server
const io = new Server(server);


//establecer la ruta del index
app.get("/", (req, res)=> {
    //res.send("<h1>Holaaa<h/<h1>");
    //pasar un archivo
    res.sendFile(path.join(__dirname, 'cliente', 'index.html'));

});

// archivo css
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'cliente')));

//escuchar eventos de conexion
io.on("connection", (socket) =>{
    socket.on("set_clientes", (nombre) =>{
        console.log("Usuario conectado", nombre);
    });

    //eventos de mensaje
    socket.on("mensaje", (data)=>{
        console.log("Mensaje reibido:", data.mensaje);
        io.emit("mensaje", { mensaje: data.mensaje, nombre: data.nombre });
    });
    
    /*socket.on("disconnect", () =>{
        console.log("Usuario desconectado");
    });*/


});


//escuchar puerto
server.listen(3000,"169.254.248.87",()=>{
    console.log("Servidor funcionando en http://169.254.248.87:3000");
});

//manejar errores app.use((err, req, res, next) => {
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`¡Algo salió mal! ${err.message}`);
});


      
