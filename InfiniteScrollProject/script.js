// Unsplash Api
const count=30;
const apiKey=`LOlHSmXGjk3PJHknb4aidbA78jE7yvvwoXs_MLdTRSQ`;
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 


const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let photoArray=[];

//check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
}

//Helper function to Set Attributes on DOM Elements
function setAttribute(element,attributes){
    
        for(const key in attributes){
            element.setAttribute(key,attributes[key]);
        }
}
// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    //Run function for each object in photoArray
    photoArray.forEach((photo) =>{
        //Create <a> Element to link to Unsplash
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttribute(item,{
            href:photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img=document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    //Event Listener. check when each is finished loading
    img.addEventListener('load',imageLoaded);

}

//Get photos form Unsplash Api

async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photoArray=await response.json();
        displayPhotos();
    }
    catch(error){

    }
}

//Check to see if scrolling near bottom of page, Load more photos
//innerHeight=Total height of browser window
//scrollY=Distance from top of page user has scrolled
//offsetHeight=Height of everything in the body, including what is not within view
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000){
        getPhotos();
        console.log('Load More');
    }
});
//on Load
getPhotos(); 