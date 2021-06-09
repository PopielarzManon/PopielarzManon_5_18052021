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
<button class="deleteAll btn container d-flex justify-content-center">Vider le panier</button>`;
positionElementPanier.insertAdjacentHTML("beforeend", deletePanierHtml);

const deletePanier = document.querySelector(".deleteAll")
console.log(deletePanier);

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
