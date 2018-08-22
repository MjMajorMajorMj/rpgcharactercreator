class CreateCharacter {
    constructor() {
        this.charArray = [];
        this.submitCharacter = this.submitCharacter.bind(this);
        $('.submitCharacter').on('click', this.submitCharacter);
    };
    submitCharacter() {
        const charName = $('.name').val();
        const charClass = $('#className').val();
        if (charName === "" || charClass === null) {
            console.log('whoop');
            return;
        } else {
            const newChar = new Character(charName, charClass);
            this.charArray.push(newChar);
            console.log("New Character Created");
        }
    }
}

class Character {
    constructor(charName, charClass) {
        this.name = charName;
        this.class = charClass;
        this.createStats();
        this.createItems();
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