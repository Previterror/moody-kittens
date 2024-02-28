let kittens = []
loadKittens()

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
    affection: 0,
    mood: "neutral",
  }

  if (kittens.includes(`${kitten.name}`)) {
    throw new Error("A kitten that name is already here!")
  } else {
    kittens.push(kitten)
    saveKittens()
    form.reset()
    console.log("Saved")
  }
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
  kittens.forEach(kitten => {
    document.getElementById("kittens").innerText += ` ${kitten.name} `
  })
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
    kitten.affection += affectionChange
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
    kitten.mood = "affectionate"

  } else if (kitten.affection >= 6 && kitten.affection < 8) {
    kitten.mood = "friendly"

  } else if (kitten.affection >= 3 && kitten.affection < 6) {
    kitten.mood = "tolerant"

  } else {
    kitten.mood = "moody"
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  window.localStorage.removeItem("kittens")
  kittens = []
  drawKittens()
  console.log("Cleared")
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
