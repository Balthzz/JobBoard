//Redirection de page
function connectPage(){
    window.location.href = "connectPage.html";   
}
function homePage(){
    window.location.href = "index.html";
}

function displayForm(element){
    form = element.nextElementSibling
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
window.addEventListener("load", () => {
    loginStatu();
  });
async function loginStatu(){
    let statu = document.getElementById("statuLog");
    user = await check_connect();   
   
    if(user.id === undefined){
        statu.innerHTML = "login";
        statu.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "connectPage.html";
        });
    }
    else{
        statu.innerHTML = "Deconnexion";
        statu.addEventListener("click", (event) => {
            let  id = user.id;
            event.preventDefault();
            deconnexion(id);
            statu.innerHTML = "login";
     });
    }
}
async function deconnexion(id) {
    try {
        let response = await fetch(`http://localhost:8000/api/disconnect/${id}`,{
            method: "PATCH"
        });
        let data = await response.json();
        if (data === null) {
            // location.reload();
            window.location.href = "index.html"
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

// module.exports = {
//     deconnexion: deconnexion,
//     check_connect: check_connect
// }