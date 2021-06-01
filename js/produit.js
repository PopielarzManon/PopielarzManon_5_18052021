//Recupératiion chaine requete url//
const queryString_url_id = window.location.search;

//extraire just id//
const urlSearchParams = new URLSearchParams(queryString_url_id);

const _id = urlSearchParams.get("id");

fetch("http://localhost:3000/api/teddies/" +_id)

    .then(async (result_) => {
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
        <label for="colors_select">Choisissez une couleur :</label>
        <select class="options__select" name="colors" id="colors_select" required>
            <option value="">--Choisissez une option--</option>
        </select>
      </div>
      <button class="details__btn btn" id="addToCart" type="button" onclick="addToCart()">
        Ajouter au panier
      </button>
 
        `;
        
         for (let i = 0; i < response.colors.length ; i++ ){
            const option = document.createElement("option");              //création de <option></option>
            option.value = `${response.colors[i]}`;                           // ça récupère l'index du tableau <option value="brown"></option>
            option.innerHTML = `${response.colors[i]}`;                      // le nom de la lentille est ajouté à <option> // <option value="brown">brown</option>
            document.getElementById("colors_select").appendChild(option);  //ça ajoute  <option value="brown">brown</option> en enfant de l'id #lense-select 
          };
          //-----PANIER-----------//
          //ajout panier//
          const btnPanier = document.querySelector("#addToCart")
          console.log(btnPanier)
          //envoi//
          btnPanier.addEventListener("click", (event)=>{
            event.preventDefault();
          })
         //recp form//
          let choixProduit = {
            nom:response.name,
            idDuProduit:response._id,
            quantite: 1,
            prix: response.price/100
          }
          console.log(choixProduit)
        //----Local stock---//
          
   
        })


    

