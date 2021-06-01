
let itemStorage = JSON.parse(localStorage.getItem("ours"))
//affichage produit panier//

 const positionElementPanier = document.getElementById("recap")
 let structurePanier = [];

 if(itemStorage === null){
const vide = `
<div class="text-center">Votre panier est vide !</div>`
    positionElementPanier.innerHTML = vide
    

     
 } 
 else {
    
    
for(k=0; k < itemStorage.length; k++){
        structurePanier = structurePanier + `
        <div class="quant container d-flex justify-content-between "> ${itemStorage[k].nom} <p>${itemStorage[k].prix} $ <i class="fas fa-trash"></i></p></div>
      </div>
        `
}
        if(k === itemStorage.length){
        positionElementPanier.innerHTML = structurePanier
     }
     
 }
