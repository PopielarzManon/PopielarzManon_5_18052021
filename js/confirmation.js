//-----------------------------------------Recupérer ID commande----------------------------------//

const responseId = localStorage.getItem("idOrder");

//--------------------------------DISPLAY HTML-------------------------------------------//

const positionElementId = document.querySelector(".jsHtml");
const structureIdCommande = `
Votre numéro de commande est le : <b><p>${responseId}</b></p>`;
positionElementId.insertAdjacentHTML("afterbegin", structureIdCommande);

//------------------------------------EFFACER LOCAL STORAGE----------------------------------------------------------//

function supprimerLS(key) {
    localStorage.removeItem(key);
}
supprimerLS("ours");
supprimerLS("idOrder");
supprimerLS("contact");
supprimerLS("formValues");