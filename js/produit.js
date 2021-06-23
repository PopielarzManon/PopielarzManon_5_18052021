//------------------------------------------------Recupératiion chaine requete url--------------------------------------//
const queryString_url_id = window.location.search;

//extraire just id//
const urlSearchParams = new URLSearchParams(queryString_url_id);

const _id = urlSearchParams.get("id");

fetch("http://localhost:3000/api/teddies/" + _id).then(async(result_) => {
    const response = await result_.json();

    displayArticle(response);

    //-------------------------------------------------------------PANIER---------------------------------------------------------------//
    //ajout panier//
    const btnPanier = document.querySelector("#addToCart");
    //envoi//
    btnPanier.addEventListener("click", (event) => {
        event.preventDefault();
        if (itemStorage) {
            itemStorage.push(choixProduit);
            localStorage.setItem("ours", JSON.stringify(itemStorage));
            alert(`Vous avez ajouté "${response.name}" à votre panier`);
        } else {
            itemStorage = [];
            itemStorage.push(choixProduit);
            localStorage.setItem("ours", JSON.stringify(itemStorage));
            alert(`Vous avez ajouté "${response.name}" à votre panier`);
        }
    });

    //-----------------------------------------------------RECUPERATION DU FORMULAIRE-------------------------------------------------//
    let choixProduit = {
        nom: response.name,
        idDuProduit: response._id,
        quantite: 1,
        prix: response.price / 100,
    };

    //--------------------------------------------------------------STOCKAGE LOCAL-------------------------------------------------------------------//
    let itemStorage = JSON.parse(localStorage.getItem("ours"));
});
//--------------------------------------------------------------DISPLAY HTML----------------------------------------------------------------//
function displayArticle(article) {
    document.getElementById(
        "produitp"
    ).innerHTML += ` <div class="card-header border-0" id="page2">
        <img src="${article.imageUrl}" style="width: 60vw;" alt="">
        </div>
        <div class="card-block px-2 pb-5 "  style="width: 25rem;">
        <h4 class="card-title pt-4">${article.name}</h4>
        <p class="card-text">${article.description}</p>
        <p class="card-text"><b>${article.price / 100} $ </b></p>
        <div class="details__options">
        <label for="colors_select">Choisissez une couleur :</label>
        <select class="options__select" name="colors" id="colors_select" required>
            <option value="">--Choisissez une option--</option>
        </select>
      </div>
      <button class="details__btn btn" id="addToCart" type="submit">
        Ajouter au panier
      </button>
 
        `;

    for (let i = 0; i < article.colors.length; i++) {
        const option = document.createElement("option"); //création de <option></option>
        option.value = `${article.colors[i]}`; // ça récupère l'index du tableau <option value="brown"></option>
        option.innerHTML = `${article.colors[i]}`; // le nom de la couleur est ajouté à <option> // <option value="brown">brown</option>
        document.getElementById("colors_select").appendChild(option); //ça ajoute  <option value="brown">brown</option> en enfant de l'id #lense-select
    }
}