//View
class CreateCharacter {
    constructor() {
        this.submitCharacter = this.submitCharacter.bind(this);
        $('.submitCharacter').on('click', this.submitCharacter);
        this.model = new Roster();
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
            console.log(this.model.charArray);
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
        let statsObj = {str:0, dex:0, int:0, cha:0, con:0, wpr:0};
        for (const key of Object.keys(statsObj)) {
            let lowNum = 3;
            let highNum = 18;
            if (this.class === "Rogue") {
                if ((key === "dex") || (key === "cha")) {
                    lowNum++;
                    highNum+=6;
                } else if ((key === "str") || (key === "con")) {
                    lowNum--;
                    highNum-=6;
                };
            } else if (this.class === "Wizard") {
                if ((key === "int") || (key === "wpr")) {
                    lowNum++;
                    highNum+=6;
                } else if ((key === "str") || (key === "dex")) {
                    lowNum--;
                    highNum-=6;
                };
            }
            const randomStat = Math.floor((Math.random() * (highNum - lowNum + 1)) + lowNum);
            statsObj[key] = randomStat;
        };
        return statsObj;
    }
    createItems() {
        console.log(this.class);
    }
}

$(document).ready(function () {
    new CreateCharacter();
});