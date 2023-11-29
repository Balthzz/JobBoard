window.addEventListener("load", () => {
  display_advertisment();
});



//affiche une description détaillé d'une offre
function LearnMore(element) {
    console.log(element);
    var x = document.getElementById(element);
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 


function get_advertisements(table) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/table/${table}`, {
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

function get_company(table, id) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/table/${table}/${id}`, {
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



async function display_advertisment() {
    let advertisements = await get_advertisements("advertisement");
    
    
    let container = document.getElementById("display_ad"); // Remplacez "container" par l'ID réel de votre conteneur HTML

    // Ajouter données au tableau
    for (let i = 1; i < advertisements.length; i++) {
        let ad = advertisements[i];

        // Récupérer les informations de l'entreprise associée à l'annonce
        let company = await get_company("companies", ad[5]);
        company = company[1];

        // Créer un élément de div pour contenir l'annonce
        let adDiv = document.createElement("div");
        adDiv.id = ad[0];
        adDiv.className = "col-sm-4";

        // Titre de l'annonce
        let title = document.createElement("h1");
        title.innerHTML = ad[1];
        adDiv.appendChild(title);

        // Nom de l'entreprise
        let companyName = document.createElement("h2");
        companyName.innerHTML = company[1];
        adDiv.appendChild(companyName);

        // Type de contrat
        let contract = document.createElement("h3");
        contract.innerHTML = ad[2];
        adDiv.appendChild(contract);

        // Localisation
        let location = document.createElement("h4");
        location.innerHTML = company[2];
        adDiv.appendChild(location);

        // Courte description
        let shortDescription = document.createElement("p");
        shortDescription.innerHTML = ad[3];
        adDiv.appendChild(shortDescription);



        // Bouton learn more
        let learnMoreButton = document.createElement("button");
        learnMoreButton.innerHTML = "Learn More";
        learnMoreButton.addEventListener("click",() => LearnMore(`detail-${ad[0]}`))
        adDiv.appendChild(learnMoreButton);

        // Description détaillée
        let detailDescription = document.createElement("div");
        detailDescription.id = `detail-${ad[0]}`;
        detailDescription.style.display = "none"
        detailDescription.innerHTML = ad[4];
        adDiv.appendChild(detailDescription);

        // Bouton postuler
        let applyButton = document.createElement("button");
        
        applyButton.innerHTML = "Apply";
        applyButton.type = "submit";
        applyButton.addEventListener("click",(event) => {
            event.preventDefault();
            applyForm(ad[0]);
        })
        adDiv.appendChild(applyButton);

        container.appendChild(adDiv);
    }
}



 async function applyForm(id) {   
    user = await check_connect();

    if(user.id === undefined){
        window.location.href = "connectPage.html";
    }
    else{
        form = document.getElementById("applyForm");
        form.style.display = "block";
        
        document.getElementById("send").addEventListener("click", (event) => {
            event.preventDefault();
            apply(id)});
    }

    
 } 



  async function apply(id_advertisement) {
   
    user = await check_connect();
    id_peoples = user.id;
    userName = user.fisrtName;
    
    mail = document.getElementById("emailSent").value;

    
    fetch("http://localhost:8000/api/application",{
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailSent: mail,
            id_advertisement: id_advertisement,
            id_peoples : id_peoples      
        })
        })
        .then(response => response.json())
        .then(data => {
            if (data === null) {
                form = document.getElementById("applyForm");
                form.style.display = "none";
                return true;
            } 
            else {
                return false;
            }
        })

 }

 async function check_connect() {
    try {
        const response = await fetch("http://localhost:8000/api/get_connexion", {
            method: "GET"
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw error;
    }
}