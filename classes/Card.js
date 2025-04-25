
class Card {
    constructor(value, suit) { 
        this.value = value;
        this.suit = suit;
    }

    getValue(){
        return this.value;
    }
    getSuit(){
        return this.suit;
    }
    
    toString(){
        if(this.value == 12){
            return `King of ${this.suit} `;
        }else if(this.value == 11){
            return `Queen of ${this.suit} `;
        }else if(this.value == 10){
            return `Jack of ${this.suit} `;
        }else if(this.value == 0){
            return `ACE of ${this.suit} `;
        }else {
            return `${this.value+1} of ${this.suit} `;
        }
    }
}
