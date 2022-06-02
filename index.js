// disable all child of hairForm
const genderForm = document.getElementById('gender-form')
const heightForm = document.getElementById('height-form')
const weightForm = document.getElementById('weight-form')
const hairForm = document.getElementById('hair-form')
function disableForm (form) {
  const allChildren = Array.from(form.getElementsByTagName('*'))
  allChildren.forEach(child => {
    child.disabled = true
  })
}
function enableForm (form) {
  const allChildren = Array.from(form.getElementsByTagName('*'))
  allChildren.forEach(child => {
    child.disabled = false
  })
}
disableForm(heightForm)
disableForm(weightForm)
disableForm(hairForm)

const genderNext = document.getElementById('gender-next')
genderNext.disabled = true
genderNext.addEventListener('click', () => {
  disableForm(genderForm)
  enableForm(heightForm)
  heightNext.disabled = true
})

const heightNext = document.getElementById('height-next')
heightNext.addEventListener('click', () => {
  disableForm(heightForm)
  enableForm(weightForm)
  weightNext.disabled = true
})

const weightNext = document.getElementById('weight-next')
weightNext.addEventListener('click', () => {
  disableForm(weightForm)
  enableForm(hairForm)
  submitButton.disabled = true
})

//variables for our selecting user's choice
const inputGender = document.querySelectorAll('#genderP input')
const inputHeight = document.querySelectorAll('#heightP input')
const inputWeight = document.querySelectorAll('#weightP input')
const inputHairColor = document.querySelectorAll('#hairP input')

//new arrays that are created with every selection
let selectedGender = []
let selectedHeight = []
let selectedWeight = []
let finalArray = []

//"click" event listeners for gender question
//function called sortGender that takes in gender selection and object to create new array
inputGender[ 0 ].addEventListener('click', () => {
  fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
      console.log( objects.filter(object => sortGender('Male' , object)) )
      selectedGender = objects.filter(object => sortGender('Male', object))
      genderNext.disabled = false
    })
})

inputGender[ 1 ].addEventListener('click', () => {
  fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
      console.log( objects.filter(object => sortGender('Female' , object)) )
      selectedGender = objects.filter(object => sortGender('Female', object))
      genderNext.disabled = false
    })
})

inputGender[ 2 ].addEventListener('click', () => {
  fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
      console.log( objects.filter(object => sortGender('-' , object)) )
      selectedGender = objects.filter(object => sortGender('-', object))
      genderNext.disabled = false
    })
})

const sortGender = (gender, object) => {
  return object.appearance.gender === gender
}

//"click" event listeners for height question
//function sortHeight that takes in selectedGender array and creates new array
//function convertHeight that converts original ft/in value to integer value (in inches)
inputHeight[ 0 ].addEventListener('click', () => {
  console.log(selectedGender.filter(object => sortHeight(0, 65, object)))
  selectedHeight = selectedGender.filter(object => sortHeight(0, 65, object))
  heightNext.disabled = false
})

inputHeight[ 1 ].addEventListener('click', () => {
  console.log(selectedGender.filter(object => sortHeight(66 , 77 , object)))
  selectedHeight = selectedGender.filter(object => sortHeight(66, 77, object))
  heightNext.disabled = false
})

inputHeight[ 2 ].addEventListener('click', () => {
  console.log(selectedGender.filter(object => sortHeight(78 , 5000 , object)))
  selectedHeight = selectedGender.filter(object => sortHeight(78, 5000, object))
  heightNext.disabled = false
})

const sortHeight = (lowerHeight, higherHeight, object) => {
  return convertHeight(object.appearance.height[ 0 ]) <= higherHeight && convertHeight(object.appearance.height[ 0 ]) > lowerHeight
}

const convertHeight = (original) => {
  const withoutApostrophe = original.replace("'", " ")
  const outputArray = withoutApostrophe.split(" ")
  return parseInt(outputArray[ 0 ]) * 12 + parseInt(outputArray[ 1 ])
}

//"click" event listeners for weight question
//function sortWeight that takes in selectedHeight and creates a new array
inputWeight[ 0 ].addEventListener('click', () => {
  console.log(selectedHeight.filter(object => sortWeight(0, 150, object)))
  selectedWeight = selectedHeight.filter(object => sortWeight(0, 150, object))
  weightNext.disabled = false
})

inputWeight[ 1 ].addEventListener('click', () => {
  console.log(selectedHeight.filter(object => sortWeight(151 , 250 , object)))
  selectedWeight = selectedHeight.filter(object => sortWeight(151, 250, object))
  weightNext.disabled = false
})

