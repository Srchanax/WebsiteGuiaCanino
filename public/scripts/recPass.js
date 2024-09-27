
const user = document.querySelector(".user")
const nPass = document.querySelector(".newPass")
const cPass = document.querySelector(".confirmPass")
const bttn = document.querySelector(".button")



bttn.addEventListener("click", () => {
    if (user.value == "" || nPass.value == "" || cPass.value == "") {
        alert("Preencha todos os campos")
    } else if (nPass.value != cPass.value) {
        alert("As senhas não conferem")
    } else {
        alert("Senha alterada com sucesso")
        document.querySelector(".fRec").submit();
    }
})