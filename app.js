const form = document.getElementById("dino-compare");
const humanName = document.getElementById("name");
const humanFeet = document.getElementById("feet");
const humanInches = document.getElementById("inches");
const humanWeight = document.getElementById("weight");
const humanDiet = document.getElementById("diet");
const btn = document.getElementById("btn");
const grid = document.getElementById("grid");

// create dino constructor
class Dinos {
  constructor(species, weight, height, diet, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
  }
}

// save dino objects in an array
const dinos = [];

// declare human varible for later assigning object
let humanData;

// Create Dino Objects
fetch("dino.json")
  .then((res) => res.json())
  .then((res) => {
    const dinosObj = res.Dinos;

    dinosObj.forEach((dino) => {
      const createDino = new Dinos(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        [dino.fact]
      );

      // push the created object to dinos array
      dinos.push(createDino);
    });
  });

// a function returns human object when the form is submitted
const human = () => {
  // calculate the height of the human
  const humanHeight = +humanFeet.value * 12 + +humanInches.value;

  // assign data form to human object
  return {
    name: humanName.value,
    height: humanHeight,
    weight: +humanWeight.value,
    diet: humanDiet.value,
  };
};

// create dino method to compare height
Dinos.prototype.compareHeight = (human) => {
  // compare human height to each dino height
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];
    if (dino.height > human.height) {
      fact = `${dino.species} is taller than you by ${
        dino.height - human.height
      } inches`;
      dino.fact.push(fact);
    } else {
      fact = `You are taller than ${dino.species} by ${
        human.height - dino.height
      } inches`;
      dino.fact.push(fact);
    }
  }
};

// create dino method to compare weight
Dinos.prototype.compareWeight = (human) => {
  // compare human weight to each dino weight
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];
    if (dino.weight > human.weight) {
      fact = `${dino.species} is heavier than you by ${
        dino.weight - human.weight
      } lbs`;
      dino.fact.push(fact);
    } else {
      fact = `You are heavier than ${dino.species} by ${
        human.weight - dino.weight
      } lbs`;
      dino.fact.push(fact);
    }
  }
};

// create dino method to compare diet
Dinos.prototype.compareDiet = (human) => {
  // compare human diet to each dino diet
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];

    // make diet lowerCase for right comparison
    const dinoDiet = dino.diet.toLowerCase();
    const humanDiet = human.diet.toLowerCase();

    if (dinoDiet === humanDiet) {
      fact = `${dino.species} has the same diet that you have`;
      dino.fact.push(fact);
    } else {
      fact = `Your diet is ${humanDiet} while ${dino.species} diet is ${dinoDiet}`;
      dino.fact.push(fact);
    }
  }
};

// compare human data to dinos data
function compareData() {
  humanData = human();

  Dinos.prototype.compareHeight(humanData);
  Dinos.prototype.compareWeight(humanData);
  Dinos.prototype.compareDiet(humanData);
}

// select random fact from each dino
function randomFact() {
  dinos.forEach((dino) => {
    // random number for the array facts
    const randomNum = Math.floor(Math.random() * dino.fact.length);

    // update dino fact to the selected fact
    dino.fact = dino.fact[randomNum];
  });
}

// place human object in the middle of dinos
function placeHuman() {
  dinos.splice(4, 0, humanData);
}

// set img property to each object in dinos array
function setImg() {
  dinos.forEach((obj, index) => {
    // make objects name lowerCase
    const objName =
      index === 4 ? obj.name.toLowerCase() : obj.species.toLowerCase();
    // if the object is human, set the img manually
    if (index === 4) {
      obj.img = `images/human.png`;
    } else {
      obj.img = `images/${objName}.png`;
    }
  });
}

// generate tiles from each dino and add them to the DOM
function generateTiles() {
  dinos.forEach((obj, index) => {
    // create div element
    const div = document.createElement("div");

    // add class to the div
    div.className = "grid-item";

    // add content to the div, but don't set a fact for humen
    const objName = index === 4 ? obj.name : obj.species;
    const objFact = index === 4 ? "" : `<p>${obj.fact}</p>`;

    div.innerHTML = `<h3>${objName}</h3>
                     <img src="${obj.img}" alt="${objName} image">
                     ${objFact}`;
    // append the div to the grid element
    grid.append(div);
  });
}

// On button click, prepare and display infographic
btn.addEventListener("click", () => {
  // remove form from the DOM
  form.remove();

  // compare human data to dinos data
  compareData();

  // select random fact
  randomFact();

  // place human object in the middle of dinos
  placeHuman();

  // set img property to each object in dinos array
  setImg();

  // generate tiles and add them to the DOM
  generateTiles();
});
const form = document.getElementById("dino-compare");
const humanName = document.getElementById("name");
const humanFeet = document.getElementById("feet");
const humanInches = document.getElementById("inches");
const humanWeight = document.getElementById("weight");
const humanDiet = document.getElementById("diet");
const btn = document.getElementById("btn");
const grid = document.getElementById("grid");

