"use strict";
$(document).ready(function(){
   $(".button-collapse").sideNav(); // metodo para el menu tipo hamburguesa 
   llenarListaAlumnos();
});

function llenarListaAlumnos(){
    $.getJSON('js/listaAlumnosJSON.json', function(response) {
	    $('.listaAlumnos a').remove();
	    let list = response == null ? [] : (response.alumnos instanceof Array ? response.alumnos : [response.alumnos ]);
	    if (list.length < 1) {
	       alert("SIN NINGÚN RESULTADO");
	    } else {
	        $.each(list, function(index, alumno) {
	            $('.listaAlumnos').append(' <a href="#" class="collection-item">'+alumno.nombre+'<span class="badge"><i class="iconoFlecha">></i></span></a>');
	        });
	    }   
    }); // fin de $.getJSON
}

