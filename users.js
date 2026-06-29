const api = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

const tbody = document.getElementById("tbody");

// Vérifier si l'utilisateur est Admin
const user = JSON.parse(sessionStorage.getItem("user"));

if (!user || user.admin === false) {
    alert("Accès refusé !");
    window.location.href = "../layout.html";
}

// Charger la liste des utilisateurs
function chargerUtilisateurs() {

    fetch(api)
        .then(response => response.json())
        .then(data => {

            tbody.innerHTML = "";

            data.forEach(person => {

                tbody.innerHTML += `
                <tr>

                    <td>${person.id}</td>
                    <td>${person.nom}</td>
                    <td>${person.prenom}</td>
                    <td>${person.age}</td>
                    <td>${person.pseudo}</td>
                    <td>${person.email}</td>

                    <td>

                        <button class="btnVoir"
                        onclick="detailsUtilisateur(${person.id})">
                        Voir
                        </button>

                        <button class="btnModifier"
                        onclick="modifierUtilisateur(${person.id})">
                        Modifier
                        </button>

                        <button class="btnSupprimer"
                        onclick="supprimerUtilisateur(${person.id})">
                        Supprimer
                        </button>

                    </td>

                </tr>
                `;

            });

        })
        .catch(error => console.log(error));

}

chargerUtilisateurs();

// Supprimer
function supprimerUtilisateur(id){

    if(confirm("Voulez-vous supprimer cet utilisateur ?")){

        fetch(api + "/" + id,{

            method:"DELETE"

        })

        .then(()=>{

            chargerUtilisateurs();

        });

    }

}

// Voir détails
function detailsUtilisateur(id){

    localStorage.setItem("idUtilisateur",id);

    window.location.href="detailsUtilisateur.html";

}

// Modifier
function modifierUtilisateur(id){

    localStorage.setItem("idUtilisateur",id);

    window.location.href="modifierUtilisateur.html";

}