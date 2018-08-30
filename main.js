"use strict";

//View
class CreateCharacter {
    constructor() {
        this.submitCharacter = this.submitCharacter.bind(this);
        $('.submitCharacter').on('click', this.submitCharacter);
        this.model = new Roster();
        this.render = new Render();
    };
    submitCharacter() {
        const charName = $('.name').val();
        const charClass = $('#className').val();
        if (charName === "" || charClass === null) {
            $('.name').addClass('is-invalid');
            return;
        } else {
            $('.name').removeClass('is-invalid');
            const newChar = new Character(charName, charClass);
            this.model.pushNewCharacter(newChar);
            this.render.renderOnDOM(newChar);
            console.log(this.model.charArray);
        }
    }
}

class Character {
    constructor(charName, charClass) {
        this.name = charName;
        this.class = charClass;
        this.stats = new Stats(this.class);
        this.items = new Items(this.class);
    };
    talk() {
        const talkMsg = "Hi, my name is " + this.name + " and my class is " + this.class + "."
        $('.talkModalTitle').text(this.name + " speaks!");
        $('.talkMsg').text(talkMsg);
        $('.talkModal').modal();
    }
    reroll(rerollType) {
        if (rerollType === "stats") {
            this.stats = new Stats(this.class);
        } else if (rerollType === "items") {
            this.items = new Items(this.class);
        } else if (rerollType === "both") {
            this.stats = new Stats(this.class);
            this.items = new Items(this.class);
        };
    };
};

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
//Use JSX or premake HTML element to add to DOM or clone
class Render {
    renderOnDOM(character) {
        const charContainer = $("<div>", {
            class: 'charContiner col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 d-inline-block',
            style: "border: 1px solid black; border-radius:5px; padding:10px; margin: 5px 10px"
        });
        const columnOne = $("<div>", {
            class: 'columnOne d-inline-block'
        });
        const nameText = $("<p>", {
            text: "Name: " + character.name
        });
        const classText = $("<p>", {
            text: "Class: " + character.class
        });
        const statsContainer = $("<div>", {
            class: 'stats'
        });
        const statsHeader = $("<p>", {
            text: "Stats"
        });
        const statsList = $("<ul>");
        const strength = $("<li>", {
            text: "Strength: " + character.stats.str
        });
        const dexterity = $("<li>", {
            text: "Dexterity: " + character.stats.dex
        });
        const intelligence = $("<li>", {
            text: "Intelligence: " + character.stats.int
        });
        const charisma = $("<li>", {
            text: "Charisma: " + character.stats.cha
        });
        const constitution = $("<li>", {
            text: "Constitution: " + character.stats.con
        });
        const willpower = $("<li>", {
            text: "Willpower: " + character.stats.wpr
        });
        const columnTwo = $("<div>", {
            class: 'columnTwo d-inline-block float-right'
        });
        const itemsContainer = $("<div>", {
            class: 'items'
        });
        const itemHeader = $("<p>", {
            text: "Items"
        });
        const itemsList = $("<ul>");
        const helmet = $("<li>", {
            text: "Helmet: " + character.items.head
        });
        const chest = $("<li>", {
            text: "Chest: " + character.items.chest
        });
        const hand = $("<li>", {
            text: "Hand: " + character.items.hand
        });
        const leg = $("<li>", {
            text: "Leg: " + character.items.leg
        });
        const necklace = $("<li>", {
            text: "Necklace: " + character.items.necklace
        });
        const ringOne = $("<li>", {
            text: "Ring 1: " + character.items.ringOne
        });
        const ringTwo = $("<li>", {
            text: "Ring 2: " + character.items.ringTwo
        });
        const weapon = $("<li>", {
            text: "Weapon: " + character.items.weapon
        });
        const shield = $("<li>", {
            text: "Shield: " + character.items.shield
        });
        const talkBtn = $("<button>", {
            text: "Talk",
            class: "btn btn-primary talkBtn",
            on: {
                click: character.talk.bind(character)
            }
        });
        const rerollDropDown = $("<div>", {
            class: "dropdown rerollDropDown",
        });
        const rerollBtn = $("<button>", {
            text: "Reroll",
            class: "btn btn-info dropdown-toggle rerollBtn",
            type: "button",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false"
        });
        const rerollMenu = $("<div>", {
            class: "dropdown-menu"
        });
        const rerollStatsBtn = $("<button>", {
            text: "Reroll Stats",
            class: "dropdown-item",
            type: "button",
            on: {
                click: character.reroll.bind(character, 'stats')
            }
        });
        const rerollItemsBtn = $("<button>", {
            text: "Reroll Items",
            class: "dropdown-item",
            type: "button",
            on: {
                click: character.reroll.bind(character, 'items')
            }
        });
        const rerollBothBtn = $("<button>", {
            text: "Reroll Both",
            class: "dropdown-item",
            type: "button",
            on: {
                click: character.reroll.bind(character, 'both')
            }
        });
        $(rerollMenu).append(rerollStatsBtn,rerollItemsBtn,rerollBothBtn);
        $(rerollDropDown).append(rerollBtn, rerollMenu);
        $(itemsList).append(helmet,chest,hand,leg,necklace,ringOne,ringTwo,weapon,shield);
        $(itemsContainer).append(itemHeader, itemsList);
        $(columnTwo).append(itemsContainer, talkBtn, rerollDropDown);
        $(statsList).append(strength, dexterity, intelligence, charisma, constitution, willpower);
        $(statsContainer).append(statsHeader,statsList);
        $(columnOne).append(nameText, classText, statsContainer);
        $(charContainer).append(columnOne, columnTwo);
        $(".charactersContainer").append(charContainer);
    };
};

