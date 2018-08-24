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
        this.items = new Items(this.class);
    };
    createStats() {
        let statsObj = { str: 0, dex: 0, int: 0, cha: 0, con: 0, wpr: 0 };
        for (const key of Object.keys(statsObj)) {
            let lowNum = 3;
            let highNum = 18;
            if (this.class === "Rogue") {
                if ((key === "dex") || (key === "cha")) {
                    lowNum++;
                    highNum += 6;
                } else if ((key === "str") || (key === "con")) {
                    lowNum--;
                    highNum -= 6;
                };
            } else if (this.class === "Wizard") {
                if ((key === "int") || (key === "wpr")) {
                    lowNum++;
                    highNum += 6;
                } else if ((key === "str") || (key === "dex")) {
                    lowNum--;
                    highNum -= 6;
                };
            }
            const randomStat = Math.floor((Math.random() * (highNum - lowNum + 1)) + lowNum);
            statsObj[key] = randomStat;
        };
        return statsObj;
    }
}

class Items {
    constructor(className) {
        this.items = this.getClass(className);
    }
    getClass(className) {
        let classItems = {};
        switch (className) {
            case "Knight":
                classItems = this.getKnightItems();
                break;
            case "Rogue":
                classItems = this.getRogueItems();
                break;
            case "Wizard":
                classItems = this.getWizardItems();
                break;
        }
        return classItems;
    };
    getKnightItems() {
        return new KnightItems();
    }
    getRogueItems() {
        console.log('rge');
    }
    getWizardItems() {
        console.log('wiz');
    }
}

class KnightItems {
    constructor() {
        this.items = this.createItems();
    }
    createItems() {
        let selectedItems = {head:"", chest:"", hand:"", leg:"", necklace: "", ringOne:"", ringTwo:"", weapon:"", shield:""};
        const itemList = {
            head: ["Scout Knight Hat", "Solider Knight Helmet", "Templar Knight Helmet"],
            chest: ["Leather Knight Armor", "Standard Knight Armor", "Iron Knight Armor"],
            hand: ["Leather Knight Gloves", "Standard Knight Gloves", "Ironclad Knight Gloves"],
            leg: ["Leather Knight Leggings", "Standard Knight Boots", "Iron Knight Greaves"],
            necklace: ["Cross Necklace", "Iron Necklace"],
            ringOne: ["Iron Ring", "Cross Ring"],
            ringTwo: ["Iron Ring", "Cross Ring"],
            weapon: ["Shortsword", "Broadsword", "War Hammer"],
            shield: ["Round Shield", "Standard Shield", "Tower Shield"]
        };
        for (const key of Object.keys(selectedItems)) {
            for (const itemKey of Object.keys(itemList)) {
                if (key===itemKey) {
                    const numOfTypeItems = itemList[itemKey].length;
                    const randomItemNum = Math.floor((Math.random() * numOfTypeItems));
                    selectedItems[key] = itemList[itemKey][randomItemNum];
                }
            }
        }
        return selectedItems;
    }
}

$(document).ready(function () {
    new CreateCharacter();
});