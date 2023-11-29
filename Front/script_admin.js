
//Affichage des tables de la database quand la page charge 
window.addEventListener("load", () => {
    create_table("peoples");
    create_table("advertisement");
    create_table("companies");
    create_table("application");

});


//Récupération des données dans la database
function get_dataTable(tableName) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/table/${tableName}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
}


//Création de tables pour afficher les données
async function create_table(tableName) {    
    let container = document.getElementById("tableSection");

    try {
        var data = await get_dataTable(tableName);

        titleTable = document.createElement("caption");
        titleTable.innerHTML = tableName;
        container.appendChild(titleTable);

        //Creation bouton modifier
        let modifyButton = document.createElement("button");
        modifyButton.innerHTML = "Modifier";
        modifyButton.className = "btn btn-outline-danger";
        modifyButton.addEventListener("click",(event) => {
            event.preventDefault();
            modify_table(tableName);    
        })
        container.appendChild(modifyButton);

        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));



        

        const table = document.createElement('table');
        table.id = tableName;
        table.className = "table table-dark ";
        table.style.display = "block";


        const headerRow = document.createElement('tr');

        // Ajouter noms de colonnes au tableau
        for (var i = 0; i < data[0].length; i++) {
            const headerCell = document.createElement('th');
            headerCell.id = data[0][i];
            headerCell.textContent = data[0][i];
            headerCell.scope = "col";

            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Ajouter données au tableau

        //Iteration dans les lignes
        for (var i = 1; i < data.length; i++) {
            let id_row = data[i][0];

            const dataRow = document.createElement('tr');
            dataRow.id = `row-${i}`;

            //itération dans les colones
            for (var j = 0; j < data[i].length; j++) {
                const dataCell = document.createElement('td');
                dataCell.id = `cell-${i}-${j}`;
                dataCell.textContent = data[i][j];
                if(data[0][j] ==="token" && data[i][j] != null){
                    dataCell.textContent = "connecté";
                }
                dataRow.appendChild(dataCell);
            }
            table.appendChild(dataRow);
            //Bouton supprimer
            let delButton = document.createElement("button");
            delButton.innerHTML = "Supprimer";
            delButton.className = "btn btn-outline-danger";
            delButton.addEventListener("click",(event) => {
                event.preventDefault();
                deleteRaw(tableName,id_row);
            })
            dataRow.appendChild(delButton);
        }        
        // Ajouter le tableau à l'élément avec l'ID "peopleSection"
        container.appendChild(table);

        //Création du bouton pour ajouter un rang à la tables
        let addButton = document.createElement("button");
        addButton.id = "add";
        addButton.innerHTML = "Ajouter";
        addButton.className = "btn btn-outline-danger";
        addButton.addEventListener("click",(event) => {
            event.preventDefault;
            addRaw(tableName);
        })
        container.appendChild(addButton);

        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
        
       
        
    } 

    catch (error) {
        console.error('Error:', error);
    }
}


//Modification des tables affichées
function modify_table(tableID) {
    var table = document.getElementById(tableID);
    const cells = table.querySelectorAll('[id^="cell-"]');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            update = prompt("Modifier :", cell.innerHTML);
            cell.innerHTML = update;
            let row = cell.id.charAt(5);
            let column = cell.id.charAt(7);
            let id = table.querySelector(`#cell-${row}-0`).textContent;
            let columnName = table.getElementsByTagName("th")[column].textContent;
            modify_DataBase(tableID, columnName, update, id);
        });
    });
}


