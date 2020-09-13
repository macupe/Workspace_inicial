var product = {};
var comments = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


    // Obtengo info de los productos
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {   
            product = resultObj.data;
            


            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById('productCost');
            let productCostCurrencyHtml = document.getElementById('productCostCurrency');
            let productSoldCountHTML = document.getElementById('productSoldCount');
            let productCategoryHtml = document.getElementById('productCategory');
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCostCurrencyHtml.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHtml.innerHTML = product.category;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
        
        
         //Obteno array de productos.
         getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                let relatedProduct = resultObj.data;
             
                let htmlContentToAppend = "";

                product.relatedProducts.forEach(function(array){
                    
                    let productsRel = relatedProduct[array];
        
                    htmlContentToAppend +=`
                    
                    <td>
                        <div>
                         <img src=${productsRel.imgSrc} alt="" width="100%"><br>
                            <h3>${productsRel.name}</h3><br>
                            <p style="font: small;">
                                ${productsRel.description}
                            </p><br>
                            <a href="porduct-info.html">Ver</a>
                        </div>
                    </td>
                    
                    `
                    document.getElementById("productRel").innerHTML = htmlContentToAppend;
                });
            }
         });    
    });

    
                 
            



    //OBTENGO LOS COMENTARIOS Y LOS MUESTRO
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            comments = resultObj.data;
        }


        let htmlContentToAppend = "";
        for (let i = 0; i < comments.length; i++) {
            comments[i]; 
            var rating = comments[i].score;


            htmlContentToAppend += `    
                <h4>${comments[i].user}</h4><br>
                <span>Calificacion: ${calification(rating)}</span>
                </div>
                <p>${comments[i].description}</p><br>
                <hr>`;

            document.getElementById('comments').innerHTML = htmlContentToAppend;
        }

        function calification(par){
            var stars = '';
            var calification = parseInt(par);
            for (i = 0; i < calification; i++) {
                stars += `<span class="fa fa-star checked"></span>`;
            }
            return stars;
        }


    });


    
});
