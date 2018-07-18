// Init UI
const ui = new UI();
// Api key
const apiKey = "7a8ffd330f4a4f29b53c032a7e21f4af";
// Init Auth
const auth = new Auth();
// Init Favorite news
const news = new FavoriteNews();
// Init news store
const newsStore = NewsStore.getInstance();

// Init elements
const newsContainer = document.querySelector('.news-container');
const logout = document.querySelector(".logout");


// по загрузке страницы получить все новости избранные
window.addEventListener("load", onLoad);

// All events
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", deleteFavorite);

function onLoad(e) {
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
            if(!favoriteNews.docs.length){
                ui.showInfo('Нет избранных сообщений')
            } else {
            favoriteNews.forEach((doc) => {
                // выводим в разметку
                ui.addFavoriteNews(doc.data(), doc.id);
            });
            }
        })
        .catch(err => {
            console.log('error');
        })
}

function deleteFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
       const button = e.target;
       const id = e.target.dataset.id;

       button.closest('.col').remove();

        news.removeFavoriteNews(id)
            .then(data => {
                // вывести сообщение что новость добавлена успешно
                M.toast({html: 'The news was successfully deleted.'});
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function onLogout() {
    auth.logout()
        .then(() => window.location = 'login.html')
        .catch(err => console.log(err));
}