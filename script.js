const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// unsplash API

const count = 30;
const apiKey = '0CpmGNJR42JdvKxgRFV5gDEotQAnMdaDbor-81geSj8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
//check if all img were loaded
function imgLoaded() {
    console.log('img loaded');
    imagesLoaded++;
    console.log('img loaded');
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = true');
    }
}


// setAttribute on Dom Element
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}

function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //run function for each obj in photos array
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create <img> for the photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //event Listener,check when each is finished loading
        img.addEventListener('load', imgLoaded)
            // img.setAttribute('src', photo.urls.regular);
            // img.setAttribute('alt', photo.alt_description);
            // img.setAttribute('title', photo.alt_description);

        //put <img> inside <a> ,then put both inside img-container
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// get photo from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (err) {
        //catch Error
    }
}


//check to see if scrolling near bottom pf page,load more Photos
window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();

        }
    })
    // main
getPhotos();