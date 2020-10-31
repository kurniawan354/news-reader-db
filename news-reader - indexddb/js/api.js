var base_url = "https://readerapi.codepolitan.com/";
function status(response){
    if (response.status !== 200){
        console.log("Error :"+ response.status);
        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}
function json(response){
    return response.json();
}
function error(error) {
  console.log("Error : " + error);
}
function getArticles(){
  if ("caches" in window) {
    caches.match(base_url + "articles").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.result.forEach(function(articles) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${articles.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${articles.thumbnail}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${articles.title}</span>
                      <p>${articles.description}</p>
                    </div>
                  </div>
                `;
          });
        
          document.getElementById("article").innerHTML = articlesHTML;
        });
      }
    });
  }
    fetch(base_url + "articles")
    .then(status)
    .then(json)
    .then(function(data) {

        var articlesHTML ="";
        data.result.forEach(function(articles){
            articlesHTML +=`
            <div class="card">
            <a href="./article.html?id=${articles.id}">
            <div class="card-image waves-ffect waves-block waves-light">
            <img src="${articles.thumbnail}"/>
            </div>
            </a>
            <div class="crad-content">
            <span class="card-title truncate">${articles.title}</span>
            <p>${articles.description}</p>
            </div>
            </div>`;


            
        });
      
        document.getElementById("article").innerHTML = articlesHTML;
    })
    .catch(Error);
}
function getArticleById() {
  return new Promise(function(resolve, reject){
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
  
    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articleHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.result.cover}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.result.post_title}</span>
                  ${snarkdown(data.result.post_content)}
                </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            resolve(data);
          });
        }
      });
    }
  
    fetch(base_url + "article/" + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
      
        console.log(data);
        
        var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
      });
    
  })
    
  }
  function getsavedArticles(){
    getAll().then(function(articles){
      console.log(articles);
      var articlesHTML = "";
    articles.forEach(function(article) {
      var description = article.post_content.substring(0,100);
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
    });
  }