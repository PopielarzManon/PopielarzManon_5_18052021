//Recupératiion chaine requete url//
const queryString_url_id = window.location.search;

//extraire just id//
const urlSearchParams = new URLSearchParams(queryString_url_id);

const _id = urlSearchParams.get("id");

/*function getObjects() {
    return fetch ("http://localhost:3000/api/teddies")
         .then(function(respAll) {
            return respAll.json()
         })
     }

async function getProduit(){
    let produits = await getObjects()


    const soloItem = produits.find(produitSolo =>  produitSolo._id === idUrl)
    console.log(soloItem)
}
getProduit();
*/

let produit = fetch("http://localhost:3000/api/teddies/" + [_id])
    .then(async result_ => {
            const response = await result_.json()

     document.getElementById("produitp").innerHTML += 
        ` <div class="card-header border-0" id="page2">
        <img src="${response.imageUrl}" style="width: 60vw;" alt="">
        </div>
        <div class="card-block px-2 pb-5 "  style="width: 25rem;">
        <h4 class="card-title pt-4">${response.name}</h4>
        <p class="card-text">${response.description}</p>
        <p class="card-text">${response.price} $ </p>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle mb-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Choisissez la couleur
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">${response.colors[0]}</a></li>
        <li><a class="dropdown-item" href="#">Beige</a></li>
        <li><a class="dropdown-item" href="#">Noir</a></li>
        </ul>
        </div>
        <button type="button" class="btn btn-info">Ajouter au panier</button>
        </div>
        `;
           
        })
        console.log(produit)

function getColors(){

    
}


        