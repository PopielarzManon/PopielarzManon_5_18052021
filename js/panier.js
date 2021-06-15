let valueProducts = JSON.parse(localStorage.getItem("ours"));



//affichage produit panier//

const positionElementPanier = document.getElementById("recap");
let structurePanier = [];

if (valueProducts === null || valueProducts == 0) {
  const vide = `
<div class="text-center">Votre panier est vide !</div>`;
  positionElementPanier.innerHTML = vide;
} else {
  for (k = 0; k < valueProducts.length; k++) {
    structurePanier =
      structurePanier +
      `
        <div class="quant container d-flex justify-content-between "> ${valueProducts[k].nom} <p>${valueProducts[k].prix} $ <button class="delete" ><i class="fas fa-trash"></i></button></p></div>
      </div>
        `;
  }
  if (k === valueProducts.length) {
    positionElementPanier.innerHTML = structurePanier;
  }
}

//BTN SUP//

let deleteButton = document.querySelectorAll(".delete");

//selection id//
for (let l = 0; l < deleteButton.length; l++) {
  deleteButton[l].addEventListener("click", (event) => {
    event.preventDefault();

    let idDelete = valueProducts[l].idDuProduit;

    //filtre
    valueProducts = valueProducts.filter((el) => el.idDuProduit !== idDelete);
    console.log(valueProducts);
    //local storage changement
    localStorage.setItem("ours", JSON.stringify(valueProducts));
    alert(`Vous avez suprimé un article de votre panier`);
    window.location.href = "checkout.html";
  });
}

//vider panier
const deletePanierHtml = `
<button class="deleteAll container d-flex justify-content-center btn mt-4">Vider le panier</button>`;
positionElementPanier.insertAdjacentHTML("beforeend", deletePanierHtml);

const deletePanier = document.querySelector(".deleteAll");

//supprimer ours

deletePanier.addEventListener("click", (e) => {
  e.preventDefault;
  if (valueProducts) {
    localStorage.removeItem("ours");
    alert("Votre panier a été vidé !");

    //Rechargement de la page panier

    window.location.href = "checkout.html";
  } else {
    alert("Votre panier est déjà vide !");
  }
});
///MONTANT//
let totalPrice = [];
for (let m = 0; m < valueProducts.length; m++) {
  let prixPanier = valueProducts[m].prix;

  totalPrice.push(prixPanier);
}

// + tout les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const calculTotal = totalPrice.reduce(reducer);

const affichagePrixHtml = `
<div class="affichage text-center container pt-5"> Le montant total de votre panier est de : ${calculTotal} $ </div>`;

positionElementPanier.insertAdjacentHTML("beforeend", affichagePrixHtml);

//ad event
const btnEnvoi = document.querySelector("#envoi");

btnEnvoi.addEventListener("click", (e) => {
  e.preventDefault();
  //recupe valeur commande

  const contact = {
    
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#mail").value,
    
  };
  // const poste = {
  //   poste: document.querySelector("#poste").value
  // };

  const regExText = (value) => {
    return /^[A-Za-z 0-9]{3,25}$/.test(value);
  };


  //------------------------CONTROLE FORMULAIRE-----------------------------//

  function controleNom() {
    const okNom = contact.lastName;
    if (regExText(okNom)) {
      document.querySelector(".noName").textContent = "";
      return true;
    } else {
      document.querySelector(".noName").textContent =
        "Veuiller rentrer un nom valide";
      return false;
    }
  }
  function controleAdresse() {
    const okAdresse = contact.address;
    if (regExText(okAdresse)) {
      document.querySelector(".noAdresse").textContent = "";
      return true;
    } else {
      document.querySelector(".noAdresse").textContent =
        "Veuiller rentrer une adresse valide";
      return false;
    }
  }
  function controleVille() {
    const okVille = contact.city;
    if (regExText(okVille)) {
      document.querySelector(".noVille").textContent = "";
      return true;
    } else {
      document.querySelector(".noVille").textContent =
        "Veuiller rentrer une ville valide";
      return false;
    }
  }

  // function controlePoste() {
  //   const okPoste = poste;
  //   if (/^[0-9]{5}$/.test(okPoste)) {
  //     document.querySelector(".noPoste").textContent = "";
  //     return true;
  //   } else {
  //     document.querySelector(".noPoste").textContent =
  //       "Veuiller rentrer un code postal valide";
  //     return false;
  //   }
  // }

  function controleMail() {
    const okMail = contact.email;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(okMail)) {
      document.querySelector(".noMail").textContent = "";
      return true;
    } else {
      document.querySelector(".noMail").textContent =
        "Veuiller rentrer un mail valide";
      return false;
    }
  }

//////////////////////////////////////////////////////////////////////////////////////

  //CONDITION LOCAL STORAGE OK//
  if (
    controleNom() &&
    controleVille() &&
    controleAdresse() &&
    // controlePoste() &&
    controleMail()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    alert("Le formulaire n'est pas complet !");
  }
  
  
  ////////////////////////////////////////////////////////////////
  
  const products = [] ;
for (let t = 0; t < valueProducts.length; t++) {
  let getId = valueProducts[t].idDuProduit
  products.push(getId)
  
}
/////////////////////////////////////////////////////////////

  //envoyer local
  let sendTo = {
    products,
    contact
  };
  //envoi vers serveur
  const promise01 = fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(sendTo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(promise01);
  console.log("promise01");
 
  //result serveur
  promise01.then(async (response) => {
    try {
      const contenu = await response.json();
    } catch (e) {}
    
  });
  
});