// create dino constructor
class Dinos {
  constructor(species, weight, height, diet, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
  }
}

// save dino objects in an array
const dinos = [];

// declare human varible for later assigning object
let humanData;

// Create Dino Objects
fetch("dino.json")
  .then((res) => res.json())
  .then((res) => {
    const dinosObj = res.Dinos;

    dinosObj.forEach((dino) => {
      const createDino = new Dinos(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        [dino.fact]
      );

      // push the created object to dinos array
      dinos.push(createDino);
    });
  });

// a function returns human object when the form is submitted
const human = () => {
  // calculate the height of the human
  const humanHeight = +humanFeet.value * 12 + +humanInches.value;

  // assign data form to human object
  return {
    name: humanName.value,
    height: humanHeight,
    weight: +humanWeight.value,
    diet: humanDiet.value,
  };
};

// create dino method to compare height
Dinos.prototype.compareHeight = (human) => {
  // compare human height to each dino height
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];
    if (dino.height > human.height) {
      fact = `${dino.species} is taller than you by ${
        dino.height - human.height
      } inches`;
      dino.fact.push(fact);
    } else {
      fact = `You are taller than ${dino.species} by ${
        human.height - dino.height
      } inches`;
      dino.fact.push(fact);
    }
  }
};

// create dino method to compare weight
Dinos.prototype.compareWeight = (human) => {
  // compare human weight to each dino weight
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];
    if (dino.weight > human.weight) {
      fact = `${dino.species} is heavier than you by ${
        dino.weight - human.weight
      } lbs`;
      dino.fact.push(fact);
    } else {
      fact = `You are heavier than ${dino.species} by ${
        human.weight - dino.weight
      } lbs`;
      dino.fact.push(fact);
    }
  }
};

// create dino method to compare diet
Dinos.prototype.compareDiet = (human) => {
  // compare human diet to each dino diet
  let fact;

  // skip the Pigeon dino from updating
  for (let i = 0; i < dinos.length - 1; i++) {
    const dino = dinos[i];

    // make diet lowerCase for right comparison
    const dinoDiet = dino.diet.toLowerCase();
    const humanDiet = human.diet.toLowerCase();

    if (dinoDiet === humanDiet) {
      fact = `${dino.species} has the same diet that you have`;
      dino.fact.push(fact);
    } else {
      fact = `Your diet is ${humanDiet} while ${dino.species} diet is ${dinoDiet}`;
      dino.fact.push(fact);
    }
  }
};

// compare human data to dinos data
function compareData() {
  humanData = human();

  Dinos.prototype.compareHeight(humanData);
  Dinos.prototype.compareWeight(humanData);
  Dinos.prototype.compareDiet(humanData);
}

// select random fact from each dino
function randomFact() {
  dinos.forEach((dino) => {
    // random number for the array facts
    const randomNum = Math.floor(Math.random() * dino.fact.length);

    // update dino fact to the selected fact
    dino.fact = dino.fact[randomNum];
  });
}

// place human object in the middle of dinos
function placeHuman() {
  dinos.splice(4, 0, humanData);
}

// set img property to each object in dinos array
function setImg() {
  dinos.forEach((obj, index) => {
    // make objects name lowerCase
    const objName =
      index === 4 ? obj.name.toLowerCase() : obj.species.toLowerCase();
    // if the object is human, set the img manually
    if (index === 4) {
      obj.img = `images/human.png`;
    } else {
      obj.img = `images/${objName}.png`;
    }
  });
}

// generate tiles from each dino and add them to the DOM
function generateTiles() {
  dinos.forEach((obj, index) => {
    // create div element
    const div = document.createElement("div");

    // add class to the div
    div.className = "grid-item";

    // add content to the div, but don't set a fact for humen
    const objName = index === 4 ? obj.name : obj.species;
    const objFact = index === 4 ? "" : `<p>${obj.fact}</p>`;

    div.innerHTML = `<h3>${objName}</h3>
                     <img src="${obj.img}" alt="${objName} image">
                     ${objFact}`;
    // append the div to the grid element
    grid.append(div);
  });
}

// On button click, prepare and display infographic
btn.addEventListener("click", () => {
  // remove form from the DOM
  form.remove();

  // compare human data to dinos data
  compareData();

  // select random fact
  randomFact();

  // place human object in the middle of dinos
  placeHuman();

  // set img property to each object in dinos array
  setImg();

  // generate tiles and add them to the DOM
  generateTiles();
});
