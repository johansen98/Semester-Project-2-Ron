let listingData = [];


getListings();

function getListings() {
  const headers = new Headers();
  const token = localStorage.getItem("token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token)

  const request = {
    method: "GET",
    headers: headers
  };

  fetch('https://api.noroff.dev/api/v1/auction/profiles/' + localStorage.getItem('name') + '/listings', request)
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


    if (!listing?.seller?.avatar) {
      authorImg.src = '/src/sass/img/missingImg.webp'
      authorImg.classList.add('footer-image')
    } else {
      authorImg.src = listing.seller.avatar
      authorImg.classList.add('footer-image')
    }

    authorName.innerHTML = localStorage.getItem('name')
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
