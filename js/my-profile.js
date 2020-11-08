//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
    if(localStorage.getItem('name')!=="" && localStorage.getItem('name')!== null){
      
      document.getElementById("firstN").value = localStorage.getItem('name').replace(/['"]+/g, '');
      document.getElementById("lastN").value = localStorage.getItem('lastName').replace(/['"]+/g, '');
      document.getElementById("age").value = localStorage.getItem('age').replace(/['"]+/g, '');
      document.getElementById("email").value = localStorage.getItem('email').replace(/['"]+/g, '');
      document.getElementById("phone").value = localStorage.getItem('phone').replace(/['"]+/g, '');

       datos();
    }
        
             
  
});

var data = {};



document.getElementById("saveChanges").addEventListener("click", function(){

    let name = document.getElementById("firstN");
    let lastName = document.getElementById("lastN");
    let age = document.getElementById("age");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    

    valido();
      
    if(name.value !== '' && lastName.value !== '' && age.value !==''&& (/\S+@\S+\.\S+/.test(email.value)) && phone.value !==''){

        localStorage.setItem('name', name.value);
        localStorage.setItem('lastName', lastName.value);
        localStorage.setItem('age', age.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('phone', phone.value);
        

        document.getElementById("exampleModal").classList.remove('show');
        $('.modal-backdrop').css({'position': 'relative'});
        datos();
    }
   
}); 

// Funcion que agrega los datos guardados en el localStorage
function datos(){

 



  document.getElementById("mName").innerHTML = localStorage.getItem('name').replace(/['"]+/g, '');
  document.getElementById("mAge").innerHTML = localStorage.getItem('age').replace(/['"]+/g, '');
  document.getElementById("mEmail").innerHTML = localStorage.getItem('email').replace(/['"]+/g, '');
  document.getElementById("mPhone").innerHTML = localStorage.getItem('phone').replace(/['"]+/g, '');
}




// Funcion que valida los inpunts que se se encuentran en el html
function valido(){
  var inputs = document.getElementsByClassName("validar");
  var email = document.getElementById("email");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove('is-invalid');
    inputs[i].classList.remove('is-valid');
    
    if (inputs[i].value === '' || inputs[i].value === 0) {
      inputs[i].classList.add('is-invalid');
      
    }
    else{
      inputs[i].classList.add('is-valid');
    }
    
  }
  
  email.classList.remove('is-valid');
  email.classList.remove('is-invalid');

  if(!(/\S+@\S+\.\S+/.test(email.value))){

      email.classList.add('is-invalid');
          
  }else{

      email.classList.add('is-valid');
  }
  
}


