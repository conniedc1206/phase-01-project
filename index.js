const submitAllData = document.createElement('button')
submitAllData.textContent = 'Submit'
const submitDiv = document.getElementById('submit-button')
submitDiv.appendChild(submitAllData)

let finalArray = []

fetch('https://akabab.github.io/superhero-api/api/all.json')
  .then(response => response.json())
  .then(data => {
    const newImgDiv = document.createElement('div')
    newImgDiv.className = ('display-random-img')

    submitDiv.append(newImgDiv)

    let randomImg = data[ Math.floor(Math.random() * data.length) ].images.lg
    const randomImgEl = document.createElement('img')
    randomImgEl.className = 'randomImg'

    newImgDiv.append(randomImgEl)

    submitDiv.addEventListener('click', () => {
      randomImgEl.src = randomImg
    })
  })




