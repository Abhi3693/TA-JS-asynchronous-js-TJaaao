let select = document.querySelector("select");
let rootElm = document.querySelector("ul");

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

function handleSubmit(event){
    let inputValue = event.target.value;
    let specialNewsData = fetch(url).then((val)=> val.json()).then((val)=> {
        let final = val.filter((elm)=> inputValue === elm.newsSite);
        if(inputValue === "all"){
            createNews(val);
        } else{
            createNews(final);
        }
    });
}

select.addEventListener("change", handleSubmit);

let count = 0;
function handleReadMore(news,li){
    if(count === 0){
            let p = document.createElement("p");
            p.innerText = news.summary;
            li.append(p);
    }
    if(count === 1){
        li.removeChild(li.childNodes[2]);
        count = 0;
        count++;
    }
    count++;
    if(count === 2){
        count = 0;
    }
}

function createNews(data) {
    rootElm.innerHTML = "";
    data.forEach((news)=> {
        let li = document.createElement("li");
        let imgHolder = document.createElement("div");
        let newsHolder = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h2");
        title.classList.add("title")
        let source = document.createElement("button");
        source.classList.add("source");
        source.innerText = news.newsSite;
        let readMore = document.createElement("button");
        readMore.classList.add("readMore");
        img.src = news.imageUrl;
        img.classList.add("newsImg");
        title.innerText = news.title;
        readMore.innerText = "Read More";

        readMore.addEventListener("click", ()=>{handleReadMore(news,li)})

        imgHolder.append(img);
        newsHolder.append(source,title,readMore);

        li.append(imgHolder,newsHolder);
        rootElm.append(li);
    })
}

let newsData = fetch(url).then((val)=> val.json()).then(createNews);