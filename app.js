let kittens = []
loadKittens()
getStarted()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 6,
    mood: "",

    setKittenMood()
  }

  if (kittens.includes(`${kitten.name}`)) {
    throw new Error("A kitten that name is already here!")
  } else {
    kittens.push(kitten)
    saveKittens()
    form.reset()
    console.log("Saved")
  }
  drawKittens()
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to local storage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));

}

/**
 * Attempts to retrieve the kittens string from local storage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
*/
function drawKittens() {
  //let kitten = findKittenById(id)

  document.getElementById("kittens").innerHTML = ""
  if (kittens.length < 1) {
    document.getElementById("kittens").innerText = ""
  } else {
    kittens.forEach(kitten => {
      let id = kitten.id;
      document.getElementById("kittens").innerHTML +=

        `<div id="${kitten.name}" class="kitten character">
    <p class="kitten-name">${kitten.name}</p>
    <img class="kitten" style="width:75px; height:75px" src="https://media.istockphoto.com/id/1204008191/vector/symbolic-cute-cat-face.jpg?s=612x612&w=0&k=20&c=hon014JKW91q7sPJw21t358xnhmq8UiFhfUYtW4XcBQ="></img>
    <p class="kitten-mood">${kitten.mood}</p>
    <button onclick="pet('${id}')">
        Pet
      </button>
      <button onclick="catnip('${id}')">
      Catnip
      </button>
      </div>`

      assignMoodClass(id)
      console.log(id)
    })
  }
}

function assignMoodClass(id) {
  let kitten = findKittenById(id)

  if (kitten.mood == "Happy") {
    document.getElementById(`${kitten.name}`).classList.remove("tolerant")
    document.getElementById(`${kitten.name}`).classList.remove("angry")
    document.getElementById(`${kitten.name}`).classList.remove("gone")
    document.getElementById(`${kitten.name}`).classList.add("happy")
  }

  if (kitten.mood == "Tolerant") {
    document.getElementById(`${kitten.name}`).classList.remove("happy")
    document.getElementById(`${kitten.name}`).classList.remove("angry")
    document.getElementById(`${kitten.name}`).classList.remove("gone")
    document.getElementById(`${kitten.name}`).classList.add("tolerant")
  }

  if (kitten.mood == "Angry") {
    document.getElementById(`${kitten.name}`).classList.remove("tolerant")
    document.getElementById(`${kitten.name}`).classList.remove("happy")
    document.getElementById(`${kitten.name}`).classList.remove("gone")
    document.getElementById(`${kitten.name}`).classList.add("angry")
  }

  if (kitten.mood == "Gone") {
    document.getElementById(`${kitten.name}`).classList.remove("tolerant")
    document.getElementById(`${kitten.name}`).classList.remove("angry")
    document.getElementById(`${kitten.name}`).classList.remove("happy")
    document.getElementById(`${kitten.name}`).classList.add("gone")
  }

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let ret;

  kittens.forEach(kittenByID => {
    if (kittenByID.id == id) {
      ret = kittenByID
    }
  })
  console.log(ret)
  return ret;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let affectionChange = Math.random()
  let kitten = findKittenById(id)

  if (affectionChange > .5) {
    kitten.affection += 1
  }
  setKittenMood(id)
  console.log(kitten.affection)
  console.log(affectionChange)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  setKittenMood(id)
  console.log(kitten, kitten.affection)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(id) {
  let kitten = findKittenById(id)

  if (kitten.affection >= 8) {
    kitten.mood = "Happy"


  } else if (kitten.affection >= 6 && kitten.affection < 8) {
    kitten.mood = "Tolerant"

  } else if (kitten.affection >= 3 && kitten.affection < 6) {
    kitten.mood = "Angry"

  } else {
    kitten.mood = "Gone"
  }
  saveKittens()
  drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  window.localStorage.removeItem("kittens")
  kittens = []
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
