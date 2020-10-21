//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      product = product.articles;

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

    
  });



});


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

function pago(a){

  let modal = document.getElementById("pagoT");
  let htmlContentToAppend = '';

  if(a==1){

  htmlContentToAppend += `
  <br>
  <div class="form-row">
    <div class="col-7">
      <input type="number" class="form-control" placeholder="Numero de Tarjeta" required>
    </div>
    <div class="col">
      <input type="number" class="form-control" min="001" max="999" placeholder="CVC" required>
    </div>
  </div>
  <br><br>
  <div class="form-group">
      <label >Vencimiento</label>
      <input type="date" name="bday" max="30-12" 
              min="2020-10-14" class="form-control" required>
    </div>

  `

  }else if(a==2){

  htmlContentToAppend += `
  <br>
  <input class="form-control" type="number" placeholder="ingrese numero de cuenta" required>
  ` 
  }else{
  alert("Error");

  }

modal.innerHTML = htmlContentToAppend;
  
}

