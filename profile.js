// Récupérer l'utilisateur connecté
const user = JSON.parse(sessionStorage.getItem("user"));

// Vérifier si l'utilisateur est connecté
if (!user) {
    window.location.href = "../login.html";
}

// Afficher les informations
document.getElementById("nom").textContent = user.nom;
document.getElementById("prenom").textContent = user.prenom;
document.getElementById("age").textContent = user.age;
document.getElementById("pseudo").textContent = user.pseudo;
document.getElementById("email").textContent = user.email;
document.getElementById("pays").textContent = user.Pays;
document.getElementById("devise").textContent = user.Devise;
document.getElementById("admin").textContent = user.admin ? "Oui" : "Non";
document.getElementById("couleur").innerHTML =
    `<span style="color:${user.couleur};font-weight:bold;">${user.couleur}</span>`;