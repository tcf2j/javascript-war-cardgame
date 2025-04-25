//Dev: Tyler Fisher 

main();

//functions 
function main(){
    console.log("Welcome to War!");
    const button = document.getElementById('myButton');

    button.addEventListener('click', function() {
        playGame();
    });
}

function createDeck(){
    let deckNum = 13;
    let deck = new Deck(); 
    for(let i = 0; i < deckNum ; i++){
        let card1 =  createCard(i, "spades");
        let card2 = createCard(i, "hearts");
        let card3 = createCard(i, "diamonds");
        let card4 = createCard(i, "clubs");
        deck.addCard(card1);
        deck.addCard(card2);
        deck.addCard(card3);
        deck.addCard(card4);
    }
    return deck;
}

function createCard(num, suit){
    let card = new Card(num, suit);
    return card;
}

function shuffleCards(deck){
    console.log("---Shuffling The Cards---");
    let currentIndex = 52;
    //While remaining elements to shuffle 
    while (currentIndex != 0){
        //Pick remaining element 
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex = currentIndex-1;
        //Swapping with current element
        deck.changeCard(currentIndex,randomIndex);
    }
    return deck;
}

function playHand(player){
    let deck = new Deck();
    let card = new Card();
    deck = player.playDeck();
    card = deck.playCard();
    player.giveDeck(deck);
    return card;
}

function warPack(player, deck){
    let deck2 = player.getDeck();
    let num = deck2.getAmount();
    let num2 = deck.getAmount();
    let i = 0;
    while (i < num){  
        deck.addCard(deck2.playCard());
        i++;
    }
    player.theWinner(num2);
    player.removeDeck();
    player.giveDeck(deck);
}

function winner(player, winnerPile, war){
    let deck = new Deck();
    let score = 0;
    if (war == 0){
        deck = player.getDeck();
        score = winnerPile.length;
    }else if (war == 1){
        score = winnerPile.length;
    }
    for(let i = 0; i< score ; i++){
        deck.addCard(winnerPile[i]);
    }
    if (war == 0 ){
        player.theWinner(score);
        player.removeDeck();
        player.giveDeck(deck);
    }else {
        return deck;
    }
}

function playRound(player1, player2){
    
    console.log("---Playing Round---");
    let card1 = new Card();
    let card2 = new Card();
    card1 = playHand(player1);
    card2 = playHand(player2)
    console.log("YOU PLAYED THE...");
    console.log(card1.toString());
    console.log("AI BOB PLAYS... ");
    console.log(card2.toString());

    let num1 = card1.getValue();
    let num2 = card2.getValue();
    let winnerPile = [card1,card2];

    if (num1 > num2 && num2 != 0 || num1 == 0 && num2 != 0){
        console.log("You won this Round!!!");
        winner(player1, winnerPile, 0);
    }else if (num1 < num2 && num1 != 0 || num2 == 0 && num1 != 0){
        console.log("Better luck next time...");
        winner(player2, winnerPile, 0);
    }else if (num1 == num2){
        console.log("You TIED WITH AI Bob!?!");
        //No cards for war 
        if (player1.getScore() <= 3 || player2.getScore() <= 3){
            console.log("Not Enough Cards To Continue..");
            return;
        }
        war(player1, player2, winnerPile);
    }

    console.log("---CARDS LEFT---");
    console.log(`YOU : ${player1.getScore()}`);
    console.log(`AI BOB : ${player2.getScore()}`);

}

function war(player1, player2, winnerPile){
    console.log("!!!!!!!!!! WAR !!!!!!!!!!!");
    let cardPile1 = [];
    let cardPile2 = [];
    let deck1 = new Deck();
    let deck2 = new Deck();
    let card1 = new Card();
    let card2 = new Card();
    deck1 = player1.getDeck();
    deck2 = player2.getDeck();
    let num = 4;
    let i = 0;
    //grabbing cards for war 
    while (i < 4){
        cardPile1.push(playHand(player1));
        cardPile2.push(playHand(player2));
        i++;
    }
    card1 = cardPile1[3];
    card2 = cardPile2[3];
    let num1 = card1.getValue();
    let num2 = card2.getValue();
    
    console.log("YOU PLAYED THE...");
    console.log(card1.toString());
    console.log("AI BOB PLAYS... ");
    console.log(card2.toString());

    //creating one big pile of cards
    i = 0;
    while (i < 4){
        winnerPile.push(cardPile1[i]);
        winnerPile.push(cardPile2[i]);
        i++;
    }

    let deck3 = new Deck();
    if (num1 > num2 ){
        console.log("YOU WON THIS WAR!!!");
        deck3 = winner(player1, winnerPile, 1);
        warPack(player1, deck3);
    }else if (num1 < num2){
        console.log("OUCH...");
        deck3 = winner(player2, winnerPile, 1);
        warPack(player2, deck3);
    }else if (num1 == num2){
        console.log("You TIED WITH AI Bob AGAIN!?!");
        if (player1.getScore() <= 3 || player2.getScore() <= 3){
            console.log("Not Enough Cards To Continue..");
            return;
        }
        war(player1, player2, winnerPile);
    }
}

function playGame(){
    console.log("Let's get started!")
    let deck = createDeck();
    //Since console.log() passes by refernce 
    //You have to get the obj at the time like this
    // console.log(JSON.parse(JSON.stringify(deck)));
    deck = shuffleCards(deck);
    //create players
    let player1 = new Player("YOU");
    let player2 = new Player("AI BOB");
    //split cards
    let deck1 = new Deck();
    let deck2 = new Deck();
    let i = 0;
    while(i<52){
        if(i<26){
            deck1.addCard(deck.getCard(i));
        }else {
            deck2.addCard(deck.getCard(i));
        }
        i++;
    }
    //give decks to players 
    console.log("---Dealing Cards---");
    player1.giveDeck(deck1);
    player2.giveDeck(deck2);

    //Playing Round
    //Playing a whole game 
    let thisnum = player1.getScore();
    let thatnum = player2.getScore();
    while (thisnum > 1 || thatnum > 1){

        playRound(player1,player2);
        
        thisnum = player1.getScore();
        thatnum = player2.getScore();
        if (thisnum <= 0 || thatnum <= 0){
            break;
        }
    }
    if (player1.getScore() > player2.getScore()){  
        console.log(`${player1.getName()} ARE THE WINNER!!! `);
        alert(`${player1.getName()} ARE THE WINNER!!! \nGREAT JOB!!!`);
        console.log("Thank you for playing!!!");
    }else { 
        console.log(`${player2.getName()} IS THE WINNER!!! `);  
        alert(`${player2.getName()} IS THE WINNER!!! \nTRY AGAIN?`);   
        console.log("Thank you for playing!!!");
    }
}
