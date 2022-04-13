// �������� 
var RARITY;
(function (RARITY) {
    RARITY[RARITY["COMMON"] = 0] = "COMMON";
    RARITY[RARITY["RARE"] = 1] = "RARE";
    RARITY[RARITY["EPIC"] = 2] = "EPIC";
    RARITY[RARITY["LEGENDARY"] = 3] = "LEGENDARY";
})(RARITY || (RARITY = {}));
// ��� �������� 
var ITEMTYPE;
(function (ITEMTYPE) {
    ITEMTYPE[ITEMTYPE["HELMET"] = 0] = "HELMET";
    ITEMTYPE[ITEMTYPE["WEAPON"] = 1] = "WEAPON";
    ITEMTYPE[ITEMTYPE["SHIELD"] = 2] = "SHIELD";
    ITEMTYPE[ITEMTYPE["ARMOR"] = 3] = "ARMOR";
})(ITEMTYPE || (ITEMTYPE = {}));
class ItemSettings {
    constructor(id, name, rarity, itemtype) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.itemtype = itemtype;
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// ����� �������� 
class Item {
    constructor(settings) {
        this.settings = settings;
    }
    get id() {
        return this.settings.id;
    }
    get rarity() {
        return this.settings.rarity;
    }
    get itemtype() {
        return this.settings.itemtype;
    }
}
class ItemBase {
    constructor(itemBase) {
        this.itemBase = itemBase;
    }
    addItem(addedItem) {
        this.itemBase.set(addedItem.id, addedItem);
    }
    addItems(addedItems) {
        addedItems.forEach(item => {
            this.itemBase.set(item.id, item);
        });
    }
    getItem(id) {
        return this.itemBase.get(id);
    }
    getItemsOfRarity(rarity) {
        var items = [];
        for (let item of this.itemBase.values()) {
            if (item.rarity == rarity)
                items.push(item);
        }
        return items;
    }
    getItemsOfType(itemType) {
        var items = [];
        for (let item of this.itemBase.values()) {
            if (item.itemtype == itemType)
                items.push(item);
        }
        return items;
    }
    getItemsOfRarityAndType(rarity, itemType) {
        var items = [];
        for (let item of this.itemBase.values()) {
            if (item.itemtype == itemType && item.rarity == rarity)
                items.push(item);
        }
        return items;
    }
}
// ���� ���������, ���� - ID ��������. 
const itemsBased = new Map([
    [1, new Item(new ItemSettings(1, "Iron Chest", RARITY.COMMON, ITEMTYPE.ARMOR))],
    [2, new Item(new ItemSettings(2, "Gold Chest", RARITY.COMMON, ITEMTYPE.ARMOR))],
    [3, new Item(new ItemSettings(3, "Iron Chest", RARITY.RARE, ITEMTYPE.ARMOR))],
    [4, new Item(new ItemSettings(4, "Gold Chest", RARITY.RARE, ITEMTYPE.ARMOR))],
    [5, new Item(new ItemSettings(5, "Iron Chest", RARITY.EPIC, ITEMTYPE.ARMOR))],
    [6, new Item(new ItemSettings(6, "Gold Chest", RARITY.EPIC, ITEMTYPE.ARMOR))],
    [7, new Item(new ItemSettings(7, "Iron Chest", RARITY.LEGENDARY, ITEMTYPE.ARMOR))],
    [8, new Item(new ItemSettings(8, "Gold Chest", RARITY.LEGENDARY, ITEMTYPE.ARMOR))],
    [9, new Item(new ItemSettings(9, "Iron Helmet", RARITY.COMMON, ITEMTYPE.HELMET))],
    [10, new Item(new ItemSettings(10, "Gold Helmet", RARITY.COMMON, ITEMTYPE.HELMET))],
    [11, new Item(new ItemSettings(11, "Iron Helmet", RARITY.RARE, ITEMTYPE.HELMET))],
    [12, new Item(new ItemSettings(12, "Gold Helmet", RARITY.RARE, ITEMTYPE.HELMET))],
    [13, new Item(new ItemSettings(13, "Iron Helmet", RARITY.EPIC, ITEMTYPE.HELMET))],
    [14, new Item(new ItemSettings(14, "Gold Helmet", RARITY.EPIC, ITEMTYPE.HELMET))],
    [15, new Item(new ItemSettings(15, "Iron Helmet", RARITY.LEGENDARY, ITEMTYPE.HELMET))],
    [16, new Item(new ItemSettings(16, "Gold Helmet", RARITY.LEGENDARY, ITEMTYPE.HELMET))],
    [17, new Item(new ItemSettings(17, "Iron Shield", RARITY.COMMON, ITEMTYPE.SHIELD))],
    [18, new Item(new ItemSettings(18, "Gold Shield", RARITY.COMMON, ITEMTYPE.SHIELD))],
    [19, new Item(new ItemSettings(19, "Iron Shield", RARITY.RARE, ITEMTYPE.SHIELD))],
    [20, new Item(new ItemSettings(20, "Gold Shield", RARITY.RARE, ITEMTYPE.SHIELD))],
    [21, new Item(new ItemSettings(21, "Iron Shield", RARITY.EPIC, ITEMTYPE.SHIELD))],
    [22, new Item(new ItemSettings(22, "Gold Shield", RARITY.EPIC, ITEMTYPE.SHIELD))],
    [23, new Item(new ItemSettings(23, "Iron Shield", RARITY.LEGENDARY, ITEMTYPE.SHIELD))],
    [24, new Item(new ItemSettings(24, "Gold Shield", RARITY.LEGENDARY, ITEMTYPE.SHIELD))],
    [25, new Item(new ItemSettings(25, "Iron Axe", RARITY.COMMON, ITEMTYPE.WEAPON))],
    [26, new Item(new ItemSettings(26, "Gold Axe", RARITY.COMMON, ITEMTYPE.WEAPON))],
    [27, new Item(new ItemSettings(27, "Iron Axe", RARITY.RARE, ITEMTYPE.WEAPON))],
    [28, new Item(new ItemSettings(28, "Gold Axe", RARITY.RARE, ITEMTYPE.WEAPON))],
    [29, new Item(new ItemSettings(29, "Iron Axe", RARITY.EPIC, ITEMTYPE.WEAPON))],
    [30, new Item(new ItemSettings(30, "Gold Axe", RARITY.EPIC, ITEMTYPE.WEAPON))],
    [31, new Item(new ItemSettings(31, "Iron Axe", RARITY.LEGENDARY, ITEMTYPE.WEAPON))],
    [32, new Item(new ItemSettings(32, "Gold Axe", RARITY.LEGENDARY, ITEMTYPE.WEAPON))],
]);
// ����� �������� ����������
class Booster {
    constructor(settings, itemBase) {
        this.firstRarityItems = [];
        this.secondRarityItems = [];
        this.settings = settings;
        this.itemBase = itemBase;
        this.fillSetOfItems(this.itemBase);
    }
    fillSetOfItems(itemBase) {
        for (let item of itemBase.itemBase.values()) {
            if (item.settings.rarity == this.settings.rarity)
                this.firstRarityItems.push(item);
            if (item.settings.rarity == this.settings.rarity - 1)
                this.secondRarityItems.push(item);
        }
    }
    getBoosterLoot(playerInventory) {
        var boosterLoot = [];
        for (let i = 0; i < this.settings.n1; i++) {
            var randomItem = this.firstRarityItems[getRandomInt(this.firstRarityItems.length)];
            boosterLoot.push(randomItem);
            this.firstRarityItems = this.firstRarityItems.filter(obj => obj !== randomItem);
        }
        for (let i = 0; i < this.settings.n2; i++) {
            var randomItem = this.secondRarityItems[getRandomInt(this.secondRarityItems.length)];
            boosterLoot.push(randomItem);
            this.firstRarityItems = this.firstRarityItems.filter(item => item !== randomItem);
        }
        return boosterLoot;
    }
}
// ����� ���������� �����
class LuckBooster extends Booster {
    constructor(settings, itemBase) {
        super(settings, itemBase);
        this.upgradeChance = settings.upgradeChance;
    }
    getBoosterLoot(playerInventory) {
        var boosterLoot = [];
        super.getBoosterLoot(playerInventory).forEach(item => {
            var chance = Math.pow(this.upgradeChance, item.rarity + 1);
            if (Math.random() < chance && item.rarity !== RARITY.LEGENDARY) {
                var luckyItems = this.itemBase.getItemsOfRarity(item.rarity + 1);
                boosterLoot.push(luckyItems[getRandomInt(luckyItems.length)]);
            }
            else
                boosterLoot.push(item);
        });
        return boosterLoot;
    }
}
class UniformBooster extends LuckBooster {
    constructor(settings, itemBase) {
        super(settings, itemBase);
        this.minNumber = settings.minNumber;
    }
    getBoosterLoot(playerInventory) {
        var boosterLoot = [];
        var iterator = 0;
        super.getBoosterLoot(playerInventory).forEach(item => {
            var items = this.itemBase.getItemsOfRarityAndType(item.rarity, iterator);
            boosterLoot.push(items[getRandomInt(items.length)]);
            iterator++;
            if (iterator >= this.minNumber)
                iterator = 0;
        });
        return boosterLoot;
    }
}
let inventory = {};
let itemBase = new ItemBase(itemsBased);
let boostersBase = {
    1: new Booster({ rarity: RARITY.RARE, n1: 3, n2: 2 }, itemBase),
    2: new Booster({ rarity: RARITY.LEGENDARY, n1: 1, n2: 3 }, itemBase),
    3: new LuckBooster({ rarity: RARITY.RARE, n1: 2, n2: 3, upgradeChance: 0.1 }, itemBase),
    4: new LuckBooster({ rarity: RARITY.LEGENDARY, n1: 1, n2: 3, upgradeChance: 0.45 }, itemBase),
    5: new UniformBooster({ rarity: RARITY.RARE, n1: 5, n2: 3, upgradeChance: 0.1, minNumber: 4 }, itemBase),
    6: new UniformBooster({ rarity: RARITY.LEGENDARY, n1: 1, n2: 3, upgradeChance: 0.45, minNumber: 4 }, itemBase),
};
function getBoosterLoot(boosterID, playerInventory) {
    return boostersBase[boosterID].getBoosterLoot(playerInventory);
}
let loot = getBoosterLoot(5, inventory);
console.log(loot);
//# sourceMappingURL=app.js.map