// Init http
const http = new Http();

// Init UI
const ui = new UI();
// Api key
const apiKey = "7a8ffd330f4a4f29b53c032a7e21f4af";
// Init Auth
const auth = new Auth();
// Init favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();



// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const selectResource = document.getElementById("resource");
const selectCategory = document.getElementById("category");
const logout = document.querySelector(".logout");
const newsContainer = document.querySelector('.news-container');

// All events
select.addEventListener("change", onChangeCountry);
searchBtn.addEventListener("click", onSearch);
selectResource.addEventListener("change", onChangeResource);
selectCategory.addEventListener("change", onChangeCategory);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", addFavorite);

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    }
});


// Event handlers
function onChangeCountry(e) {
    ui.showLoader();

    let request1;

    request1 = !selectCategory.value
        ? `https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}` :
        `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;

    http.get(request1)

        .then(res => {
            const response = JSON.parse(res.response);
            ui.clearContainer();
            response.articles.forEach((news,index) => ui.addNews(news,index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(response.articles);
        })
        .catch(err => ui.showError(err.error));
}


function onSearch(e) {
    ui.showLoader();

    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)

        .then(res => {
            const response = JSON.parse(res.response);
            ui.clearContainer();
            response.articles.forEach((news,index) => ui.addNews(news,index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(response.articles);
        })

        .catch(err => {
            ui.showInfo("По вашему запросу новостей не найдено!")
        })

}




function onChangeResource(e) {
    ui.showLoader();

    http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`)

        .then (res => {
            const response = JSON.parse(res.response);
            ui.clearContainer();
            response.articles.forEach((news,index) => ui.addNews(news,index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(response.articles);
        })
        .catch(function(err) {
            ui.showError(err)
        })


}

function onChangeCategory(e) {
    ui.showLoader();
    let request;

    request = !select.value
        ? `https://newsapi.org/v2/top-headlines?category=${selectCategory.value}&apiKey=${apiKey}` :
        `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;

    http.get(request)
        .then (res => {
            const response = JSON.parse(res.response);
            ui.clearContainer();
            response.articles.forEach((news,index) => ui.addNews(news,index));
            // сохраняем новости в хранилище news-store
            newsStore.setNews(response.articles);
        })
        .catch (err => {
            ui.showInfo(`"Новости по ${selectCategory.value} по ${select.value} не найдены`);
            ui.showError(err.error);
        })

}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch(err => console.log(err));
}
function addFavorite(e) {
    if (e.target.classList.contains("add-favorite")) {
        const index = e.target.dataset.index;
        const oneNews = newsStore.getNews()[index];
        console.log(newsStore.getNews()[index]);
        news.addFavoriteNews(oneNews)
            .then(data => {
                // вывести сообщение что новость добавлена успешно
                M.toast({html: 'The news was successfully added.', classes: 'green darken-4'});
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}