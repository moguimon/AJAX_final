// Se quitan los caracteres especiales
String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
            replace(/%0A/g, '<br/>').
            replace(/%3C/g, '&lt;').
            replace(/%3E/g, '&gt;'));
  }
  var states = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
  var tiempo_inic = 0;
  
  window.onload = function() {
    // Cargar la URL de la página en el campo Text
    var recurso = document.getElementById('recurso');
    recurso.value = location.href;

    // Cargar el recurso solicitado cuando se haga 'clic' en el botón
    document.getElementById('enviar').onclick = loadContent;
  }
  
  function loadContent() {
    // Borrar datos anteriores
    document.getElementById('contenidos').innerHTML = "";
    document.getElementById('estados').innerHTML = "";

    // Instanciar objeto XMLHttpRequest
    if(window.XMLHttpRequest) {
    peticion = new XMLHttpRequest();
    }
      else {
        peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar función de respuesta
    peticion.onreadystatechange = muestra_contenido;

    // Realizar petición
    initTime = new Date();
    
    var recurso = document.getElementById('recurso').value;
    
    peticion.open('GET', recurso+'?nocache='+Math.random(), true);
    peticion.send(null);
  }
  
function muestra_contenido() {
  var tiempo_fin = new Date();
  var dif_tiempo = tiempo_fin-tiempo_inic;
  var estados = document.getElementById("estados");
  // modifico el DOM
  estados.innerHTML += "[" + dif_tiempo + " miliseg.] " + estados[solicitud.readyState] + "<br/>";
  if(solicitud.readyState == 4) {
    if(peticion.status == 200) {
      var contenidos = document.getElementById("contenidos");
      contenidos.innerHTML = solicitud.responseText;//.transformaCaract();
    }
    muestra_cabeceras();
    muestra_estado();
  }
}
  
function muestra_cabeceras() {
  var cabeceras = document.getElementById("cabeceras");
  cabeceras.innerHTML = solicitud.getAllResponseHeaders();//.transformaCaract();//se muestran las cabeceras
}
  
function muestra_estado() {
  var codigo = document.getElementById("codigo");
  codigo.innerHTML = solicitud.status + "<br/>" + solicitud.statusText;// se muestran los estados
}