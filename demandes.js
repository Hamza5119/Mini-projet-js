const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Demandes";

const form = document.getElementById("demandeForm");
const tbody = document.getElementById("tbody");

const user = JSON.parse(sessionStorage.getItem("user"));

// Ajouter une demande
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const demande = {

        titre: document.getElementById("titre").value,
        description: document.getElementById("description").value,
        statut: "En attente",
        utilisateur: user.nom + " " + user.prenom

    };

    fetch(api, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(demande)

    })

    .then(response => response.json())

    .then(() => {

        alert("Demande envoyée avec succès.");

        form.reset();

        chargerDemandes();

    });

});

// Charger les demandes
function chargerDemandes() {

    fetch(api)

    .then(response => response.json())

    .then(data => {

        tbody.innerHTML = "";

        data.forEach(d => {

            tbody.innerHTML += `

            <tr>

                <td>${d.id}</td>
                <td>${d.titre}</td>
                <td>${d.description}</td>
                <td>${d.statut}</td>

                <td>

                    <button onclick="accepter(${d.id})">
                        Accepter
                    </button>

                    <button onclick="refuser(${d.id})">
                        Refuser
                    </button>

                    <button onclick="supprimer(${d.id})">
                        Supprimer
                    </button>

                </td>

            </tr>

            `;

        });

    });

}

// Accepter
function accepter(id) {

    modifierStatut(id, "Acceptée");

}

// Refuser
function refuser(id) {

    modifierStatut(id, "Refusée");

}

// Modifier le statut
function modifierStatut(id, statut) {

    fetch(api + "/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            statut: statut

        })

    })

    .then(() => chargerDemandes());

}

// Supprimer
function supprimer(id) {

    if (confirm("Voulez-vous supprimer cette demande ?")) {

        fetch(api + "/" + id, {

            method: "DELETE"

        })

        .then(() => chargerDemandes());

    }

}

chargerDemandes();