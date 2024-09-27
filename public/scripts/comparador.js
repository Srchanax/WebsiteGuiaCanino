
//const { set } = require("mongoose");
var blocksArr = [];

document.addEventListener("DOMContentLoaded", function () {
  // params são os parametros da url
  const params = new URLSearchParams(window.location.search);
  // searchN é o parametro passado na url
  const searchDog01 = params.get("dog01");
  const searchDog02 = params.get("dog02");

  searchTheDog(searchDog01);
  searchTheDog(searchDog02);
  /*
  
  const searchDog03 = params.get("dog03");
  const searchDog04 = params.get("dog04");
  const searchDog05 = params.get("dog05");
*/
/*
  if (searchDog01){
    return
  } else {
    searchTheDog(searchDog01);
  }
  if (searchDog02){
    return
  } else {
    searchTheDog(searchDog02);
  }
  if (searchDog03){
    return
  } else {
    searchTheDog(searchDog03);
  }
  if (searchDog04){
    return
  } else {
    searchTheDog(searchDog04);
  }
  if (searchDog05){
    return
  } else {
    searchTheDog(searchDog05);
  }
*/
  /*
  searchTheDog(searchDog02);
  searchTheDog(searchDog03);
  searchTheDog(searchDog04);
  searchTheDog(searchDog05);
*/

});

