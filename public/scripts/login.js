
document.querySelector(".button").addEventListener("click", () => {
  checkUserExists()
})

function checkUserExists() {
  const checkU = document.querySelector(".user").value

  const userErr = document.querySelector(".user-l")
  userErr.innerText = "- *"
  const passErr = document.querySelector(".pass-l")
  passErr.innerText = " - *"
  //document.querySelector(".text-muted").style.color = "black !important;"
  
  fetch(`/login/getU/${checkU}`)
    .then((response) => {
      if (!response.ok) {
        return false
      }
      return response.json();
    })
    .then((data) => {
      if (data == "User not found"){
        // Fazer algo aqui para denotar que o usuário não existe
        const userErr = document.querySelector(".user-l")
        userErr.innerText = " - Usuário não encontrado"
        document.querySelector(".label-u").classList.add("err");
        const passErr = document.querySelector(".pass-l")
        passErr.innerText = " - *"
        document.querySelector(".label-p").classList.add("err");
        document.querySelector(".text-muted").style = "color: red !important;"
        return false
      }
      // se o user existe checar se a senha está correta
      checkPass(data) // → passando o email digitado como parâmetro para checar a senha desse mesmo email
    })
    .catch((error) => {
      console.log(error)
      return false
    });
}

function checkPass(user) {
  const checkP = document.querySelector(".pass").value

  fetch(`/login/getP/${user}/${checkP}`)
    .then((response) => {
      if (!response.ok) {
        return false
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      if (data != "Senha correta"){
        const userErr = document.querySelector(".user-l")
        userErr.innerText = " - Usuário ou senha incorretos"
        document.querySelector(".label-u").classList.add("err");
        const passErr = document.querySelector(".pass-l")
        passErr.innerText = " - Usuário ou senha incorretos"
        document.querySelector(".label-p").classList.add("err");
        document.querySelectorAll(".text-muted").style = "color: red !important;"
        return false
      }
      // User altorizado então → submit form
      document.querySelector('.fLogin').submit();
    })
    .catch((error) => {
      console.log(error);
      return false
    });
}

document.querySelector(".gg").addEventListener("click", () => {
  window.location.href = "/login/token"
})

                                         