inputWeight[ 2 ].addEventListener('click', () => {
  console.log(selectedHeight.filter(object => sortWeight(251 , 5000 , object)))
  selectedWeight = selectedHeight.filter(object => sortWeight(251, 5000, object))
  weightNext.disabled = false
})

const sortWeight = (lowerWeight, higherWeight, object) => {
  return convertWeight(object.appearance.weight[ 0 ]) <= higherWeight && convertWeight(object.appearance.weight[ 0 ]) > lowerWeight
}

const convertWeight = (original) => {
  const withoutWords = original.split(" lb")
  return parseInt(withoutWords[ 0 ])
}



//"click" event listeners for hair color question
//function sortHairColor that takes in selectedWeight and creates new array

inputHairColor[ 0 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortHairColor('Black', object)))
  finalArray = selectedWeight.filter(object => sortHairColor('Black', object))
  submitButton.disabled = false
})

inputHairColor[ 1 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortHairColor('Brown', object)))
  finalArray = selectedWeight.filter(object => sortHairColor('Brown', object))
  submitButton.disabled = false
})

inputHairColor[ 2 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortHairColor('Blond', object)))
  finalArray = selectedWeight.filter(object => sortHairColor('Blond', object))
  submitButton.disabled = false
})

inputHairColor[ 3 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortHairColor('White', object)))
  finalArray = selectedWeight.filter(object => sortHairColor('White', object))
  submitButton.disabled = false
})

inputHairColor[ 4 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortHairColor('No Hair', object)))
  finalArray = selectedWeight.filter(object => sortHairColor('No Hair', object))
  submitButton.disabled = false
})

inputHairColor[ 5 ].addEventListener('click', () => {
  console.log(selectedWeight.filter(object => sortOtherHairColor(object)))
  finalArray = selectedWeight.filter(object => sortOtherHairColor(object))
  submitButton.disabled = false
})

const sortHairColor = (hairColor, object) => {
  return convertHairColorToUpper(object.appearance.hairColor) === hairColor
}

const convertHairColorToUpper = (haircolor) => {
  return haircolor.charAt(0).toUpperCase() + haircolor.substring(1)
}

const sortOtherHairColor = (object) => {
  return object.appearance.hairColor === "Pink" || object.appearance.hairColor === "Green" || object.appearance.hairColor === "Auburn" || object.appearance.hairColor === "Yellow" || object.appearance.hairColor === "-" || object.appearance.hairColor === "Grey" || object.appearance.hairColor === "Blue" || object.appearance.hairColor === "Purple" || object.appearance.hairColor === "Silver" || object.appearance.hairColor === "Gold" || object.appearance.hairColor === "Indigo" || object.appearance.hairColor === "Strawberry Blond" || object.appearance.hairColor === "Red" || object.appearance.hairColor === "Orange"
}

const submitButton = document.getElementById('submit-details')

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  const imageDiv = document.getElementById('image-div')
  const lightbox = document.getElementById("lightbox");
  const randomHero = finalArray[ Math.floor(Math.random() * finalArray.length) ]
  let name = randomHero.name
  let work = randomHero.work
  let randomPub = randomHero.biography.publisher
  let randomStats = randomHero.powerstats
  let randomImg = randomHero.images.lg
  // let randomWork = randomHero.work.occupation

  //creating elements and giving them classes
  const randomImgEl = document.createElement('img')
  randomImgEl.className = 'randomImg'

  // --------------------------------
  // publisher
  const publisherH3 = document.createElement('h3')
  publisherH3.className = 'pub'
  publisherH3.innerHTML = randomPub

  //name
  const nameH2 = document.createElement('h2')
  nameH2.className = 'name'
  nameH2.innerHTML = name
  
  //stats
  const statList = document.createElement('ul')
  statList.className = 'stats'
  for (const stat in randomStats) {
    let statLI = document.createElement('li')
    
    statLI.innerHTML = `${stat}: ${randomStats[ stat ]}`
    statList.append(statLI)
  }

  // work (base + occupation)
  const workList = document.createElement('ul')
  workList.className = 'work'
  for (const el in work) {
    let workLi = document.createElement('li')
    workLi.innerHTML = `${el}: ${work[ el ]}`
    workList.append(workLi)
  }

  // ------------------------------
  randomImgEl.src = randomImg
  lightbox.style.display = 'flex'

  const descDiv = document.createElement('div')
  descDiv.className = 'description'
  descDiv.appendChild(workList)
  descDiv.appendChild(statList)

  // appending details to the lightbox
  lightbox.appendChild(nameH2)
  lightbox.appendChild(publisherH3)
  imageDiv.append(randomImgEl)
  lightbox.append(descDiv)
})


