//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function(resultObj){
      
        if (resultObj.status === "ok")
        {   
          products = resultObj.data;
          products = products.articles;        
          showCart(products);
        }

    })});


    function showCart(products){
    
    
        //recorro array con productos del carrito y los muestro
        for (let i = 0; i < products.length; i++) {
    
            let productCar =  products[i];
            let htmlContentToAppend= "";
    
            htmlContentToAppend += 
                `<tr>
                    <td><img src="${productCar.src}" alt="" class="imgCart"></td>
                    <td>${productCar.name}</td>
                    <td><span id="unitario${i}">${productCar.currency} ${productCar.unitCost}</span></td>
                    <td><input type="number" class="form-control col-md-3" id="cant${i}" value="${productCar.count}"  min="1" onchange="calCart(${i})"></td>
                    <td><b>${productCar.currency} <span id="subtotal${i}">${money(productCar)}</span></b></td>
                </tr>                
                `;
    
                document.getElementById("infoProdCarrito").innerHTML = htmlContentToAppend;  
        }

    }

    function money(productCar){
        if(productCar.currency == "UYU")
        {
            productCar.currency = "USD"
            productCar.unitCost = productCar.unitCost /40;
        }
            return productCar.unitCost;
    }

    function calCart(b){

        let precio = document.getElementById(`unitario${b}`).innerHTML;
        let cant = document.getElementById(`cant${b}`).value;
        document.getElementById(`subtotal${b}`).innerHTML = `${parseIint(precio*10)*parseInt(cantidad)/10}`;

        let suma = 0;
        for (let j = 0; j < i; j++){
            suma+=parseInt((document.getElementsById(`subtotal${j}`).innerHTML));
        }

    }


