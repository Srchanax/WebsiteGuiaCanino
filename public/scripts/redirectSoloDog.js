
/*
document.getElementById("searchForm").addEventListener("submit", function (event) {
    const dog01 = document.getElementById("searchInput").value;
    const dog02 = document.getElementById("searchInput2").value;
    console.log("Subimti")
    if (dog01 != "" && dog02 != "") {
        console.log("submit12")
        this.action = `compult?dog01=${dog01}&&dog02=${dog02}`;
    } 
    else if (dog01 != "" && dog02 == "") {
        console.log("submit1")
        this.action = `compult?dog01=${dog01}`;
    } 
    else if (dog01 == "" && dog02 != "") {
        console.log("submit2")
        this.action = `compult?dog01=${dog02}`;
    }

});
*/
document.addEventListener("DOMContentLoaded", function () {  
    const sbarI = document.querySelector("#sbar-2");
    sbarI.style.display= "none";
    sbarI.classList.remove("col-5");
});
window.addEventListener("resize", (event) => {
    if (window.innerWidth <= 1000){
        // element.classList.remove("mystyle");
        const sBar = document.querySelector("#searchbar")
        sBar.style.display = "none"
        sBar.classList.remove("col-7");
        document.querySelector("#headerButtons").classList.remove("col-3");
        document.querySelector("#headerButtons").classList.add("col-10");
        document.querySelector("#headerButtons").style.display= "flexbox";
    }
    else {
        document.querySelector("#searchbar").style.display = "inline"
        document.querySelector("#searchbar").classList.add("col-7");
        document.querySelector("#headerButtons").classList.remove("col-10");
        document.querySelector("#headerButtons").classList.add("col-3");
    }
});

 document.querySelector("#searchInput").addEventListener("click", () => {
     const sbarA = document.querySelector("#sbar-1");
      sbarA.classList.remove("col-10");
      sbarA.classList.add("col-5");
     
     const sbarI = document.querySelector("#sbar-2");
     sbarI.style.display= "inline";
     sbarI.classList.remove("col-1");
     sbarI.classList.add("col-5");
 })
 

document.querySelector(".buttn").addEventListener("click", () => {
    console.log("Click")
    if(document.querySelector("#searchInput").value != "" && document.querySelector("#searchInput2").value != "") {
        document.querySelector('#searchForm').submit();
    } else if (document.querySelector("#searchInput").value != "" && document.querySelector("#searchInput2").value == ""){
        document.querySelector('#searchForm').submit();
    }
});

// Barra de Pesquisa
const inpp = document.getElementById("searchInput");
const inpp2 = document.getElementById("searchInput2"); //Variavéis da barra de pesquisa 2

const resultss = document.getElementById("res"); 
const resultss2 = document.getElementById("res2"); //Variavéis da barra de pesquisa 2

// evento quando clica na barra de pesquisa (POGGERS!)
inpp.addEventListener("focusin", () => {
    resultss.style.display = "inline";
    resultss.style.marginTop = "3px";
    resultss.style.backgroundColor = "red";
});

inpp2.addEventListener("focusin", () => { //Clone
    resultss2.style.display = "inline";
    resultss2.style.marginTop = "3px";
    resultss2.style.backgroundColor = "red";
});

// Script que desativa os pre set de pesquisa quando clicka fora da barra de pesquisa (POGGERS!!!)

inpp.addEventListener("focusout", (event) => {
    setTimeout(() => {
        document.getElementById("res").style.display = "none";
        //inpp.value = "";
    }, 150);
});
inpp2.addEventListener("focusout", (event) => { // Clone
    setTimeout(() => {
        document.getElementById("res2").style.display = "none";
        //inpp2.value = "";
    }, 150);
});
    
inpp.addEventListener("input", (e) => {
// Evento quando digita no search bar
    
// value é oq ta sendo digitado
let val = e.target.value;
let num = 0;

// Script pra primeira letra digitar ser maiscula, mesmo após o espaço (POGGERS!!!)
let element = e.target;
var words = element.value.split(" ");
element.value = words
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");

fetch(`/api/dogs/six/${val}`)
    .then((response) => {
        return response.json();
    })
    .then((dogs) => {
        resultss.innerHTML = "";
        dogs.forEach((dog) => {
            if(num === 6) return;
            const li = document.createElement("li");

            li.onclick = () => {
                inpp.value = dog.nome;
                //window.location.href = `compult?dog=${dog.nome}`;
            };

            li.addEventListener("mouseover", () => {
                li.style.cursor = "pointer";
            });

            li.textContent = dog.nome;
            resultss.appendChild(li);
            li.id = 'resLi';
            num++
        });
        num = 0;
        if (dogs.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'Nenhum resultado encontrado';
          resultss.appendChild(li)
          li.id = 'nn';
        }
    });

});

inpp2.addEventListener("input", (e) => { //Clone
// Evento quando digita no search bar
    
// value é oq ta sendo digitado
let val = e.target.value;
let num = 0;

// Script pra primeira letra digitar ser maiscula, mesmo após o espaço (POGGERS!!!)
let element = e.target;
var words = element.value.split(" ");
element.value = words
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");

fetch(`/api/dogs/six/${val}`)
    .then((response) => {
        return response.json();
    })
    .then((dogs) => {
        resultss2.innerHTML = "";
        dogs.forEach((dog) => {
            if(num === 6) return;
            const li = document.createElement("li");

            li.onclick = () => {
                inpp2.value = `${dog.nome}`;
                
                //window.location.href = `compult?dog=${dog.nome}`;

                const button = document.getElementById("sB");
                if(inpp2.value != ""){
                    button.value = "Comparar";
                    button.textContent = "Comparar";
                }
                else{
                    button.value = "Pesquisar";
                    button.textContent = "Pesquisar";
                }
            };

            li.addEventListener("mouseover", () => {
                
                li.style.cursor = "pointer";
            });

            li.textContent = dog.nome;
            resultss2.appendChild(li);
            li.id = 'resLi';
            num++
        });
        num = 0;
        if (dogs.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'Nenhum resultado encontrado';
          resultss2.appendChild(li)
          li.id = 'nn';
        }
    });

});