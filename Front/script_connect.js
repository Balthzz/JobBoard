// const display_connect = require("./display_connectPage")


window.addEventListener("load", () => {
    document.getElementById("create").addEventListener("click", function(event){
        event.preventDefault();        
        createAccount();
    });
    document.getElementById("login").addEventListener("click", function(event){
        event.preventDefault();        
        connectAccount();
    });
});

async function connectAccount(email = null, mdp = null) {
    user = await check_connect();
    if(user.id === undefined){
        if (email === null || mdp === null) {
            var form = document.getElementById("connectForm");
            email = form.email.value;
            mdp = form.mdp.value;
        }
        var email = encodeURIComponent(email);
        var mdp = encodeURIComponent(mdp);
    
        fetch(`http://localhost:8000/api/candidat/${email}/${mdp}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
      
            if (data === false) {
                alert("Mauvais email ou mot de passe");
            } else {
                account_connexion(data.id);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Une erreur s'est produite lors de la connexion.");
        });
    }else{
        deconnexion(user.id);
        connectAccount(email,mdp);
    }
    
}



function createAccount() {              
    
   form = document.getElementById("createForm")
   mdp1 = form.mdp1.value;
   mdp2=form.mdp2.value;
   firstName = form.firstName.value;

   if(validMDP(mdp1) == true){
    if(mdp1!=mdp2){
        alert("Erreur confirmation mot de pase");
       }
       else{
        //mdp = encode_mdp({"mdp": mdp1});
        email = form.email.value;
        mdp = mdp1
        //mdp = encode_mdp(mdp1);
        //console.log(mdp);
        
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
            if (data === null) {
                connectAccount(email, mdp);
                alert(`Compte créé avec succès \n Bienvenue ${firstName}`);

            } 
            else {
                alert("Échec de la création du compte \n erreur :",data);
            }
        })
       }    
   }
} 
function account_connexion(id){

    fetch(`http://localhost:8000/api/accountConnect/${id}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if (data[0] === "admin") {
            window.location.href = "admin_page.html";
            return "admin";
        }
        if(data[0] === "entreprise") {
            window.location.href = "company_page.html";
            return "entreprise";       
        }
        if(data[0] === "candidat"){
            window.location.href = "index.html";
            return "candidat";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
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

async function deconnexion(id) {
    try {
        let response = await fetch(`http://localhost:8000/api/disconnect/${id}`,{
            method: "PATCH"
        });
        let data = await response.json();
        if (data === null) {
            return true;
        } 
        else {
            return false;
        }
    } 
    catch (error) {
        console.error('Error:', error);        
        return false; 
    }
}
