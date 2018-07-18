// Init Auth
const auth = new Auth();
const ui = new UI();

// Init Elements
const form = document.forms['reg-form'];
const login = document.querySelector('.login');

form.addEventListener("submit", onReg);

function onReg(e) {
    e.preventDefault();

    if (email.value && password.value) {

        auth.register(email.value, password.value)
            .then(() => {
                window.location = 'index.html';
            })
            .catch(err => {
                ui.error(err.message);
            })
    }
}

login.addEventListener("click", onLogin);
function onLogin(e) {
    e.preventDefault();
    window.location = 'login.html'
}