const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

const form = document.getElementById("registerForm");
const errors = document.getElementById("errors");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    errors.innerHTML = "";

    let listeErreurs = [];

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const age = document.getElementById("age").value.trim();
    const pseudo = document.getElementById("pseudo").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const admin = document.getElementById("admin").value === "true";
    const couleur = document.getElementById("couleur").value;

    // Vérifier les champs obligatoires
    if (!nom || !prenom || !age || !pseudo || !email || !password || !confirmPassword) {
        listeErreurs.push("Tous les champs sont obligatoires.");
    }

    // Validation du mot de passe
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password)) {
        listeErreurs.push("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
    }

    // Confirmation du mot de passe
    if (password !== confirmPassword) {
        listeErreurs.push("Les mots de passe ne correspondent pas.");
    }

    if (listeErreurs.length > 0) {
        afficherErreurs(listeErreurs);
        return;
    }

    const utilisateur = {
        nom: nom,
        prenom: prenom,
        age: age,
        pseudo: pseudo,
        email: email,
        MotDePasse: password,
        admin: admin,
        couleur: couleur,
        avatar: "",
        photo: "",
        Devise: "",
        Pays: ""
    };

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utilisateur)
    })
        .then(response => response.json())
        .then(data => {
            alert("Compte créé avec succès !");
            window.location.href = "login.html";
        })
        .catch(error => {
            afficherErreurs(["Erreur lors de la création du compte."]);
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