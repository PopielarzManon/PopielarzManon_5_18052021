let itemStorage = JSON.parse(localStorage.getItem("ours"));
//affichage produit panier//

const positionElementPanier = document.getElementById("recap");
let structurePanier = [];

if (itemStorage === null || itemStorage == 0) {
  const vide = `
<div class="text-center">Votre panier est vide !</div>`;
  positionElementPanier.innerHTML = vide;
} else {
  for (k = 0; k < itemStorage.length; k++) {
    structurePanier =
      structurePanier +
      `
        <div class="quant container d-flex justify-content-between "> ${itemStorage[k].nom} <p>${itemStorage[k].prix} $ <button class="delete" ><i class="fas fa-trash"></i></button></p></div>
      </div>
        `;
  }
  if (k === itemStorage.length) {
    positionElementPanier.innerHTML = structurePanier;
  }
}

//BTN SUP//

let deleteButton = document.querySelectorAll(".delete");

//selection id//
for (let l = 0; l < deleteButton.length; l++) {
  deleteButton[l].addEventListener("click", (event) => {
    event.preventDefault();

    let idDelete = itemStorage[l].idDuProduit;

    //filtre
    itemStorage = itemStorage.filter((el) => el.idDuProduit !== idDelete);
    console.log(itemStorage);
    //local storage changement
    localStorage.setItem("ours", JSON.stringify(itemStorage));
    alert(`Vous avez suprimé un article de votre panier`);
    window.location.href = "checkout.html";
  });
}

//vider panier
const deletePanierHtml = `
<button class="deleteAll container d-flex justify-content-center btn mt-4">Vider le panier</button>`;
positionElementPanier.insertAdjacentHTML("beforeend", deletePanierHtml);

const deletePanier = document.querySelector(".deleteAll")

//supprimer ours

deletePanier.addEventListener("click", (e) => {
  e.preventDefault;
  if (itemStorage) {
    localStorage.removeItem("ours");
    alert("Votre panier a été vidé !");

    //Rechargement de la page panier

    window.location.href = "checkout.html";
  }
  else {
    alert("Votre panier est déjà vide !");
  }
});
///MONTANT//
let totalPrice =[]
for (let = m = 0 ; m < itemStorage.length; m++){
  let prixPanier = itemStorage[m].prix

  totalPrice.push(prixPanier)
  

}

// + tout les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue
const calculTotal = totalPrice.reduce(reducer);


const affichagePrixHtml = `
<div class="affichage text-center container pt-5"> Le montant total de votre panier est de : ${calculTotal} $ </div>`


positionElementPanier.insertAdjacentHTML("beforeend", affichagePrixHtml)


//ad event
const btnEnvoi = document.querySelector("#envoi")

btnEnvoi.addEventListener("click",(e)=> {
  e.preventDefault()
  //recupe valeur commande

const formValues ={
  mail : document.querySelector("#mail").value,
  nom : document.querySelector("#nom").value,
  adresse : document.querySelector("#adresse").value,
  poste : document.querySelector("#poste").value,
  ville : document.querySelector("#ville").value
}

//envoyer local
const sendTo = {
  itemStorage,
  formValues
}
console.log(sendTo);

localStorage.setItem("formValues", JSON.stringify(formValues))

})