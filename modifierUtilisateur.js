const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

const id = localStorage.getItem("idUtilisateur");

const form = document.getElementById("editForm");

// Charger les données de l'utilisateur
fetch(api + "/" + id)
.then(response => response.json())
.then(user => {

    document.getElementById("nom").value = user.nom;
    document.getElementById("prenom").value = user.prenom;
    document.getElementById("age").value = user.age;
    document.getElementById("pseudo").value = user.pseudo;
    document.getElementById("email").value = user.email;
    document.getElementById("pays").value = user.Pays;
    document.getElementById("devise").value = user.Devise;
    document.getElementById("couleur").value = user.couleur;
    document.getElementById("admin").value = user.admin.toString();

});

// Modifier l'utilisateur
form.addEventListener("submit", function(e){

    e.preventDefault();

    const utilisateur = {

        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        age: document.getElementById("age").value,
        pseudo: document.getElementById("pseudo").value,
        email: document.getElementById("email").value,
        Pays: document.getElementById("pays").value,
        Devise: document.getElementById("devise").value,
        couleur: document.getElementById("couleur").value,
        admin: document.getElementById("admin").value === "true"

    };

    fetch(api + "/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(utilisateur)

    })

    .then(response => response.json())

    .then(() => {

        alert("Utilisateur modifié avec succès.");

        window.location.href = "listeUtilisateurs.html";

    })

    .catch(error => console.log(error));

});