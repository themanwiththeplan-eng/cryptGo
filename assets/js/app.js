// vars to ref elements
let buttonEl = document.querySelector('#search');
let userInputEl = document.querySelector('#input');
let cardTextEl = document.querySelector('.card-text');
let cardTitleEl = document.querySelector('.card-title');
const containerEl = document.querySelector(".container");
// variables


// functions
function displayCoin(userCoin) {
    let apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${userCoin}&vs_currencies=USD`;
    fetch(apiUrl)
        .then(function (response) {
            return (response).json();
        }).then(function (data) {
            for (let x in data) {
                console.log(data[x].usd);
                containerEl.style.display = "block";
                const usdText = data[x].usd;
                cardTitleEl.innerHTML = userCoin;
                cardTextEl.innerHTML = "$" + usdText + "USD";

            }
        })
}

function searchCoin(userCoin) {
    var userCoin = userInputEl.value.trim();
    displayCoin(userCoin);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

// add event listeners
buttonEl.addEventListener('click', searchCoin);