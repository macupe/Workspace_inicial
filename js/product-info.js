var product = {};
var comments = {};
/*
function showImagesGallery(array){

    let htmlContentToAppend = "";
    let html = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        console.log(imageSrc);

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="${imageSrc}" class="d-block w-100" alt="...">
        </div>
        `;

        html+=`
            <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>
        `;

        document.getElementById("positionSlides").innerHTML = html;
        document.getElementById("imgsCarusel").innerHTML = htmlContentToAppend;
    }
} */

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
            let htmlContentToAppend1= "";
            let html1 = "";
            let array1 = product.images

            for(let i = 0; i < array1.length; i++){
                let imageSrc = array1[i];
                
                if(i===0){
                htmlContentToAppend1 += `
                <div class="carousel-item active" id="imgsProducts">
                    <img src="${imageSrc}" class="d-block w-100" alt="...">
                </div>
                `;
        
                html1+=`
                    <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>
                `;
                
                document.getElementById("imgsCarusel").innerHTML = htmlContentToAppend1;
                document.getElementById("positionSlides").innerHTML = html1;
                }else{
                
                    htmlContentToAppend1 += `
                    <div class="carousel-item">
                        <img src="${imageSrc}" id="imgsProducts" class="d-block w-100" alt="...">
                    </div>
                    `;
            
                    html1+=`
                        <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
                    `;
                    
                    document.getElementById("imgsCarusel").innerHTML = htmlContentToAppend1;
                    document.getElementById("positionSlides").innerHTML = html1;

                }
            }
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



    