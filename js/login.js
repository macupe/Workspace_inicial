//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
  

    /*==================================================================
    [ dirigimos al index ]*/    
    var userForm = document.getElementsById("email").value;
    var passForm = document.getElementsById("email").value;

    if(userForm != "" || passForm != ""){
        location.href="index.html";
    }else{
        location.href="login.html";
    }
document.addEventListener("DOMContentLoaded", function(e){
    


    }