let img = document.querySelector(".profileImg");
let userName = document.querySelector("h2");
let workAt = document.querySelector(".workAt");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let input = document.querySelector("input");

function createFollowers(value) {
  followers.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    let followersName = document.createElement("h3");
    let followersIMG = document.createElement("img");

    let x = new XMLHttpRequest();
    x.open("GET", `https://api.github.com/users/${value}/followers`);
    x.onload = function () {
      let followers = JSON.parse(x.response);
      console.log(followers);
      followersName.innerText = followers[i].login;
      followersIMG.src = followers[i].avatar_url;
    };
    li.append(followersIMG, followersName);
    followers.append(li);
    x.send();
  }
}

function createFollowering(value) {
  following.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    let followingName = document.createElement("h3");
    let followingIMG = document.createElement("img");

    let x = new XMLHttpRequest();
    x.open("GET", `https://api.github.com/users/${value}/following`);
    x.onload = function () {
      let followers = JSON.parse(x.response);
      followingName.innerText = followers[i].login;
      followingIMG.src = followers[i].avatar_url;
      console.log(followers);
    };
    li.append(followingIMG, followingName);
    following.append(li);
    x.send();
  }
}

function createUI(data, value) {
  img.src = data.avatar_url;
  userName.innerText = data.name;
  workAt.innerText = data.company;
  createFollowering(value);
  createFollowers(value);
}

function handleInput(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let user = JSON.parse(xhr.response);

      createUI(user, event.target.value);
    };
    xhr.send();
    event.target.value = "";
  }
}

input.addEventListener("keyup", handleInput);

let catImg = document.querySelector(".catImg");
let button = document.querySelector("button");

function handleClick(event) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr.onload = function () {
    let user = JSON.parse(xhr.response);
    catImg.src = user[0].url;
  };
  xhr.send();
}

button.addEventListener("click", handleClick);

// ecd28951c198f9b00a4f
