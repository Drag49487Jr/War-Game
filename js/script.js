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
    splitDeck();
    cardCounter = {
        player: 0,
        cpu:0,
    };
renderScore();
}

function draw() {
    inPlay.push(playerDeck.pop());
    inPlay.push(cpuDeck.pop());

    console.log(inPlay);
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

function renderCompareCards( player, computer,...warArry){
    let pVal = player.value;
    let cVal = computer.value;

        if (pVal > cVal){
        playerDeck.unshift(player, computer,...warArry);
            } else if (pVal < cVal){
        cpuDeck.unshift(player, computer,...warArry);
            } else if (pVal === cVal){
        initWar();
    }
     inPlay = [];
 }

function initWar(){
    // create one war array,
    // alert the client that war has been initiated
    // push current hand into newly instantiated war array
    // then we will split off three cards from each array, and push into war array
    // * display the values from each player that are at stake from the war array
    war = [];
    for(i= 0 ; i <= 3; i++){ 
        war.push(playerDeck.pop(i));
        war.push(cpuDeck.pop(i)); 
    }
    // this here will go bye bye =========
    inPlay.push(...war);
   
renderCompareCards( inPlay[inPlay.length - 2] , inPlay[inPlay.length - 1], ...war );
    
    
    // after the new war array is filled with the "at stake cards" we will then call the draw method to get the cards to be compared to determines who will win the war
    
    // then pass the new draw values into the compare function 
    // *** look into passing down object
}



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
