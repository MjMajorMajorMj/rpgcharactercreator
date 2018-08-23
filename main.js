//View
class CreateCharacter {
    constructor() {
        this.submitCharacter = this.submitCharacter.bind(this);
        $('.submitCharacter').on('click', this.submitCharacter);
        this.model = new Roster;
    };
    submitCharacter() {
        const charName = $('.name').val();
        const charClass = $('#className').val();
        if (charName === "" || charClass === null) {
            console.log('whoop');
            return;
        } else {
            const newChar = new Character(charName, charClass);
            this.model.pushNewCharacter(newChar);
            console.log("New Character Created");
        }
    }
}

//Model
class Roster { 
    constructor() {
        this.charArray = [];
    };
    pushNewCharacter(character) {
        this.charArray.push(character);
    };
};

//Controller(?)
class Character {
    constructor(charName, charClass) {
        this.name = charName;
        this.class = charClass;
        this.stats = this.createStats();
        this.items = this.createItems();
    };
    createStats() {
        console.log(this.name);
    }
    createItems() {
        console.log(this.class);
    }
}

$(document).ready(function () {
    new CreateCharacter();
});