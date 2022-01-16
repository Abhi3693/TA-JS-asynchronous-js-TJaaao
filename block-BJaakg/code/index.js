(function () {
  let rootElmBooks = document.querySelector(".bookList-holder");
  let rootElmCharachter = document.querySelector(".charachterList");
  let closeBtn = document.querySelector(".close-btn");
  let rootElmCharachterList = document.querySelector(".charachterList-holder");
  let rootError = document.querySelector(".error");
  let main = document.querySelector(".main");
  let spinnerHolder = document.querySelector(".spinner-holder");
  let spinnerHolderMain = document.querySelector(".spinner-holder-main");

  let url = `https://www.anapioficeandfire.com/api/books`;

  function handleErrorMsg(msg = "Something Went Wrong!") {
    main.style.display = "none";
    rootError.innerText = msg;
    rootError.style.display = "block";
  }

  function handleSppiner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
    } else {
      rootElm.innerHTML = "";
    }
  }

  function createCharachters(links) {
    handleSppiner(spinnerHolder, true);
    rootElmCharachter.innerHTML = "";
    Promise.all(
      links.map((indi) => fetch(indi).then((res) => res.json()))
    ).then((charachtersData) => {
      charachtersData.forEach((elm) => {
        handleSppiner(spinnerHolder, false);
        let li = document.createElement("li");
        li.innerText = `${elm.name} : (${elm.aliases.join(" ")})`;
        rootElmCharachter.append(li);
      });
    });
  }

  function createBooks(val) {
    rootElmBooks.innerHTML = "";
    handleSppiner(spinnerHolderMain, false);
    val.forEach((element) => {
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      h2.innerText = element.name;
      let h3 = document.createElement("h3");
      h3.innerText = element.authors;
      let button = document.createElement("button");
      button.classList.add("show-charachters");
      button.innerText = `Show Charachters (${element.characters.length})`;

      button.addEventListener("click", () => {
        rootElmCharachterList.style.display = "Block";
        createCharachters(element.characters);
      });

      li.append(h2, h3, button);
      rootElmBooks.append(li);
    });
  }

  function init() {
    handleSppiner(rootElmBooks, true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Response Not Ok!");
        }
      })
      .then((val) => createBooks(val))
      .catch((error) => handleErrorMsg(error))
      .finally(() => {
        handleSppiner(spinnerHolderMain);
      });
  }

  closeBtn.addEventListener("click", () => {
    rootElmCharachterList.style.display = "none";
  });

  if (navigator.onLine) {
    init();
  } else {
    handleErrorMsg("Check your internet Connection! ❌");
  }
})();
