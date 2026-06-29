const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

const form = document.getElementById("loginForm");
const pseudo = document.getElementById("pseudo");
const password = document.getElementById("password");
const remember = document.getElementById("remember");
const errors = document.getElementById("errors");
const btnLogin = document.getElementById("btnLogin");

let tentatives = 0;

// Remplir automatiquement si Remember Me est activé
window.onload = function () {

    const savedUser = localStorage.getItem("rememberUser");

    if (savedUser) {
        const user = JSON.parse(savedUser);

        pseudo.value = user.pseudo;
        password.value = user.password;
        remember.checked = true;
    }

};

form.addEventListener("submit", function (e) {

    e.preventDefault();

    errors.innerHTML = "";

    let listeErreurs = [];

    if (pseudo.value.trim() === "") {
        listeErreurs.push("Le nom d'utilisateur est obligatoire.");
    }

    if (password.value.trim() === "") {
        listeErreurs.push("Le mot de passe est obligatoire.");
    }

    if (listeErreurs.length > 0) {
        afficherErreurs(listeErreurs);
        return;
    }

    fetch(api)
        .then(response => response.json())
        .then(users => {

            const utilisateur = users.find(user =>
                user.pseudo === pseudo.value &&
                user.MotDePasse === password.value
            );

            if (utilisateur) {

                // SessionStorage
                sessionStorage.setItem("user", JSON.stringify(utilisateur));

                // Remember Me
                if (remember.checked) {

                    localStorage.setItem("rememberUser", JSON.stringify({
                        pseudo: pseudo.value,
                        password: password.value
                    }));

                } else {

                    localStorage.removeItem("rememberUser");

                }

                window.location.href = "layout.html";

            } else {

                tentatives++;

                afficherErreurs([
                    "Nom d'utilisateur ou mot de passe incorrect."
                ]);

                if (tentatives >= 3) {
                    btnLogin.disabled = true;
                }

            }

        })
        .catch(error => {

            afficherErreurs([
                "Erreur de connexion à l'API."
            ]);

            console.log(error);

        });

});

function afficherErreurs(tab) {

    errors.innerHTML = "";

    tab.forEach(message => {

        const li = document.createElement("li");

        li.textContent = message;

        errors.appendChild(li);

    });

}