
//establecer conexión con el socket.io
let socket = io();
            
//establecer variable para el nombre del usuario
let set_clientes;

//solicitar y almacenar el nombre del usuario
function pedirAlias(){
    set_clientes = prompt("Ingresa tu nombre:");
    //enviar el nombre el usuario al servidos
    socket.emit('set_clientes', set_clientes);  
    if(!set_clientes){
        pedirAlias();
    }
}
pedirAlias();
/*$("#mensaje").emojioneArea({
    //pickerPosition: "bottom"
});*/

//enviar mensajes
function enviarMensaje(){

    //obtener el mensaje y eliminar los espacios en blanco
    let mensaje = $("#mensaje").val().trim(); 
    
    //no enviar mensajes vacios
    if (mensaje !== '') { 
        
        socket.emit('mensaje', { mensaje: mensaje, nombre: set_clientes });

        //limpiar el input
        $("#mensaje").val("");
        
    }
}

$('#mensaje').on('keypress', function(event) {
    // Verificar si se presionó la tecla "Enter"
    if (event.which === 13) {
        // Evitar el comportamiento predeterminado de "Enter" 
        event.preventDefault();
        // Enviar el mensaje al servidor
        enviarMensaje();
        //$("#mensaje").val("");
    }
});

//mensajes recibidos del servidor
socket.on('mensaje', (data)=> {

    //muestra el mensaje en el drriv de chat
    var chatList = document.getElementById('chat-list');
    var nuevoMensaje = document.createElement('div');
    
    //verificar si el mensaje el propio o de otra persona
    nuevoMensaje.className = (data.nombre === set_clientes) ? 'mensaje-propio' : 'mensaje-otro';

    
    //mostrar el mensaje en el div
    nuevoMensaje.textContent = `${data.nombre}: ${data.mensaje}`;;
    chatList.appendChild(nuevoMensaje);

   //imprimir el contenido en la consola
    console.log("mensaje recibido del servidor", data.mensaje);


});
