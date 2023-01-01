const token = localStorage.getItem("token");
if(token){
    document.location = "/index.html";
}

function logIn(event) {
  event.preventDefault();

    
   const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;


  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  fetch("https://api.noroff.dev/api/v1/auction/auth/login", request)
    .then((response) => response.json())
    .then((result) => onResult(result))
    .catch((error) => console.log("error", error));
}

function onResult(result){
  if (result.accessToken == undefined) {
    alert(result.message);
    return;
  }
  const token = result.accessToken;
  localStorage.setItem("token", token);
  localStorage.setItem("email", result.email)
  localStorage.setItem("name", result.name)
  document.location = "/index.html";

}