class Stats {
    constructor(className) {
        return this.getStats(className);
    };
    getStats(className) {
        let statsObj = { str: 0, dex: 0, int: 0, cha: 0, con: 0, wpr: 0 };
        for (const key of Object.keys(statsObj)) {
            let lowNum = 3;
            let highNum = 18;
            if (className === "Rogue") {
                if ((key === "dex") || (key === "cha")) {
                    lowNum++;
                    highNum += 6;
                } else if ((key === "str") || (key === "con")) {
                    lowNum--;
                    highNum -= 6;
                };
            } else if (className === "Wizard") {
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
    };
}

class Items {
    constructor(className) {
        return this.getClass(className);
    }
    getClass(className) {
        switch (className) {
            case "Knight":
                return new KnightItems();
            case "Rogue":
                return new RogueItems();
            case "Wizard":
                return new WizardItems();
        }
    }
};

class KnightItems {
    constructor() {
        return this.createItems();
    }
    createItems() {
        let selectedItems = { head: "", chest: "", hand: "", leg: "", necklace: "", ringOne: "", ringTwo: "", weapon: "", shield: "" };
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
                if (key === itemKey) {
                    const numOfTypeItems = itemList[itemKey].length;
                    const randomItemNum = Math.floor((Math.random() * numOfTypeItems));
                    selectedItems[key] = itemList[itemKey][randomItemNum];
                }
            }
        }
        return selectedItems;
    }
}

class RogueItems {
    constructor() {
        return this.createItems();
    }
    createItems() {
        let selectedItems = { head: "", chest: "", hand: "", leg: "", necklace: "", ringOne: "", ringTwo: "", weapon: "", shield: "" };
        const itemList = {
            head: ["Leather Cap", "Leather Hood", "Rogue Scarf"],
            chest: ["Light Leather Armor", "Cloth Shirt", "Leather Bindings"],
            hand: ["Light Gloves", "Cloth Wrappings", "Fingerless Gloves"],
            leg: ["Leather Shoes", "Leather Sandals", "Cloth Foot Wrappings"],
            necklace: ["Diamond Necklace", "Necklace of Silence"],
            ringOne: ["No ring", "Ring of Silence"],
            ringTwo: ["No ring", "Ring of Silence"],
            weapon: ["Dagger", "Sharp Wire", "Poison Darts"],
            shield: ["No shield"]
        };
        for (const key of Object.keys(selectedItems)) {
            for (const itemKey of Object.keys(itemList)) {
                if (key === itemKey) {
                    const numOfTypeItems = itemList[itemKey].length;
                    const randomItemNum = Math.floor((Math.random() * numOfTypeItems));
                    selectedItems[key] = itemList[itemKey][randomItemNum];
                }
            }
        }
        return selectedItems;
    }
}

class WizardItems {
    constructor() {
        return this.createItems();
    }
    createItems() {
        let selectedItems = { head: "", chest: "", hand: "", leg: "", necklace: "", ringOne: "", ringTwo: "", weapon: "", shield: "" };
        const itemList = {
            head: ["Wizard Hat", "Wizard Top Hat", "Wizard Hood"],
            chest: ["Wizard Robes", "Cloth Robes", "Robes of Intelligence"],
            hand: ["No gloves", "Gloves of Intelligence", "Wizard Gloves"],
            leg: ["Light Sandals", "No shoes"],
            necklace: ["Necklace of Wisom", "Chain Necklace"],
            ringOne: ["Ring of Mana", "Ring of Rage"],
            ringTwo: ["Ring of Mana", "Ring of Rage"],
            weapon: ["Wand", "Staff", "Hand Magic"],
            shield: ["No shield", "Book of Spells"]
        };
        for (const key of Object.keys(selectedItems)) {
            for (const itemKey of Object.keys(itemList)) {
                if (key === itemKey) {
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