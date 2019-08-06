/*----- constants -----*/
var suits = ['spades', 'clubs', 'diamonds', 'hearts'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// build a 'master' deck of 'card' objects used to create shuffled decks
//renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
var playerDeck,cpuDeck,shuffledDeck,inPlay,masterDeck;
/*----- cached element references -----*/
var playerOne = document.getElementById('playerOne');
var cpu = document.getElementById('computer');
/*----- event listeners -----*/
document.querySelector('#draw').addEventListener('click', draw);
/*----- functions -----*/

init();
function shuffleDeck() {
  var tempDeck = masterDeck.slice();
  deck = [];
  //cpuDeck = [];
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
    
    renderCompareCards((inPlay[0]),(inPlay[1]));
}


function renderCompareCards(player,computer){
    let pVal = player.value;
    let cVal = computer.value;
    if (pVal > cVal){
        playerDeck.unshift(player, computer);
       // console.log(true);
    } else if (pVal < cVal){
        cpuDeck.unshift(player, computer);
        //console.log(false);
    } else if (pVal === cVal){
     console.log('draw');
    }
     inPlay = [];
 }




function buildMasterDeck() {
  var deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}-r${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}




