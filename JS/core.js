const token = localStorage.getItem("token");

if(!token){
    document.location = "login.html";
}

function logOut(event){
    event.preventDefault();
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    document.location = "login.html";

}
