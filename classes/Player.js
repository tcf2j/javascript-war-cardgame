
class Player {
    constructor(name, array=[], score=26) {
        this.name = name;
        this.myArray = array;
        this.score = score;
     }
     //deck 
     giveDeck(deck){
        this.myArray.push(deck);
     }

     playDeck(){
        this.score -= 1;
        return this.myArray.pop();
     }

     getName(){
        return this.name;
     }

     getScore(){
        return this.score;
     }

     getDeck(){
        return this.myArray[0];
     }

     theWinner(num){
        this.score+= num;
     }
    
     removeDeck(){
        this.myArray = [];
     }

    inWar(){
        this.score -= 4;
    }

}
