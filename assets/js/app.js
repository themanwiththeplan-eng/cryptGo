// vars to ref elements
let buttonEl = document.querySelector('#search');
let userInputEl = document.querySelector('#input');
let cardTextEl = document.querySelector('.card-text');
let cardTitleEl = document.querySelector('.card-title');
const containerEl = document.querySelector(".container");
const newsEl = document.querySelector(".newsInfo");
// variables


// functions
function displayCoin(userCoin) {
    let apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${userCoin}&vs_currencies=USD`;
    fetch(apiUrl)
        .then(function (response) {
            return (response).json();
        }).then(function (data) {
            userInputEl.value = '';
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
    tickerFunc(userCoin);
}

function openNav() {
    document.querySelector("#mySidenav").style.width = "250px";
    
  }

  function closeNav() {
    document.querySelector("#mySidenav").style.width = "0";
    
  }

function tickerFunc(userCoin){
    let tickerUrl = `https://api.coingecko.com/api/v3/coins/${userCoin}/tickers`
    fetch(tickerUrl)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data.tickers[0].base);
            let ticker = data.tickers[0].base;
            const nomicsKey = `48cae1b5e956a83e976e6da5e3ec8b2def23879f`
            let nomicsUrl = `https://api.nomics.com/v1/currencies/ticker?key=${nomicsKey}&platform-currency=${ticker}&attributes=id,name`

        fetch(nomicsUrl)
            .then(function(response){
                return response.json();
            }).then(function(data){
                console.log(data);
                for(let i = 0; i < 3; i++){
                    const card = document.createElement("div");
                    card.setAttribute("class", "card");
                    const cardBody = document.createElement('div');
                    cardBody.setAttribute('class', 'card-body');
                    const h5 = document.createElement("h5");
                    let nomicsName = data[i].name;
                    h5.textContent = nomicsName;
                    let nomicsId = data[i].id;
                    const p = document.createElement('p');
                    p.textContent = nomicsId;
                    let nomicsPrice = data[i].price;
                    const p2 = document.createElement('p');
                    p2.textContent = nomicsPrice;
                    newsEl.appendChild(card);
                    card.appendChild(cardBody);
                    cardBody.appendChild(h5);
                    cardBody.appendChild(p);
                    cardBody.appendChild(p2);


                }
            })
            
        })
        
        
}


// add event listeners
buttonEl.addEventListener('click', searchCoin);