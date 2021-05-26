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
        <p class="card-text"><b>${response.price/100} $ </b></p>
        <div class="details__options">
        <label for="colors-select">Choisissez une couleur :</label>
        <select class="options__select" name="colors" id="colors-select" required>
            <option value="">--Choisissez une option--</option>
        </select>
      </div>
      <button class="details__btn" id="addToCart" type="button" onclick="addToCart()">
        Ajouter au panier
      </button>
 
        `;
        
         for (let i = 0; i < response.colors.length ; i++ ){
            const option = document.createElement("option");              //création de <option>
            option.value = `${response.colors[i]}`;                           // ça récupère l'index du tableau 
            option.innerHTML = `${response.colors[i]}`;                      // le nom de la lentille est ajouté à <option> 
            document.getElementById("colors-select").appendChild(option);  //ça ajoute <option> en enfant de l'id #lense-select 
          };
    })