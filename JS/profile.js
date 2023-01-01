
function getPRofile(){
  
    const headers = new Headers();
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name")
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token)
  
    const request = {
      method: "GET",
      headers: headers
    };

    fetch('https://api.noroff.dev/api/v1/auction/profiles/' + name, request)
    .then((response) => response.json())
    .then((data) => {
         onResponse(data)
    
    })
}

function onResponse (data) {
    const profileImage = document.getElementById("profileImg");
    if(data.avatar) profileImage.src = dara.avatar

    const nameElm = document.getElementById("profileName")
    profileName.innerHTML = data.name;

    const creditsElm = document.getElementById("credits");
    creditsElm.innerHTML = data.credits;

}
getPRofile();