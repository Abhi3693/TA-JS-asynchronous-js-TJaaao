let rootElm = document.querySelector("ul");
let input = document.querySelector("input");

const url = `https://api.unsplash.com/photos/?client_id=BfGfY9WHuNmwncfD3J9OAAEj_8Xpx59xiPl_BXinl24`
const searchUrl = (querry)=> {
    return `https://api.unsplash.com/search/photos?client_id=BfGfY9WHuNmwncfD3J9OAAEj_8Xpx59xiPl_BXinl24&query=${querry}`
} 

function displayImages(images){
    rootElm.innerHTML = "";
    images.forEach((elm)=> {

        let li = document.createElement("li");
        let img = document.createElement("img");
        img.style.width = "400px";
        img.style.height = "400px";
        img.src = elm.urls.small;

        li.append(img);
        rootElm.append(li);
    })
}

function fetch(url){
    return new Promise((resolve, reject)=> {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = ()=> resolve(JSON.parse(xhr.response));
        xhr.onerror = ()=> reject("Something went wrong");
        xhr.send();
    })
}

function handleInput(event){
    if(event.keyCode === 13){
        fetch(searchUrl(event.target.value)).then(images=> displayImages(images.results));
        input.value = "";
    }
}

input.addEventListener("keyup", handleInput)

let images = fetch(url).then(images => {
    displayImages(images);
})
.catch(error=> console.log("not good"))