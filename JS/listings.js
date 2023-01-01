let listingData = [];


getListings();
function search() {
  const searchValue = searchForm.value;
  let filterData = listingData.filter(p => {
    return p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.body.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.author.name.toLowerCase().includes(searchValue.toLowerCase())

  });

  onResponse(filterData);



}


function getListings() {
  const headers = new Headers();
  const token = localStorage.getItem("token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token)

  const request = {
    method: "GET",
    headers: headers
  };

  fetch('https://api.noroff.dev/api/v1/auction/listings?limit=100&_seller=true&sort=created', request)
    .then((response) => response.json())
    .then((data) => {
      listingData = data;
      onResponse(data)

    })
}

function onResponse(data) {

  const listings = data;
  const postConatiner = document.getElementById('postContainer');
  postConatiner.innerHTML = "";
  listings.forEach(listing => {

    const postCardContainer = document.createElement('div');
    const postCard = document.createElement('div');
    const listingMedia = document.createElement('img');
    const listingBody = document.createElement('div');
    const listingTitle = document.createElement('h3');
    const listingDescription = document.createElement('p');
    const listingFooter = document.createElement('div');
    const authorImg = document.createElement('img');
    const authorName = document.createElement('small')
    const postCreatedDate = document.createElement('small')


    postCardContainer.classList.add('col-4');
    postCardContainer.classList.add('mb-5');
    postCard.classList.add('h-100')
    postCard.classList.add('card')

    if(listing.media) {
      listingMedia.src = listing?.media[0]

    }
    listingMedia.classList.add('card-img-top')


    listingBody.classList.add('card-body')

    listingTitle.innerHTML = listing.title
    listingTitle.classList.add('card-title')
    listingTitle.classList.add('text-center')

    listingDescription.innerHTML = listing.description
    listingDescription.classList.add('card-text')
    listingDescription.classList.add('text-center')

    listingFooter.classList.add('card-footer')


    if (!listing.seller.avatar) {
      authorImg.src = '/src/sass/img/missingImg.webp'
      authorImg.classList.add('footer-image')
    } else {
      authorImg.src = listing.seller.avatar
      authorImg.classList.add('footer-image')
    }

    authorName.innerHTML = listing.seller.name
    authorName.classList.add('text-muted')
    let dateCreated = new Date(listing.created);

    postCreatedDate.innerHTML = `${dateCreated.getDate()}.${dateCreated.getMonth()}.${dateCreated.getFullYear()}`
    postCreatedDate.classList.add('text-muted')

    postCardContainer.appendChild(postCard)
    postCard.appendChild(listingMedia)
    postCard.appendChild(listingBody)
    postCard.appendChild(listingTitle)
    postCard.appendChild(listingDescription)
    postCard.appendChild(listingFooter)
    listingFooter.appendChild(authorImg)
    listingFooter.appendChild(authorName)
    listingFooter.appendChild(postCreatedDate)

    postConatiner.appendChild(postCardContainer)
  });
}


/*this create listings*/
var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

function createPost(e) {
  const headers = new Headers();
  const token = localStorage.getItem("token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token)
  const createTittle = document.getElementById('title').value;
  const createImg = document.getElementById('imgUrl').value;
  const createBody = document.getElementById('body').value

  const create = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ "title": createTittle, "description": createBody, "media": createImg, "endsAt": new Date() + 2 })
  }

  fetch('https://api.noroff.dev/api/v1/auction/listings?sort=created', create)
    .then(response => response.json())
    .then(created => {
      document.getElementById('title').value = "";
      document.getElementById('imgUrl').value = "";
      document.getElementById('body').value = "";
      getListings
        ()
    })

}

function filterlistings() {
  const selectedFilter = document.getElementById('selectedFilter').value;


  const today = new Date();
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1);


  if (selectedFilter == 0) {
    getListings
      ()
  } else if (selectedFilter == 1) {

    let filterdData = listingData.filter(listing => {
      const postDate = new Date(listing.created)
      return today.getFullYear() == postDate.getFullYear() && today.getMonth() == postDate.getMonth() && today.getDate() == postDate.getDate();
    })
    onResponse(filterdData);
  } else if (selectedFilter == 2) {
    let filterMoreData = listingData.filter(listing => {
      const postDate = new Date(listing.created)
      return yesterday.getFullYear() == postDate.getFullYear() && yesterday.getMonth() == postDate.getMonth() && yesterday.getDate() == postDate.getDate();
    })
    onResponse(filterMoreData);
  }



}





