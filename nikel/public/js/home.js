const myModalElement = document.querySelector("#transaction-modal");
const myModal = new bootstrap.Modal(myModalElement);
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

//logout
document.getElementById("logout-button").addEventListener("click", logout);

// redirect page
document.getElementById("transactions-button").addEventListener("click", () => {
  window.location.href = "transactions.html";
});

//adiciona Lançamento
document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  if (type === "2" && getBalance() - value < 0) {

    const userConfirmed = confirm("Seu saldo ficará negativo. Você deseja continuar?");
    
    if (!userConfirmed) {
      return;
    }
  }

  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  getCashIn();

  alert("Adicionado com sucesso!");
});

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getCashIn();
  getCashOut();
  getTotal();
};

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getCashIn() {
  const transactions = data.transactions;

  const cashIn = transactions.filter((item) => item.type === "1");

  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

    if (cashIn.length > 5) {
      limit = 5;
    } else {
      limit = cashIn.length;
    }

    for (let i = 0; i < limit; i++) {
      cashInHtml += `
      <div class="row mb-4">
      <div class="col-12">
        <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)}</h3>
        <div class="container p-0">
          <div class="row">
            <div class="col-12 col-md-8">
              <p>${cashIn[i].description}</p>
            </div>
            <div
              class="col-12 col-md-3 d-flex justify-content-end"
            >
             ${cashIn[i].date}
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

function getCashOut() {
  const transactions = data.transactions;

  const cashIn = transactions.filter((item) => item.type === "2");

  if (cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

    if (cashIn.length > 5) {
      limit = 5;
    } else {
      limit = cashIn.length;
    }
    for (let i = 0; i < limit; i++) {
      cashInHtml += `
      <div class="row mb-4">
      <div class="col-12">
        <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)}</h3>
        <div class="container p-0">
          <div class="row">
            <div class="col-12 col-md-8">
              <p>${cashIn[i].description}</p>
            </div>
            <div
              class="col-12 col-md-3 d-flex justify-content-end"
            >
             ${cashIn[i].date}
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
    document.getElementById("cash-out-list").innerHTML = cashInHtml;
  }
};

function getTotal() {
  const transactions = data.transactions;
  let total = 0;

  transactions.forEach((item) => {
    if (item.type === "1") {
      total += item.value;
    } else {
      total -= item.value;
    }
  })
  document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
};

function getBalance() {
  let balance = 0;
  data.transactions.forEach((transaction) => {
    if (transaction.type === "1") {
      balance += transaction.value;
    } else {
      balance -= transaction.value;
    }
  });
  return balance;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};