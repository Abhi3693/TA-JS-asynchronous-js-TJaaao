let select = document.querySelector("select");
let rootElm = document.querySelector("ul");

rootElm.innerText = "Loading the data";

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let allNews;
function handleSubmit(event) {
  let inputValue = event.target.value;
  let final = allNews.filter((elm) => inputValue === elm.newsSite);
  if (inputValue === "all") {
    renderNews(allNews);
  } else {
    renderNews(final);
  }
}

select.addEventListener("change", handleSubmit);

function displayOptions(site) {
  site.forEach((elm) => {
    let option = document.createElement("option");
    option.value = elm;
    option.innerText = elm;
    select.append(option);
  });
}

function renderNews(data) {
  rootElm.innerHTML = "";
  data.forEach((news) => {
    let imgHolder = document.createElement("div");
    let newsHolder = document.createElement("div");
    let li = document.createElement("li");

    let img = document.createElement("img");
    img.src = news.imageUrl;
    img.classList.add("newsImg");

    let title = document.createElement("h2");
    title.classList.add("title");
    title.innerText = news.title;

    let source = document.createElement("button");
    source.classList.add("source");
    source.innerText = news.newsSite;

    let a = document.createElement("a");
    let readMore = document.createElement("button");
    a.href = news.url;
    a.innerText = "Read More";

    readMore.classList.add("readMore");

    let p = document.createElement("p");
    p.innerText = news.summary;

    readMore.append(a);

    imgHolder.append(img);
    newsHolder.append(source, title, p, readMore);

    li.append(imgHolder, newsHolder);
    rootElm.append(li);
  });
}

let newsData = fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`SomeThing went Wrong: ${res.status}`);
    }
    return res.json();
  })
  .then((val) => {
    if (Array.isArray(val)) {
      allNews = val;
      // setTimeout(() => {
      renderNews(val);
      // }, 5000);
      let allSources = Array.from(new Set(val.map((elm) => elm.newsSite)));
      displayOptions(allSources);
    }
  })
  .catch((error) => {
    rootElm.innerText = error;
  })
  .finally(() => console.log("loading is completed"));
