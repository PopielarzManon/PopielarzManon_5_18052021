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

const deletePanier = document.querySelector(".deleteAll");

//supprimer ours

deletePanier.addEventListener("click", (e) => {
  e.preventDefault;
  if (itemStorage) {
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
for (let m = 0; m < itemStorage.length; m++) {
  let prixPanier = itemStorage[m].prix;

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

  const formValues = {
    mail: document.querySelector("#mail").value,
    nom: document.querySelector("#nom").value,
    adresse: document.querySelector("#adresse").value,
    poste: document.querySelector("#poste").value,
    ville: document.querySelector("#ville").value,
  };

  const regExText = (value) => {
    return /^[A-Za-z 0-9]{3,25}$/.test(value);
  };
  // Foncton pour erreur in put

  //------------------------CONTROLE FORMULAIRE-----------------------------//

  ///////////////////////////////////////////////////////////////////////////

  // function controleNom() {
  //   const okNom = formValues.nom;
  //   if (regExText(okNom)) {
  //     document.querySelector(".noName").textContent = "";
  //     return true;
  //   } else {
  //     document.querySelector(".noName").textContent =
  //       "Veuiller rentrer un nom valide";
  //     return false;
  //   }
  // }

  ////////////////////////////////////////////////////////////////////////////
  function controleNom() {
    const okNom = formValues.nom;
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
    const okAdresse = formValues.adresse;
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
    const okVille = formValues.ville;
    if (regExText(okVille)) {
      document.querySelector(".noVille").textContent = "";
      return true;
    } else {
      document.querySelector(".noVille").textContent =
        "Veuiller rentrer une ville valide";
      return false;
    }
  }

  function controlePoste() {
    const okPoste = formValues.poste;
    if (/^[0-9]{5}$/.test(okPoste)) {
      document.querySelector(".noPoste").textContent = "";
      return true;
    } else {
      document.querySelector(".noPoste").textContent =
        "Veuiller rentrer un code postal valide";
      return false;
    }
  }

  function controleMail() {
    const okMail = formValues.mail;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(okMail)) {
      document.querySelector(".noMail").textContent = "";
      return true;
    } else {
      document.querySelector(".noMail").textContent =
        "Veuiller rentrer un mail valide";
      return false;
    }
  }



  //CONDITION LOCAL STORAGE OK//
  if (
    controleNom() &&
    controleVille() &&
    controleAdresse() &&
    controlePoste() &&
    controleMail()
  ) {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  } else {
    alert("Le formulaire n'est pas complet !");
  }

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

 const sendTo = {
   contact: {

     firstName: 'hello',
     lastName: 'hello',
     address: 'hello',
     city: 'hello',
     email: 'hello@mail.fr'
    },
     products: ['5be9c8541c9d440000665243']
    };

  //envoyer local
/*  const sendTo = {
    itemStorage,
    formValues,
  };¨*/
  //envoi vers serveur
  const promise01 = fetch("http://localhost:3000/api/teddies"), {
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
  // const promise02 = fetch("https://jsonplaceholder.typicode.com/users");
  // promise02.then(async (response) => {
  //   try {
  //     console.log(promise02);
  //     console.log("promise02");
  //     const dataSurServeur = await response.json;
  //     console.log(dataSurServeur);
  //     console.log("dataSurServeur");
  //   } catch (e) {}
  // });
});
