let ul = document.querySelector("ul");
let input = document.querySelector("input");

const url = `https://api.unsplash.com/photos/?client_id=uKVp02dxQxC8uddVoHKxEEo23WTT7But75Mgf7dMVHQ`;

const searchUrl = (querry)=> {
    let searchFor = `https://api.unsplash.com/search/photos?query=${querry}&client_id=uKVp02dxQxC8uddVoHKxEEo23WTT7But75Mgf7dMVHQ`;
    return searchFor;
} 

function fetch(url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = ()=> successHandler(JSON.parse(xhr.response));
    xhr.onerror = ()=> console.log("Something Went wrong");
    xhr.send();
}

function createImages(images) {
    ul.innerHTML = ""
    images.forEach((elm)=> {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = elm.urls.small;
        img.style.width = "400px";
        img.style.height = "400px";
        li.append(img);
        ul.append(li);
    })
}

function handleInput(event){
    if(event.keyCode === 13 && input.value){
        fetch(searchUrl(event.target.value), (images)=> {
            createImages(images.results)
        });
        input.value = "";
    }
}

fetch(url,createImages);
input.addEventListener("keyup", handleInput)
