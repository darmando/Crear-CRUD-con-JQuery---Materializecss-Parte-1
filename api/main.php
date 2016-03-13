<?php
/*****************************/
/***DESARROLLO HIDROCALIDO****/
/*****************************/
require 'conn.php';
if (isset($_REQUEST['metodo'])) {
   $metodo = trim($_REQUEST['metodo']);
}else{
   $metodo = "";
}
switch ($metodo) {
    case 'obtenerAlumnos':
       obtenerAlumnos();
    break;
    case 'insertarAlumno':
     $nombre           = $_REQUEST["nombre"];
     $dateTime = strtotime($_REQUEST["fecha_nacimiento"]);
     $fecha_nacimiento =  date('Y-m-d', $dateTime);
     $activo           = $_REQUEST["activo"];
     $sexo             = $_REQUEST["sexo"];
     $fecha_alta       = date("Y-m-d");
     insertarAlumno($nombre,$fecha_nacimiento,$activo,$sexo,$fecha_alta);
    break;
    default:
        exit();
    break;
}
function obtenerAlumnos(){
    $sql ="SELECT * FROM tbl_alumnos ORDER BY ID_ALUMNO DESC"; 
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        $detalle = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"alumnos": ' . json_encode($detalle) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
function insertarAlumno($nombre,$fecha_nacimiento,$activo,$sexo,$fecha_alta){
    $sql = "INSERT INTO tbl_alumnos(nombre,fecha_nacimiento,activo,sexo,fecha_alta) values(:nombre,:fecha_nacimiento,:activo,:sexo,:fecha_alta);";   
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql); 
        $stmt->bindParam("nombre",$nombre);
        $stmt->bindParam("fecha_nacimiento",$fecha_nacimiento);
        $stmt->bindParam("activo",$activo);
        $stmt->bindParam("sexo",$sexo);
        $stmt->bindParam("fecha_alta",$fecha_alta);
        $stmt->execute();
        $db = null;     
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
/*****************************/
/***DIEGO ARMANDO LIRA RDZ****/
/*****************************/
?>