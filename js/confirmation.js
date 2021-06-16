//Recupérer ID commande

const responseId = localStorage.getItem("idOrder")

//Html en plus pour numéro

const positionElementId = document.querySelector (".jsHtml")
const structureIdCommande =`
Votre numéro de commande est le : <b><p>${responseId}</b></p>`
positionElementId.insertAdjacentHTML("afterbegin", structureIdCommande)

//Effacer local storage

function supprimerLS(key){
    localStorage.removeItem(key)
}
supprimerLS("ours")
supprimerLS("idOrder")
supprimerLS("contact")
supprimerLS("formValues")