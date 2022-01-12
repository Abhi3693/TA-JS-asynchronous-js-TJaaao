let userImage = document.querySelector(".profileImg");
let userName = document.querySelector("h2");
let workAt = document.querySelector(".workAt");
let followersUL = document.querySelector(".followers");
let followingUL = document.querySelector(".following");
let input = document.querySelector("input");

function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = "";

  function createFollers(followersList) {
    let topFive = followersList.slice(0, 5);

    topFive.forEach((elm) => {
      let li = document.createElement("li");
      let followersName = document.createElement("h3");
      followersName.innerText = elm.login;
      let followersIMG = document.createElement("img");
      followersIMG.src = elm.avatar_url;
      followersIMG.alt = elm.login;
      li.append(followersIMG, followersName);
      rootElm.append(li);
    });
  }
  fetch(url, createFollers);
}

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = console.log("Something went Wrong");
  xhr.send();
}

function handleDisplay(userInfo) {
  userImage.src = userInfo.avatar_url;
  userImage.alt = userInfo.name;
  userName.innerText = userInfo.name;
  workAt.innerText = userInfo.company;
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/followers`,
    followersUL
  );
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/following`,
    followingUL
  );
}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    const url = `https://api.github.com/users/`;
    let userName = input.value;
    fetch(url + userName, handleDisplay);
    input.value = "";
  }
}

input.addEventListener("keyup", handleInput);

let catImg = document.querySelector(".catImg");
let button = document.querySelector("button");

function handleClick(event) {
  let link = `https://api.thecatapi.com/v1/images/search?limit=1&size=full`;

  fetch(link, (users) => (catImg.src = users[0].url));
}

button.addEventListener("click", handleClick);
