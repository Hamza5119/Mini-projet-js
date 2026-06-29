// Vérifier si l'utilisateur est connecté
const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// Afficher le nom et prénom
document.getElementById("nomComplet").textContent =
    user.nom + " " + user.prenom;

// Changer la couleur de l'arrière-plan
document.body.style.backgroundColor = user.couleur;

// Afficher/Cacher le menu Admin
if (user.admin === false) {
    document.getElementById("adminMenu").style.display = "none";
    document.getElementById("adminAdd").style.display = "none";
}

// Déconnexion
document.getElementById("logout").addEventListener("click", function () {

    sessionStorage.removeItem("user");

    window.location.href = "login.html";

});