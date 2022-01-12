let ul = document.querySelector("ul");
let input = document.querySelector("input");

function handleInput(event){
    ul.innerHTML = "";
    if(event.keyCode === 13){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.unsplash.com/search/collections/?client_id=ppyMHhcLdYZE7vLCZaKd7PE4ReYCTo8yyK9BcWYmgPg&query=${input.value}`)
        xhr.onload = function(){
           let user = JSON.parse(xhr.response);
           user.results.forEach((elm)=> {
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.src = elm.cover_photo.urls.small;
                li.append(img);
                ul.append(li);
           })
        }
        xhr.onerror = ()=> console.log("Something Went wrong");
        xhr.send();
        
    }
}

input.addEventListener("keyup", handleInput)