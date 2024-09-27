
document.addEventListener("DOMContentLoaded", function () {
  fetch(`/perfil/getUser`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errr");
      }
      return response.json();
    })
    .then((user) => {
      const userr = document.querySelector(".data-user")
      const idade = document.querySelector(".data-idade")
      const clima = document.querySelector(".data-clima")
      const moradia = document.querySelector(".data-espaco")

      userr.innerText = user.user;
      idade.innerText = user.idade;
      clima.innerText = user.clima;
      moradia.innerText = user.moradia;
    })
    .catch((error) => {
      displayError(error.message);
    });
});

//document.querySelector(".submtt").addEventListener("click", () => {
//  document.querySelector("#perfil-infos").submit();
//});

document.querySelector(".edit-data").addEventListener("click", () => {
  console.log("a");
  window.location.href = "/perfil/edit"
});

document.querySelector(".searchh").addEventListener("click", () => {
  
});

