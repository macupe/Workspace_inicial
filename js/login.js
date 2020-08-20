//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
  

    /*==================================================================
    [ dirigimos al index ]*/    
//funcion para mostrar contrasenia
var showPass = 0;
    
function showPasss(){
    var pass = document.getElementById('pass'); 
    if(showPass == 0) {
             pass.setAttribute('type','text');
             pass.setAttribute('class','zmdi-eye-off');
             pass.setAttribute('class','zmdi-eye');
             showPass = 1;
         }
         else {               
             pass.setAttribute('type','password');
             pass.setAttribute('class','zmdi-eye');
             pass.setAttribute('class','zmdi-eye-off');
             showPass = 0;
         }
     }

  //funcion para validar que los campos sean correctos de lo contrario muestra una alerta
function validarUser(){
     var mail = document.getElementById('email');
     var pass = document.getElementById('pass');
     var inputDiv = document.getElementsByClassName('wrap-input100 validate-input');

  if(!(/\S+@\S+\.\S+/.test(mail.value))){ 
    inputDiv[0].classList.add('alert-validate');
    return false;
    }
    if(pass.value == null || pass.value.length == 0 || /^\s+$/.test(pass.value)){
      inputDiv[1].classList.add('alert-validate');
      return false;
    }
    localStorage.setItem('mail', JSON.stringify(mail.value));
    location.href='./index.html';
  }
    
function hideAlertM(){
  document.getElementsByClassName('wrap-input100 validate-input')[0].classList.remove('alert-validate');
}
function hideAlertP(){
  document.getElementsByClassName('wrap-input100 validate-input')[1].classList.remove('alert-validate');
}

function cerrarSession(){
  localStorage.removeItem('mail');
  location.href='./login.html';
}
    document.addEventListener("DOMContentLoaded", function(e){
    
     

    });