function searchTheDog(seachedDog){
  if (seachedDog) {
    fetch(`/api/dogs/${seachedDog}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cão não encontrad");
        }
        return response.json();
      })
      .then((dog) => {
        createColl(dog);
        setAlign();
      })
      .catch((error) => {
        displayError(error.message);
      });
  }
}

// Barra de Pesquisa e auto complete variaveis
const inp = document.getElementById("searchInput");
const results = document.getElementById("res");
const comp = document.getElementById("compara");
const resultsComp = document.getElementById("resComp");

// Evento quando digita no search bar
inp.addEventListener("input", (e) => {
  // val é oq ta sendo digitado; num é pra limitar a quantidade de resultados
  let val = e.target.value;
  let num = 0;

  

  // Mostrar o auto complete
  results.style.display = "inline";

  // Quando clica fora da barra de pesquisa
  inp.addEventListener("focusout", () => {
    setTimeout(() => {
      document.getElementById("res").style.display = "none";
      inp.value = "";
      val = "";
    }, 150);
  });

  // Script pra primeira letra digitar ser maiscula, mesmo após o espaço na barra 1
  let element = e.target;
  var words = element.value.split(" ");
  element.value = words
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");

  // Acessar db
  fetch(`/api/dogs/six/${val}`)
    .then((response) => {
      return response.json();
    })
    .then((dogs) => {
      results.innerHTML = "";
      dogs.forEach((dog) => {
        if (num === 6) return;
        const li = document.createElement("li");

        li.onclick = () => {
          window.location.href = `/compult?dog=${dog.name}`;
        };

        li.textContent = dog.nome;
        results.appendChild(li);
        li.id = "resLi";
        num++;
      });

      num = 0;
      // Caso nao tenha resultados
      if (dogs.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhum resultado encontrado";
        results.appendChild(li);
        li.id = "nn";
      }
    }); // then((dogs)
}); //Event-Input

comp.addEventListener("input", (e) => {
  // Evento quando digita no search bar

  // value é oq ta sendo digitado
  let val = e.target.value;
  let numC = 0;

  resultsComp.style.display = "inline";

  // Quando clica fora da barra de pesquisa
  comp.addEventListener("focusout", () => {
    setTimeout(() => {
      document.getElementById("resComp").style.display = "none";
      comp.value = "";
      val = "";
    }, 150);
  });

  // Script pra primeira letra digitar ser maiscula, mesmo após o espaço na barra 2 (UNPOGGERS)
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
      
      resultsComp.innerHTML = "";
      //const searchDog = new URLSearchParams(window.location.search).get("nome");
      //const searchCompara = comp.value;

      dogs.forEach((dog) => {
        if (numC === 4) return;
        const li = document.createElement("li");

        li.onclick = () => {
          console.log(dog.name + "adicionado")
          createColl(dog)
          setAlign();
          //window.location.href = `/compara?dog=${searchDog}&compara=${searchCompara}`;
        };

        li.textContent = dog.nome;
        resultsComp.appendChild(li);
        li.id = "resLi";
        numC++;
      });

      numC = 0;
      // Caso nao tenha resultados
      if (dogs.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhum resultado encontrado";
        resultsComp.appendChild(li);
        li.id = "nn";
      }
    });
});

function createColl(dog) {

  // Delete children content
  /*
    const collection = document.getElementById("myDIV").children;
    for (let i = 0; i < collection.length; i++) {
      collection[i].innerHTML = "";;
    }
  */
  
  // add class and id to a element
  /*
  element.classList.add("my-class");
  element.id = "my-id";
  */
  let rowMain = document.querySelector(".roww"); // → a div que contem todas as colunas com as informações de cachoros

  // Checkar as colunas vazias anexar o id para uma nova coluna
  let collumm;
  for (let i = 0; i < rowMain.children.length; i++){
    if (document.querySelector("#coll-" + i) == null){
      collumm = i
    }
  }

  // Criando a div que vai ter tudo 
  let coll = document.createElement("div");
  coll.classList.add("col", "col-content");
  coll.id = "coll-" + collumm;
  rowMain.appendChild(coll);

  // Div do primeiro bloco com o nome e img do dog
  const card = document.createElement("div");
  card.classList.add("col");
  card.id = "card";
  coll.appendChild(card);
  
  const x = document.createElement("div");
  x.classList.add("row");
  x.id = "x";
  card.appendChild(x);
  const s = document.createElement("div");
  x.appendChild(s)
  const p = document.createElement("p");
  p.innerText = "x";
  p.id = "p"+collumm;
  x.appendChild(p);

  p.addEventListener("click" , () => {
    coll.remove()
    console.log(coll.id + " foi removido");
    // i começa em 1 para não modificar a primeira coll (coll-topics)
    // o loop vai ate children.length - 1 para não modificar a ultima coll (coll-search)
    for (let i = 1; i < rowMain.children.length - 1; i++) {
      rowMain.children[i].id = "coll-" + i;
    }
    setAlign()
    changeOranjeWidth(".oranje", (200*(rowMain.children.length - 1)+4*(rowMain.children.length - 1))  + "px");
    
  })

  const imgCard = document.createElement("div");
  imgCard.classList.add("pokemon-card");
  card.appendChild(imgCard);
  const pName = document.createElement("h4");
  pName.id = "nome-" + collumm;
  pName.innerHTML = dog.nome;
  imgCard.appendChild(pName);
  const img = document.createElement("img");
  img.id = "dogphoto-" + collumm;
  img.src = dog.image;
  imgCard.appendChild(img);

  const cell = document.createElement("div")
  cell.classList.add("col");
  cell.id = "cell-head";
  coll.appendChild(cell);

  // Div do conteudo sobre o dog
  // Primero bloco
  const oranje1 = document.createElement("div");
  oranje1.classList.add("no-oranje-one");
  cell.appendChild(oranje1);
  
  const inf = document.createElement("div");
  inf.classList.add("col");
  inf.id = "infos1"
  cell.appendChild(inf);
  
  createRow(dog.tamanho, 1, inf);
  createRow(dog.peso, 2, inf);
  createRow(dog.corPelagem, 3, inf);
  createRow(dog.tipoPelagem, 4, inf);
  createRow(dog.expectativaVida, 5, inf);

  /*
  for (let i = 0; i <= 4; i++) {
    rowAlign(1, i);
  }
  */
  
  // Segundo bloco
  const oranje2 = document.createElement("div");
  oranje2.classList.add("no-oranje");
  cell.appendChild(oranje2);

  const inf2 = document.createElement("div");
  inf2.classList.add("col");
  inf2.id = "infos2"
  cell.appendChild(inf2);

  createRow(dog.nivelEnergia, 1, inf2);
  createRow(dog.temperamento, 2, inf2);
  createRow(dog.facilidadeTreinamento, 3, inf2);
  
  // Terceiro bloco
  const oranje3 = document.createElement("div");
  oranje3.classList.add("no-oranje");
  cell.appendChild(oranje3);

  const inf3 = document.createElement("div");
  inf3.classList.add("col");
  inf3.id = "infos3"
  cell.appendChild(inf3);

  createRow(dog.propensaoDoencasGeneticas, 1, inf3);
  createRow(dog.necessidadesCuidadosPelagem, 2, inf3);
  createRow(dog.necessidadesExercicio, 3, inf3);
  
  // Quarto bloco
  const oranje4 = document.createElement("div");
  oranje4.classList.add("no-oranje");
  cell.appendChild(oranje4);

  const inf4 = document.createElement("div");
  inf4.classList.add("col");
  inf4.id = "infos4"
  cell.appendChild(inf4);

  createRow(dog.requisitosEspaco, 1, inf4);
  createRow(dog.nivelSocializacao, 2, inf4);
  createRow(dog.nivelProtecao, 3, inf4);
  createRow(dog.nivelLatido, 4, inf4);
  
  // Quinto bloco
  const oranje5 = document.createElement("div");
  oranje5.classList.add("no-oranje");
  cell.appendChild(oranje5);

  const inf5 = document.createElement("div");
  inf5.classList.add("col");
  inf5.id = "infos5"
  cell.appendChild(inf5);
  
  createRow(dog.precoMedioCompra, 1, inf5);
  createRow(dog.custosVeterinariosMensais, 2, inf5);
  createRow(dog.custosAlimentacaoMensais, 3, inf5);

  let ss = document.querySelector("#coll-search")
  rowMain.appendChild(ss)
  // Função que cria os blocos de infos
  // content = a info que vai ser puxada da database ex: dog.peso
  // rowww = a linha do bloco para fins de alinhamento e css
  // infor = o bloco que as infos vão ser alocadas, tbm pra fins de alinhamento
  function createRow (content, rowww, infor) {
    const roww = document.createElement("div");
    roww.classList.add("row");

    if (rowww % 2 == 1) { roww.id = "r-hard"; }
    else if (rowww % 2 == 0) { roww.id = "r-soft"; }

    infor.appendChild(roww);
    const pgraph = document.createElement("p");
    pgraph.innerHTML = content;
    roww.appendChild(pgraph);
  }
}

function setAlign() {
  for (let i = 0; i <= 4; i++) {
    rowAlign(1, i);
  }
  for (let i = 0; i <= 2; i++) {
    rowAlign(2, i);
  }
  for (let i = 0; i <= 2; i++) {
    rowAlign(3, i);
  }
  for (let i = 0; i <= 3; i++) {
    rowAlign(4, i);
  }
  for (let i = 0; i <= 2; i++) {
    rowAlign(5, i);
  }

  if(document.querySelector(".roww").children.length == 7) {
    document.querySelector("#coll-search").style.display = "none";
  } else {
    document.querySelector("#coll-search").style.display = "inline";
  } 
  
}

// Função para alinhar o tamanhos das linhas de infos
// block = o bloco que vai ser checkado
// rowww = a linha que vai ser checkada
function imgAlign() {

  let card1 = document.querySelector("#coll-1 ");
}

function rowAlign(block, rowww) {
  //let b = document.querySelector("#topics5").children[2].offsetHeight

  //console.log("Bloco :" + block + " na linha :" + rowww)
  /*
  var clockArr = [];
  let collPos;
  
  collPos = document.querySelector("#coll-topics #topics" + block)
  console.log("collPos → " + document.querySelector("#coll-topics #topics" + block));
  blocksArr.push(document.querySelector("#coll-topics #topics" + block))

  collPos = document.querySelector("#coll-1 #infos" + block);  
  blocksArr.push(document.querySelector("#coll-1 #infos" + block))
  console.log("collPos → " + document.querySelector("#coll-1 #infos" + block));

  console.log(blocksArr);
  */

  let coll1 = document.querySelector("#coll-topics #topics" + block);
  //console.log(coll1);
  let coll2 = document.querySelector("#coll-1 #infos" + block);
  //console.log(coll2);
  let coll3 = document.querySelector("#coll-2 #infos" + block);
  //console.log(coll3);
  let coll4 = document.querySelector("#coll-3 #infos" + block);
  //console.log(coll4);
  let coll5 = document.querySelector("#coll-4 #infos" + block);
  let coll6 = document.querySelector("#coll-5 #infos" + block);

  /*
  let rowArr = [];
  let rowPos;

  for (let i = 0; i < blocksArr.length; i++){
    rowPos = blocksArr[i].children[rowww].children;
    rowArr.push(rowPos)
  }*/

  let rowsH = [];
  
  let row1;
  if(coll1 != null) {
    if(document.querySelector(".roww").children.length == 2){
      coll1.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
    }
    row1 = coll1.children[rowww].children[0].offsetHeight;
  }
  /*
  for (let i = 0; i < document.querySelector(".roww").children.length - 1; i++){
    console.log("Bloco :" + block + " na linha :" + rowww);

    console.log(document.querySelector("#coll-" + i + "#infos" + block).children[rowww].children[0].offsetHeight)
  }*/

  let row2;
  if(coll2 != null) {
    row2  = coll2.children[rowww].children[0].offsetHeight;
  }
  let row3;
  if(coll3 != null) {
    row3 = coll3.children[rowww].children[0].offsetHeight;
  }
  let row4;
  if(coll4 != null) {
    row4 = coll4.children[rowww].children[0].offsetHeight;
  }
  let row5;
  if(coll5 != null) {
    row5 = coll5.children[rowww].children[0].offsetHeight;
  }
  let row6;
  if(coll6 != null) {
    row6 = coll6.children[rowww].children[0].offsetHeight;
  }
  
  let check; 
  
  function checkColls() {
    if(coll1 != null && coll2 != null && coll3 != null && coll4 != null && coll5 != null && coll6 != null) {
      check = Math.max(row1, row2, row3, row4, row5, row6);
      changeOranjeWidth(".oranje", "1240px");
      console.log("check6 : " + check)
    } 
    else if(coll1 != null && coll2 != null && coll3 != null && coll4 != null && coll5 != null && coll6 == null) {
      check = Math.max(row1, row2, row3, row4, row5);
      changeOranjeWidth(".oranje", "1032px");
      console.log("check5 : " + check)
    } 
    else if(coll1 != null && coll2 != null && coll3 != null && coll4 != null && coll5 == null && coll6 == null) {
      check = Math.max(row1, row2, row3, row4);
      changeOranjeWidth(".oranje", "824px");
      console.log("check4 : " + check)
    } 
    else if(coll1 != null && coll2 != null && coll3 != null && coll4 == null && coll5 == null && coll6 == null) {
      check = Math.max(row1, row2, row3);
      changeOranjeWidth(".oranje", "616px");
      console.log("check3 : " + check);
    }
    else if(coll1 != null && coll2 != null && coll3 == null && coll4 == null && coll5 == null && coll6 == null) {
      check = Math.max(row1, row2);
      changeOranjeWidth(".oranje", "408px");
      console.log("check2 : " + check);
    } 
    else if(coll1 != null && coll2 == null && coll3 == null && coll4 == null && coll5 == null && coll6 == null) {
      check = row1;
      changeOranjeWidth(".oranje", "200px");
      console.log("check1 : " + check);
    }
  }

  checkColls();
  if (coll1 != null) {
    if(row1 != check) {
      coll1.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row1 = coll1.children[rowww].children[0].offsetHeight;
      let diff = (check - row1)/ 2 + 2;
      coll1.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }
  if (coll2 != null) {
    if(row2 != check) {
      coll2.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row2 = coll2.children[rowww].children[0].offsetHeight;
      let diff = (check - row2)/ 2 + 2;
      coll2.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }
  if (coll3 != null) {
    if(row3 != check) {
      coll3.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row3 = coll3.children[rowww].children[0].offsetHeight;
      let diff = (check - row3)/ 2 + 2;
      coll3.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }
  if (coll4 != null) {
    if(row4 != check) {
      coll4.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row4 = coll4.children[rowww].children[0].offsetHeight;
      let diff = (check - row4) / 2 + 2;
      coll4.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }
  if (coll5 != null) {
    if(row5 != check) {
      coll5.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row5 = coll5.children[rowww].children[0].offsetHeight;
      let diff = (check - row5) / 2 + 2;
      coll5.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }
  if (coll6 != null) {
    if(row6 != check) {
      coll6.children[rowww].children[0].style = "padding: 2px 0px 2px 10px";
      row6 = coll6.children[rowww].children[0].offsetHeight;
      let diff = (check - row6) / 2 + 2;
      coll6.children[rowww].children[0].style = "padding: " + diff + "px 0px " + diff +"px 10px";
      console.log("diff : " + diff);
    }
  }

  
}

function changeOranjeWidth(className, width) {
    var elems = document.querySelectorAll(className);
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.width = width;
    }
}

function displayError(message) {

}
