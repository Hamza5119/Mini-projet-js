const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

// Récupérer l'utilisateur connecté
let user = JSON.parse(sessionStorage.getItem("user"));

// Vérifier si l'utilisateur est connecté
if (!user) {
    window.location.href = "../login.html";
}

// Visiteur de moins de 15 ans
if (user.admin === false && Number(user.age) < 15) {

    document.body.innerHTML = `
        <div style="padding:30px;font-family:Arial;text-align:center;">
            <h2>Accès refusé</h2>
            <p>Les visiteurs de moins de 15 ans ne peuvent pas modifier leur couleur.</p>
        </div>
    `;

} else {

    // Afficher la couleur actuelle
    document.getElementById("ancienneCouleur").textContent = user.couleur;
    document.getElementById("ancienneCouleur").style.color = user.couleur;

    // Sélectionner la couleur actuelle
    document.getElementById("couleur").value = user.couleur;

    // Modifier la couleur
    document.getElementById("btnModifier").addEventListener("click", function () {

        const nouvelleCouleur = document.getElementById("couleur").value;

        // Mettre à jour l'objet utilisateur
        user.couleur = nouvelleCouleur;

        // Mise à jour SessionStorage
        sessionStorage.setItem("user", JSON.stringify(user));

        // Mise à jour API
        fetch(api + "/" + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {

            document.getElementById("message").textContent =
                "Couleur modifiée avec succès !";

            document.getElementById("message").style.color = "green";

            // Changer immédiatement la couleur de la page
            parent.document.body.style.backgroundColor = nouvelleCouleur;

            // Mettre à jour l'affichage
            document.getElementById("ancienneCouleur").textContent = nouvelleCouleur;
            document.getElementById("ancienneCouleur").style.color = nouvelleCouleur;

        })
        .catch(error => {

            document.getElementById("message").textContent =
                "Erreur lors de la modification.";

            document.getElementById("message").style.color = "red";

            console.log(error);

        });

    });

}