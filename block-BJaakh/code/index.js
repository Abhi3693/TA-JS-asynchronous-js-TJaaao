(function(){
    let rootElm = document.querySelector(".list-holder");
    let input = document.querySelector("input");
    let main = document.querySelector(".main");
    
    
    let baseURL = `https://sleepy-falls-37563.herokuapp.com/api/todo`;
    
    let data = {};
    
    function handleInput(event){
        if(event.keyCode === 13 && event.target.value){
            let value = event.target.value;
            data = {
                todo: {
                    title: value, 
                    isCompleted: false, 
                    id: Date.now(),
                }
            };
            fetch(baseURL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => init());
            event.target.value = "";
        }
    }
    input.addEventListener("keyup", handleInput);
    
    function handleCheckBox(event){
        let id = event.target.id;
        if(event.target.checked) {
            data = {
                todo:{
                    isCompleted: true, 
                }
            };
        } else {
            data = {
                todo:{
                    isCompleted: false, 
                }
            };
        }
    
        fetch(baseURL+"/"+id, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(()=> init());
    
    }
    
    function handleDelete(event){
        let id = event.target.id;
        fetch(baseURL+"/"+id, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json'
            },
        }).then(init());
    }
    
    function handleTodoTitle(event){
        let id = event.target.id;
        let input = document.createElement("input");
        let p = event.target;
        let parent = event.target.parentElement;
        input.value = event.target.innerText;
        parent.replaceChild(input, p);
    
        input.addEventListener("keyup", (event)=> {
    
            if(event.keyCode === 13 && event.target.value){
                    data = {
                        todo:{
                            title: event.target.value, 
                        }
                    };
                fetch(baseURL+"/"+id, {
                    method: 'PUT', 
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(()=> init());
            }
        })
        
    }
    
    
    function renderUI(data){
        rootElm.innerHTML = "";
        data.todos.forEach(element => {
            let li = document.createElement("li");
            let checkbox = document.createElement("input");
            let p = document.createElement("p");
            let span = document.createElement("span");
    
            checkbox.type = "checkbox";
            checkbox.checked = element.isCompleted;
            p.innerText = element.title;
            span.innerText = "❌";
            li.id = element._id;
            checkbox.id = element._id;
            span.id = element._id;
            p.id = element._id;
    
            checkbox.addEventListener("click", handleCheckBox);
            span.addEventListener("click", handleDelete);
            p.addEventListener("dblclick", handleTodoTitle);
    
            li.append(checkbox,p,span);
            rootElm.append(li);
        });
    }
    
    function init(){
        fetch(baseURL)
        .then((res)=> {
            if(res.ok){
               return res.json();
            } else{
                throw new Error("Response is not OK! 🔴")
            }
        }).then((val)=>{
            renderUI(val);
        })
    }
    
    if(navigator.onLine){
        init();
    } else{
        main.innerHTML = "";
        main.innerText = "Check Your Internet Connection! ❌"
    }
}())