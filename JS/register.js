const token = localStorage.getItem("token");
if(token){
    document.location = "/index.html";
}

function signUp(event){
    event.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const rePassword = document.getElementById("re-password").value
    


    if(!validateFields(name,email,password,rePassword)){
        return
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          name: name,  
          email: email,
          password: password
        })
      };

    fetch("https://api.noroff.dev/api/v1/auction/auth/register", request)
    .then((response) => response.json())
    .then((result) => logIn(email, password))
    .catch((error) => console.log("error", error));

}
function validateEmail(email) {
  const regEx = /^[\w\-.]+@(stud.)?noroff.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
  }


function validateFields(name,email,password,rePassword){
//vaider email til stud.noroff.no || .noroff.no
  let message = [];
  const msg = document.getElementById("msg");

  if(!name){
    message.push('name must have a value');
  }
  if(!email){
    message.push('email must have a value');
  }
  if(!password){
    message.push('password must have a value');
  }
  if(!rePassword){
    message.push('rePassword must have a value');
  }
  if(!validateEmail(email)){
    message.push('Email must end on @stud.noroff.no or @noroff')
  }
  if(password.length < 8){
    message.push('Password must have more than 8 charathers')
  }
  if(password !== rePassword){
    message.push('rePassword need to match password')
  }
  if(message.length > 0){
    msg.innerHTML = message.join(' </br> ')
    msg.style.color = 'red';
    return false;
  }
  return true;
 
}

function logIn(email, password) {
  
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
  
  