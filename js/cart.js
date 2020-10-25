//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      product = product.articles;
      showProducts();
    }
    
  });

  
});

function showProducts(){
  let htmlContentToAppend = "";
      let sum = 0;


      //recorro array con productos del carrito
      for (let i = 0; i < product.length; i++) {
        let productCar = product[i];
        
        //variable de precio unitario
         var priceUnit = productCar.unitCost;
        //variable de subtotal
        var subTotal = priceUnit * productCar.count;
        //id de los span que muestran el subtotal .
       
        


        if (productCar.currency == "UYU") {

          productCar.currency = "USD"
          priceUnit = productCar.unitCost / 40;
          subTotal = priceUnit * productCar.count;



        }


        htmlContentToAppend += `
                
                <tr>
                    <td><img src="${productCar.src}" alt="" class="imgCart"></td>
                    <td>${productCar.name}</td>
                    <td><span>${productCar.currency} ${priceUnit}</span></td>
                    <td><input type="number" class="form-control col-md-3" id="${i}" value="${productCar.count}" onchange="calSTotal(${i},${subTotal},${priceUnit}); calTotal(${i});"></td>
                    <td><b>${productCar.currency} <span class="sub" id="span${i}"> ${subTotal}</span></b></td>
                </tr>
                
                `;

        document.getElementById("infoProdCarrito").innerHTML = htmlContentToAppend;

        sum += subTotal;
        document.getElementById("priceSub").innerHTML = sum;
        
      }


      document.getElementById("carritoCount").innerHTML = product.length;
      
      send();
    
}

function calSTotal(e,subtotal,priceunit) {

  let cant = document.getElementById(e).value;

  subtotal = cant * priceunit;
  document.getElementById(`span${e}`).innerHTML = subtotal;


}




function calTotal() {
  let total = 0;
  let subtotales = document.getElementsByClassName("sub");

  for (i = 0; i < subtotales.length; i++) {

    total += parseFloat(subtotales[i].innerHTML);

  }
  
  document.getElementById("priceSub").innerHTML = total;
  send()
}




//funcion que toma el metodo de envio y calcula total
function send(){
  var radios = document.getElementsByName('typeSend');
  let subtotal = document.getElementById("priceSub").innerHTML;
  for (var i = 0, length = radios.length; i < length; i++)
  {
      if (radios[i].checked)
      {
      
      var envio = radios[i].value;
  
      break;
      }
  }
  var total = subtotal * parseFloat('1.' + envio);
  var priceSend = subtotal * parseFloat('0.' + envio);
  document.getElementById('total').innerHTML =  total.toFixed(2);
  document.getElementById('priceSend').innerHTML =  priceSend.toFixed(2);
}


//
function pago(a){

  let modal = document.getElementById("pagoT");
  let htmlContentToAppend = '';

  if(a==1){

  htmlContentToAppend += `
  <br>
  
  <div class="form-row">
    <div class="col-7">
      <input type="number" class="form-control validar" id="creditCar" placeholder="Numero de Tarjeta" required>
    </div>
    <div class="col">
      <input type="number" id="cvc" class="form-control validar" min="001" max="999" placeholder="CVC" required>
    </div>
  </div>
  <br><br>
  <div class="form-group">
      <label >Vencimiento</label>
      <input type="date"  id="date" name="bday" max="30-12" 
              min="2020-10-14" class="form-control validar" required>
    </div>

  `

  }else if(a==2){

  htmlContentToAppend += `
  <br>
  <input id="numberCuenta" class="form-control validar" type="number" placeholder="ingrese numero de cuenta" required>
  ` 
  }else{
  alert("Error");

  }

modal.innerHTML = htmlContentToAppend;
  
}


function valido(){
  var inputs = document.getElementsByClassName("validar");
  
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

}



  document.getElementById("pay").addEventListener("click", function(){

  if(document.getElementById('inlineRadio1').checked === true){

    valido();
    
    if(creditCar.value !== '' && date.value !== '' && cvc.value !==''){

      var metodoPago = document.getElementById("mPay");
      document.getElementById("exampleModal").classList.remove('show');
      $('.modal-backdrop').css({'position': 'relative'});
      
      if(document.getElementById('inlineRadio1').checked === true){
        metodoPago.innerHTML = 'Tarjeta de Credito';
      }else{
        metodoPago.innerHTML = 'Seleccione un metodo de Pago';
      }
      
    }


  
  }else if (document.getElementById('inlineRadio2').checked === true) {

    valido();

    var numberCuenta = document.getElementById('numberCuenta'); 

    if (numberCuenta.value !== '') {
      var metodoPago = document.getElementById("mPay");
  
      document.getElementById("exampleModal").classList.remove('show');
      $('.modal-backdrop').css({'position': 'relative'});
      if (document.getElementById('inlineRadio2').checked === true) {
        metodoPago.innerHTML = 'Transferencia Bancaria';
      }
    }
    
    
  }else{

    alert("Debes seleccionar un metodo de pago");
  }



  });

  document.getElementById("finishPay").addEventListener("click", function(){

    let premium = document.getElementById('premium');
    let express = document.getElementById('express');
    let standard = document.getElementById('standard');

    let streetSend = document.getElementById('streetSend');
    let number = document.getElementById('numAdressSend');
    let corner = document.getElementById('corner');
    
    if( premium.checked !== true && express.checked !== true && standard.checked !== true){

      alert('debes seleccionar un metodo de envio');

    }else{    


      if(streetSend.value === '' || streetSend.value === null && number.value === '' || number.value === null && corner.value ==='' || corner.value === null){
        alert("ingresa tu dirección");
        valido();
      }else if(document.getElementById("mPay").innerHTML == "Seleccione un metodo de Pago") {
        alert('Debes Seleccionar un metodo de pago');
      }else{
        alert('has finalizado tu compra de manera exitosa')
        location.href='./login.html';
    }

      
    }

   
  }); 


  document.getElementById("cancel").addEventListener("click", function(){
    document.getElementById("mPay").innerHTML = "Seleccione un metodo de Pago"
  });