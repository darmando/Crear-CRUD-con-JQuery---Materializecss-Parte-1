"use strict";
$(document).ready(function(){
   $(".button-collapse").sideNav(); // metodo para el menu tipo hamburguesa 
   $(".modal-trigger").leanModal(); // metodo que inicializa los modal's
   $('.datepicker').pickadate({
	  selectMonths: true, // Creates a dropdown to control month
	  selectYears: 8 // Creates a dropdown of 15 years to control year
   });
   $('select').material_select();
   $(".loaderAjaxCRUD").hide();
   $(".loaderAjaxPrincipal").hide();
   llenarListaAlumnos();
});

function llenarListaAlumnos(){
    $.ajax({
      type: 'GET',
      data: { metodo : 'obtenerAlumnos' },
      url: 'api/main.php',
      dataType: "json",
      beforeSend: function(){
        $(".loaderAjaxPrincipal").show();
      },
      success: function(response){
            $(".loaderAjaxPrincipal").hide();
    	    let list = response.alumnos;
    	    if (list.length < 1) {
    	       Materialize.toast("SIN NINGUN RESULTADO ENCONTRADO", 4000);
    	    } else {
    	    	var status;
                $('.listaAlumnos li').remove();
                for(let i = 0; i < list.length; i++) {
                    if (list[i].activo==="1"){
                      status='<i class="material-icons prefix" style="color: green;">account_circle</i>';
                    }else{
                      status='<i class="material-icons prefix" style="color: yellow;">account_circle</i>';
                    }
    		        $('.listaAlumnos').append('<li class="collection-item avatar">'+
    		          '<img src="img/DiegoLira.jpg" alt="" class="circle">'+
    		          '<span class="title">'+list[i].nombre+'</span>'+
    		          '<p>'+list[i].fecha_alta+'<br>'+status+'</p>'+
    		          '<a href="#!" class="secondary-content"><i class="material-icons iconoFlecha">></i></a>'+
    		         '</li>');            	
                }
    	    }   

      } // fin de success
    });  
}

$(".mdlAddAlumnos").on("click",function(){
   $('#mdlAlumnos').openModal();
   $("#mdlTitulo").text("Agregar Alumno");
   $(".formAlumnos")[0].reset();
});

$(".formAlumnos").submit(function(event){
   event.preventDefault();
   if ($("#mdlTitulo").text() === 'Agregar Alumno'){
     agregarAlumno();
   }else{
     // editarAlumno(); PENDIENTE
   } 
});


function agregarAlumno(){
    var checkedStatus;
   if($("#chkStatus").is(':checked')){
    checkedStatus=1;
   }else{
    checkedStatus=0;
   }
    var serializedData = {
      metodo : 'insertarAlumno',
      nombre : $("#txtNombre").val().toUpperCase(),
      fecha_nacimiento : $("#txtFechaNacimiento").val(),
      sexo : $("#selSexo").val(),
      activo : checkedStatus
    }

    $.ajax({
        url: "api/main.php",
        type: "POST",
        data: serializedData ,
        beforeSend: function(){
           $(".loaderAjaxCRUD").show();
        },
        success: function (response) {
           $(".loaderAjaxCRUD").hide();
           Materialize.toast("Alumno Creado con Exito.", 4000);
           $('#mdlAlumnos').closeModal();
           llenarListaAlumnos();
        },
        error: function(jqXHR, textStatus, errorThrown) {
           Materialize.toast(textStatus+' - '+errorThrown, 4000);
        }


    });  
}