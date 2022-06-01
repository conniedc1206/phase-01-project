//event listener: click 
    //if they click male, filter fetch data for "Male"
    //if they click female, filter fetch data for "Female"
    //if they click other, filter fetch data for "-"

// disable all child of hairForm

const genderForm = document.getElementById('gender-form')
const heightForm = document.getElementById('height-form')
const weightForm = document.getElementById('weight-form')
const hairForm = document.getElementById('hair-form')

function disableForm(form){
    const allChildren = Array.from(form.getElementsByTagName('*'))
    allChildren.forEach(child => {
        child.disabled = true
    })
}

function enableForm(form){
    const allChildren = Array.from(form.getElementsByTagName('*'))
    allChildren.forEach(child => {
        child.disabled = false
    })
}

disableForm(heightForm)
disableForm(weightForm)
disableForm(hairForm)

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
inputGender[0].addEventListener('click', ()=>{
    fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
        //console.log( objects.filter(object => sortGender('Male' , object)) )
        selectedGender = objects.filter(object => sortGender('Male' , object))
    })
})

inputGender[1].addEventListener('click', ()=>{
    fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
        //console.log( objects.filter(object => sortGender('Female' , object)) )
        selectedGender = objects.filter(object => sortGender('Female' , object))
    })
})

inputGender[2].addEventListener('click', ()=>{
    fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then(res => res.json())
    .then(objects => {
        //console.log( objects.filter(object => sortGender('-' , object)) )
        selectedGender = objects.filter(object => sortGender('-' , object))
    })
})

const sortGender = (gender, object) => {
    return object.appearance.gender === gender
}

//"click" event listeners for height question
//function sortHeight that takes in selectedGender array and creates new array 
//function convertHeight that converts original ft/in value to integer value (in inches)
inputHeight[0].addEventListener('click', ()=>{
    //console.log(selectedGender.filter(object => sortHeight(0 , 65 , object)))
    selectedHeight = selectedGender.filter(object => sortHeight(0 , 65 , object))
})

inputHeight[1].addEventListener('click', ()=>{
    //console.log(selectedGender.filter(object => sortHeight(66 , 77 , object)))
    selectedHeight = selectedGender.filter(object => sortHeight(66 , 77 , object))
})

inputHeight[2].addEventListener('click', ()=>{
    //console.log(selectedGender.filter(object => sortHeight(78 , 5000 , object)))
    selectedHeight = selectedGender.filter(object => sortHeight(78 , 5000 , object))
})

const sortHeight = (lowerHeight, higherHeight , object) => {
    return convertHeight(object.appearance.height[0]) <= higherHeight && convertHeight(object.appearance.height[0]) > lowerHeight
}

const convertHeight = (original) => {
    const withoutApostrophe = original.replace("'", " ")
    const outputArray= withoutApostrophe.split(" ")
    return parseInt(outputArray[0])*12 + parseInt(outputArray[1])
}

//"click" event listeners for weight question
//function sortWeight that takes in selectedHeight and creates a new array 
inputWeight[0].addEventListener('click', ()=>{
    //console.log(selectedHeight.filter(object => sortWeight(0 , 150 , object)))
    selectedWeight = selectedHeight.filter(object => sortWeight(0 , 150 , object))
    
})

inputWeight[1].addEventListener('click', ()=>{
    //console.log(selectedHeight.filter(object => sortWeight(151 , 250 , object)))
    selectedWeight = selectedHeight.filter(object => sortWeight(151 , 250 , object))
})

inputWeight[2].addEventListener('click', ()=>{
    //console.log(selectedHeight.filter(object => sortWeight(251 , 5000 , object)))
    selectedWeight = selectedHeight.filter(object => sortWeight(251 , 5000 , object))
})

const sortWeight = (lowerWeight, higherWeight , object) => {
    return convertWeight(object.appearance.weight[0]) <= higherWeight && convertWeight(object.appearance.weight[0]) > lowerWeight
}

const convertWeight = (original) => {
    const withoutWords = original.split(" lb")
    return parseInt(withoutWords[0])
}



//"click" event listeners for hair color question
//function sortHairColor that takes in selectedWeight and creates new array
//NEED TO WORK ON: 
    //inputHairColor[5] needs to accept multiple hair color values
        //"Red"
        //"Green"
        //"Auburn"
        //"Yellow"
        //"-"
        //"Grey"
        //"Blue"
        //"Purple"
        //"Silver"
        //"Gold"
        //"Indigo"
    //need to convert some values from array that are lowercase like "black" and "blond" to uppercase "Black" and "Blond"

inputHairColor[0].addEventListener('click', ()=>{
    console.log(selectedWeight.filter(object => sortHairColor('Black', object)))
})

inputHairColor[1].addEventListener('click', ()=>{
    console.log(selectedWeight.filter(object => sortHairColor('Brown', object)))
})

inputHairColor[2].addEventListener('click', ()=>{
    console.log(selectedWeight.filter(object => sortHairColor('Blond', object)))
})

inputHairColor[3].addEventListener('click', ()=>{
    console.log(selectedWeight.filter(object => sortHairColor('White', object)))
})

inputHairColor[4].addEventListener('click', ()=>{
    console.log(selectedWeight.filter(object => sortHairColor('No Hair', object)))
})

// inputHairColor[5].addEventListener('click', ()=>{
//     console.log(selectedWeight.filter(object => sortHairColor('Red', object)))
// })

const sortHairColor = (hairColor, object) => {
    return object.appearance.hairColor === hairColor
}

