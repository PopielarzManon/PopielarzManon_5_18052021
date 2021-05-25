
//Recupératiion chaine requete url//
const queryString_url_id = window.location.search;

//extraire just id//
const urlSearchParams = new URLSearchParams(queryString_url_id);

const _id = urlSearchParams.get("id");


let response = fetch('http://localhost:3000/api/teddies/' + [_id])
    
//selection class
const produitP =document.getElementById("produitp");
//structure

const structureProduit =  ` <div class="card-header border-0" id="page2">
<img src="" style="width: 60vw;" alt="">
</div>
<div class="card-block px-2 pb-5 "  style="width: 25rem;">
<h4 class="card-title pt-4"></h4>
<p class="card-text"></p>
<p class="card-text"></p>
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle mb-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      Choisissez la couleur
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">Marron</a></li>
      <li><a class="dropdown-item" href="#">Beige</a></li>
      <li><a class="dropdown-item" href="#">Noir</a></li>
    </ul>
  </div>
  <button type="button" class="btn btn-info">Ajouter au panier</button>
</div>
`

produitP.innerHTML = structureProduit;