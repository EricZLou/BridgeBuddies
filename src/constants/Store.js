const STORE_CARDBACKS = {
  "red card": {
    name: "red card",
    cost: 0,
    description: "A classic red card -- cool and simple.",
    category: "cardbacks",
    file: "Red.png",
  },
  "black card": {
    name: "black card",
    cost: 10,
    description: "A black and white card for old-times sake.",
    category: "cardbacks",
    file: "Black.png",
  },
  "blue card": {
    name: "blue card",
    cost: 20,
    description: "A blue card that harnesses the power of the sky.",
    category: "cardbacks",
    file: "Blue.png",
  },
  "light green card": {
    name: "light green card",
    cost: 30,
    description: "An obnoxiously bright green card.",
    category: "cardbacks",
    file: "LightGreen.png",
  },
  "gold card": {
    name: "gold card",
    cost: 100,
    description: "A pure gold card that glitters and shines.",
    category: "cardbacks",
    file: "Gold.png",
  },
  "blue-gold card": {
    name: "blue-gold card",
    cost: 500,
    description: "A mixed card that has dual powers.",
    category: "cardbacks",
    file: "BlueGold.png",
  },
};

const STORE_CHARACTERS = {
  "Gespade": {
    name: "Gespade",
    cost: 0,
    description: "Gespade is a really cool kid lol.",
    category: "characters",
    file: "gespade.png",
  },
  "Hartley": {
    name: "Hartley",
    cost: 0,
    description: "Hartley loves to dress up.",
    category: "characters",
    file: "hartley.png",
  },
  "Klubby": {
    name: "Klubby",
    cost: 1000,
    description: "Klubby is classy and ready with some tricks up his sleeves!",
    category: "characters",
    file: "klubby.png",
  },
  "Fauna": {
    name: "Fauna",
    cost: 1000,
    description: "Fauna loves to hop around in her summer clothing.",
    category: "characters",
    file: "fauna.png",
  },
  "Snohocat": {
    name: "Snohocat",
    cost: 3000,
    description: "Snohocat is a... snow-cat!",
    category: "characters",
    file: "snohocat.png",
  },
};

const STORE_TABLES = {
  "classic table": {
    name: "classic table",
    cost: 0,
    description: "The classic table.",
    category: "tables",
    file: "green2.jpg",
  },
};

exports.STORE = {
  cardbacks: STORE_CARDBACKS,
  characters: STORE_CHARACTERS,
  tables: STORE_TABLES,
}
