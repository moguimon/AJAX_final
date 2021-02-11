// Se quitan los caracteres especiales mediante el uso de la librería prototype
String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
            replace(/%0A/g, '<br/>').
            replace(/%3C/g, '&lt;').
            replace(/%3E/g, '&gt;'));
  }
  var estados = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
  var tiempo_inicial = 0;
  
  window.onload = function() {
    // Cargar la URL de la página en el campo recurso del formulario
    var recurso = document.getElementById('recurso');
    recurso.value = location.href;

    // Cargar el recurso solicitado cuando se haga 'clic' en el botón
    document.getElementById('enviar').onclick = cargar_Contenido;
  }
  
  function cargar_Contenido() {
    // Borrar datos anteriores de los contenedores
    document.getElementById('contenidos').innerHTML = "";
    document.getElementById('estados').innerHTML = "";

    // Si hay peticiones ,instancio el XHR y realizo la solicitud al servidor
    if(window.XMLHttpRequest) {
      peticion = new XMLHttpRequest();
    } else {
        peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar función de respuesta
    peticion.onreadystatechange = mostrar_Contenido;

    // Realizar petición
    tiempo_inicial = new Date();
    
    var recurso = document.getElementById('recurso').value;
    
    peticion.open('GET', recurso+'?nocache='+Math.random(), true);
    peticion.send(null);
  }
  
  function mostrar_Contenido() {
    var tiempo_final = new Date();
    var milisegundos = tiempo_final - tiempo_inicial;

    var estados = document.getElementById('estados');
    estados.innerHTML += "[" + milisegundos + " mseg.] " + estados[peticion.readyState] + "<br/>";

    if(peticion.readyState == 4) {
      if(peticion.status == 200) {
        var contenidos = document.getElementById('contenidos');
        contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
      }
      mostrar_Cabeceras();
      mostrar_Estados();
    }
  }
  
  function mostrar_Cabeceras() {
    var cabeceras = document.getElementById('cabeceras');
    cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
  }
  
  function mostrar_Estados() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;
  }