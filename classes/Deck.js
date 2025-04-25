
class Deck {
    constructor(array =[]) { 
        this.myArray = array;
        this.amount = 0;
    }

    addCard(card) {
        this.myArray.push(card);
        this.amount += 1;
    }

    getCard(index){
        return this.myArray[index];
    }

    changeCard(current, random){
        //Shuffling itself is pretty good
        let x = this.myArray[current]
        let y = this.myArray[random];
        this.myArray[current] = y;
        this.myArray[random] = x;
    }

    playCard(){
        this.amount -= 1;
        return this.myArray.pop();
    }

    getAmount(){
        return this.amount;
    }
}
