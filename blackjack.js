var dealerSum = 0; // dealer's total card sum
var yourSum = 0; // your total card sum

var dealerAceCount = 0; // dealer's # aces
var yourAceCount = 0; // your # aces

var hidden; //boolean value for dealer's hidden card
var deck; //2-D array (contains the deck of cards)

var canHit = true; //boolean value to check if more cards can be drawn

//functions executed when window loads
window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

// creating a deck with all 52 cards
function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

// shuffling the deck to jumble the drawn cards
function shuffleDeck(){
    for(let i = 0; i<deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}


function startGame(){
    hidden = deck.pop(); //popping a random card from the deck
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);


    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        cardImg.draggable = false;
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for(let i = 0; i < 2; i ++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        cardImg.draggable = false;
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

// function to add another card
function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    cardImg.draggable = false;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }
}

//function to declare results and to end the game
function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if(yourSum > 21){
        message = "You Lose!";
    }
    else if(dealerSum > 21){
        message = "You Win!";
    }
    else if(yourSum == dealerSum){
        message = "Tied!";
    }
    else if(yourSum > dealerSum){
        message = "You Win!"
    }
    else if(yourSum < dealerSum){
        message = "You Lose!";
    }
    
     // final result
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
   

 }

// treat ACE as 1 when total sum crosses 21
function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;

}

//function to retrieve numeric value of each card
function getValue(card){
    let data = card.split("-"); //eg: "A-D" --> ["A","D"]
    let value = data[0]; //getting the value

    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value); // returning the integer value
}

//function to check if the card is an ACE
function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}
