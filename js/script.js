/*----- constants -----*/ 
var suits = ['s','c','d','h'];
var ranks = ['02', '03', '04', '05', '06','07','08', '09', '10', 'J', 'Q', 'K', 'A'];

var mainDeck = buildMainDeck();
renderDeckContainer(mainDeck,document.getElementById('main-deck-container');)

/*----- app's state (variables) -----*/ 
var shuffledDeck;


/*----- cached element references -----*/ 
var shuffledContainer = document.getElementById('shuffled-deck-container');


/*----- event listeners -----*/ 
document.querySelector('button').addEventListener('click', renderShuffleDeck);


/*----- functions -----*/
