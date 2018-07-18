
// Init Auth
const auth = new Auth();
const ui = new UI();

// Init Elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const registration = document.querySelector('.registration');

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      window.location = 'index.html';
  }
});

form.addEventListener("submit", onLogin);

function onLogin(e) {
    e.preventDefault();

    if (email.value && password.value) {
        console.log(email.value, password.value);
        auth.login(email.value, password.value)
            .then(() => {

                window.location = 'index.html';
            })
            .catch(err => {
               ui.error(err.message);
            })
    }
}
registration.addEventListener("click", onRegistration);
function onRegistration(e) {
    e.preventDefault();
    window.location = 'registration.html'
}