/*----- constants -----*/
var suits = ['spades', 'clubs', 'diamonds', 'hearts'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',];
const playerRender = document.getElementById('playerOne');
const cpuRender = document.getElementById('computer');
const pScore = document.getElementById('p-score');
const cScore = document.getElementById('c-score');
/*----- app's state (variables) -----*/
var playerDeck, cpuDeck, shuffledDeck, inPlay, masterDeck,war,cardCounter;

/*----- cached element references -----*/
var playerOne = document.getElementById('playerOne');
var cpu = document.getElementById('computer');
var warPlayerOne = document.getElementById('warPlayerOne');
var warComputer = document.getElementById('warComputer');

/*----- event listeners -----*/
document.querySelector('#draw').addEventListener('click', draw);
document.querySelector('#restart').addEventListener('click', reset);
document.querySelector('#declare').addEventListener('click', winner);

/*----- functions -----*/

init();
function shuffleDeck() {
  var tempDeck = masterDeck.slice();
  deck = [];
  while (tempDeck.length) {
    var rndIdx = Math.floor(Math.random() * tempDeck.length);
    deck.push(tempDeck.splice(rndIdx, 1)[0]);
}
    return deck;
}

function renderScore() {
cardCounter.player = (pScore.textContent = playerDeck.length);
cardCounter.cpu = (cScore.textContent = cpuDeck.length);

}
function splitDeck() {
    playerDeck = shuffledDeck.slice(0,26);
    cpuDeck = shuffledDeck.slice(26,53);
}

function init(){
    playerRender.innerHTML = `<div class = "card back-red"></div>`
    cpuRender.innerHTML = `<div class = "card back-red"></div>`
    masterDeck = buildMasterDeck();
    shuffledDeck = shuffleDeck();
    inPlay = [];
    war = [];
    cardCounter = {
        player: 0,
        cpu:0,
    };
    splitDeck();
    renderScore();
}

function draw() {
    inPlay.push(playerDeck.pop());
    inPlay.push(cpuDeck.pop());

    render();
    renderScore();
}

function render(){
    playerOne.innerHTML = inPlay[0].value;
    cpu.innerHTML = inPlay[1].value;
    playerOne.innerHTML = `<div class = "card ${inPlay[0].suit} ${inPlay[0].rank}"></div>`;
    cpu.innerHTML = `<div class = "card ${inPlay[1].suit} ${inPlay[1].rank}"></div>`;
    renderCompareCards((inPlay[0]),(inPlay[1]));
}
function renderWarCards(){
    warPlayerOne.innerHTML = inPlay[inPlay.length - 2].value;
    warComputer.innerHTML = inPlay[inPlay.length -1].value;
    warPlayerOne.innerHTML =  `<div class = "card ${inPlay[inPlay.length - 2].suit} ${inPlay[inPlay.length - 2].rank}"></div>`;
    warComputer.innerHTML =  `<div class = "card ${inPlay[inPlay.length - 1].suit} ${inPlay[inPlay.length - 1].rank}"></div>`;
}

function renderCompareCards( player, computer,...warArry){
    let pVal = player.value;
    let cVal = computer.value;
    if (pVal > cVal){
        playerDeck.unshift(player, computer,...warArry)
    } else if (pVal < cVal){
        cpuDeck.unshift(player, computer,...warArry)
    } else if (pVal === cVal){
        initWar();
        prompt('War Has Started');
    }
    inPlay = [];
}


function initWar(){
    war = [];
    for(i= 0 ; i <= 3; i++){ 
        war.push(playerDeck.pop(i));
        war.push(cpuDeck.pop(i)); 
    }
    inPlay.push(...war);
    renderWarCards();
    renderCompareCards( inPlay[inPlay.length - 2] , inPlay[inPlay.length - 1], ...war );
}
function winner(){
    if (playerDeck.length > cpuDeck.length) {
        prompt('Player has Won')
    } else {
        prompt('Computer has Won')
    };
};
function buildMasterDeck() {
  var deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        suit: `${suit}`,
        rank: `r${rank}`,
        value: Number(rank),
      });
    });
  });
  return deck;
}

function reset(){
    init();
}