//Envoie des modifications à la database
function modify_DataBase(table, dataName, update, id) {
    fetch(`http://localhost:8000/api/table`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table: table,
            dataName: dataName,
            update: update,
            id: id
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data === null) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function deleteRaw(table, id){
    fetch(`http://localhost:8000/api/table/${table}/${id}`, {
        method: "DELETE"
    })    
    .then(response => response.json())
    .then(data => {
        if (data === null) {
            location.reload();
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

}

function addRaw(table){
    console.log(table);
    let form = document.getElementById(`form_${table}`);

    //Display form :
    form.style.display = "block";


    if(table === "peoples"){
        document.getElementById("addPeople").addEventListener("click",(event) => {
            event.preventDefault();
            addPeople();
        })        
    } 
    if(table === "companies"){
        document.getElementById("addCompany").addEventListener("click",(event) => {
            event.preventDefault();
            addCompany();
        })        
    }
    if(table === "advertisement"){
        document.getElementById("addAdvertisement").addEventListener("click",(event) => {
            event.preventDefault();
            addAdvertisement();
        })        
    }        
    if(table === "application"){
        document.getElementById("addApplication").addEventListener("click",(event) => {
            event.preventDefault();
            addApplication();
        })        
    }        
}

/////////////////////
function addPeople() {              
    let form = document.getElementById("add_people_form");
    mdp1 = form.mdp1.value;
    mdp2 = form.mdp2.value;
    firstName = form.firstName.value;

    if(validMDP(mdp1) == true){
     if(mdp1!=mdp2){
         alert("Erreur confirmation mot de pase");
        }
        else{
         
         email = form.email.value;
         mdp = mdp1;
        
         
         fetch("http://localhost:8000/api/candidat",{
             method : "POST",
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 firstName: form.firstName.value,
                 lastName: form.lastName.value,
                 statu: form.statu.value,
                 tel: form.tel.value,
                 email: email,
                 mdp: mdp
             })
             })
             .then(response => response.json())
             .then(data => {
                console.log(data);
             if (data === null) {
                 
                 alert(`Compte créé avec succès`);
                 location.reload();
 
             } 
             else {
                 alert("Échec de la création du compte \n erreur :",data);
             }
         })
        }    
    }
 } 
 function validMDP(mdp) {
    var mdpError = document.getElementById("mdpError");
    var passwordPattern = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).*$/;

    if (mdp.length < 8 || !passwordPattern.test(mdp)) {
        mdpError.textContent = "Le mot de passe doit avoir au moins 8 caractères, un caractère spécial, un chiffre et une majuscule.";
        return false;

    } else {
        mdpError.textContent = "";
        return true;
    }
}

/////////////////////
function addCompany() {              
    let form = document.getElementById("add_companies_form");
    companyName = form.name.value;
    locationAdress = form.locationAdress.value;
    sector = form.sector.value;           
         
    fetch("http://localhost:8000/api/company",{
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : companyName,
            locationAdress : locationAdress,
            sector : sector        
        })
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data === null) {
            
            alert(`Compagnie ajoutée avec succès`);
            location.reload();

        } 
        else {
            alert("Échec de l'ajout de la compagnie \n erreur :",data);
        }
    })        
    
 } 


 /////////////////////
function addAdvertisement() {              
    let form = document.getElementById("add_advertisement_form");
    titleAd = form.titleAd.value;
    contract = form.contract.value;
    shortDescription = form.shortDescription.value;  
    detailDescription = form.detailDescription.value; 
    id_companies = form.id_companies.value;         
         
    fetch("http://localhost:8000/api/advertisement",{
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title : titleAd,
            contract : contract,
            shortDescription : shortDescription,
            detailDescription : detailDescription,
            id_companies : id_companies  
        })
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data === null) {
            
            alert(`Annonce ajoutée avec succès`);
            location.reload();

        } 
        else {
            alert("Échec de l'ajout de la anonce \n erreur :",data);
        }
    })        
    
 } 

 

  /////////////////////
function addApplication() {              
    let form = document.getElementById("add_application_form");
    emailSent = form.emailSent.value;
    adID = form.adID.value;
    peopleID = form.peopleID.value;        
         
    fetch("http://localhost:8000/api/application",{
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailSent : emailSent,
            id_advertisement : adID,
            id_peoples : peopleID          
        })
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data === null) {
            
            alert(`Candidature ajouter avec succès`);
            location.reload();

        } 
        else {
            alert("Échec de l'ajout de la candidature \n erreur :",data);
        }
    })        
    
 } 