main()

async function main() {
    const articles = await getArticles() 

    for (article of articles){
        displayArticle(article)
    }
}

function getArticles() {
   return fetch ("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
           return httpBodyResponse.json()
        })
        .then(function(articles){
            return articles
        })
        .catch(function(error) {
            alert(error)
            
        })
    }
function displayArticle(article){
    document.getElementById("main").innerHTML +=
    ` <article class="card rounded m-2 p-0 " style="width: 18rem;">
    <img src=${article.imageUrl}>
    <div class="card-body text-center">
      <h5 class="card-title">${article.name}</h5>
      <p class="card-text">${article.description}</p>
      <a href="./page2.html?id=${article._id}" class="btn">Voir les options</a>
    </div>
  </article>
`
}
