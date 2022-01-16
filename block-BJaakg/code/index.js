(function(){
    let showCharachters = document.querySelector(".show-charachters");
    let rootElmBooks = document.querySelector(".bookList-holder");
    let rootElmCharachter = document.querySelector(".charachterList");
    let closeBtn = document.querySelector(".close-btn");
    let rootElmCharachterList = document.querySelector(".charachterList-holder");
    let sppiner = document.querySelector(".donut");
    let sppinerMain = document.querySelector(".spinner-main");
    let rootError = document.querySelector(".error");
    let main = document.querySelector(".main");
    
    let url = `https://www.anapioficeandfire.com/api/books`;
    
    function handleErrorMsg(msg = "Something Went Wrong!"){
        main.style.display = "none";
        rootError.innerText = msg;
        rootError.style.display = "block"
    }
    
    function handleSppiner(status = false){
        if(status){
            sppiner.style.display = `block`;
        } else{
            sppiner.style.display = `none`;
        }
    }
    
    function createCharachters(elm){
            let li = document.createElement("li");
            let h3 = document.createElement("h3");
            let h4 = document.createElement("h4");
            let h51 = document.createElement("h5");
            let h52 = document.createElement("h5");
            let tvSerie = elm.tvSeries.map((elm)=> elm).join(" ");
    
            h3.innerText = `Name: ${elm.name}`;
            h4.innerText = `Gender: ${elm.gender}`;
            h51.innerText = `Aliases: ${elm.aliases}`;
            h52.innerText = `TvSeries: ${tvSerie}`;
    
            li.append(h3,h4,h51,h52);
            rootElmCharachter.append(li);
    }
    
    function handleClick(links){
        rootElmCharachterList.style.display = "Block";
        rootElmCharachter.innerHTML = "";
        handleSppiner(true);
        links.forEach(element => {
            fetch(element).
            then((res)=> {
                if(res.ok){
                    return res.json();
                } else{
                    throw new Error("Response Not Ok!");
                }
            })
            .then((val)=> {
                handleSppiner();
                createCharachters(val);
            });
        });
    
    }
    
    function createBooks(val){
        rootElmBooks.innerHTML = "";
        val.forEach(element => {
            let li = document.createElement("li");
            let h2 = document.createElement("h2");
            h2.innerText = element.name;
            let h3 = document.createElement("h3");
            h3.innerText = element.authors;
            let button = document.createElement("button");
            button.classList.add("show-charachters");
            button.innerText = `Show Charachters (${element.characters.length})`
    
            button.addEventListener("click", ()=>{
                handleClick(element.characters);
            })
    
            li.append(h2,h3,button);
            rootElmBooks.append(li);
        });
    }
    
    function init(){
        rootElmBooks.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
        fetch(url)
        .then((res)=> {
            if(res.ok){
                return res.json();
            } else{
                throw new Error("Response Not Ok!");
            }
        }).then((val)=> createBooks(val))
        .catch((error) => handleErrorMsg(error));
        sppiner.style.display = "none";
    }
    
    closeBtn.addEventListener("click", ()=> {
        rootElmCharachterList.style.display = "none";
    
    })
    
    if(navigator.onLine){
        init();
    } else{
        handleErrorMsg("Check your internet Connection! ❌");
    }
    
}())