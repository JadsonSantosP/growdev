const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//loggin in the system
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Ops! Verifique o usuário ou senha.");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Ops! Verifique o usuário ou senha.");
      return;
    }
    window.location.href = "home.html";
  }


  saveSession(email, checkSession);

});

//create account
document.getElementById("create-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;
  const confirmPassword = document.getElementById("confirm-password-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com um email válido");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  myModal.hide();

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  alert("Conta criada com sucesso");
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    window.location.href = "home.html";
  }
}

function saveAccount(data) {
  console.log(data);
  localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}