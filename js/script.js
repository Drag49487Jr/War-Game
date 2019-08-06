/*----- constants -----*/
var suits = ['spades', 'clubs', 'diamonds', 'hearts'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
const playerRender = document.getElementById('playerOne');
const cpuRender = document.getElementById('computer');
/*----- app's state (variables) -----*/
var playerDeck,cpuDeck,shuffledDeck,inPlay,masterDeck;

/*----- cached element references -----*/
var playerOne = document.getElementById('playerOne');
var cpu = document.getElementById('computer');

/*----- event listeners -----*/
document.querySelector('#draw').addEventListener('click', draw);
document.querySelector('#restart').addEventListener('click', reset);

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
    splitDeck();
}
function draw() {
    inPlay.push(playerDeck.pop());
    inPlay.push(cpuDeck.pop());

    console.log(inPlay);
    render();
}

function render(){
    playerOne.innerHTML = inPlay[0].value;
    cpu.innerHTML = inPlay[1].value;
    playerOne.innerHTML = `<div class = "card ${inPlay[0].suit} ${inPlay[0].rank}"></div>`;
    cpu.innerHTML = `<div class = "card ${inPlay[1].suit} ${inPlay[1].rank}"></div>`;
    renderCompareCards((inPlay[0]),(inPlay[1]));
}

function renderCompareCards(player,computer){
    let pVal = player.value;
    let cVal = computer.value;
        if (pVal > cVal){
        playerDeck.unshift(player, computer);
            } else if (pVal < cVal){
        cpuDeck.unshift(player, computer);
            } else if (pVal === cVal){
        //initWar();
     console.log('draw');
    }
     inPlay = [];
 }

/*function initWar(){
    let playWar = playerDeck.splice();
    let cpuWar = cpuDeck.splice();
        inPlay.push();
        inPlay.pu
}
*/

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
