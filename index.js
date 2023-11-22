import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const body = document.getElementById('body')

emotionRadios.addEventListener('change', highlightCheckedOption)

getImageBtn.addEventListener('click', renderMultipleCats)

memeModalCloseBtn.addEventListener('click', closeModal)


window.addEventListener('click', function(e){   
  if (!memeModal.contains(e.target) && !getImageBtn.contains(e.target) && !e.target.classList.contains("cat-img")){
    closeModal()
  }
})

memeModalInner.addEventListener('click', function(e){
    if(e.target.classList.contains("cat-img")){
        enlargeCat(e)
    }
})


function enlargeCat(e){
    memeModalInner.innerHTML =  `
        <div>
            <img 
            class="big-img" 
            src="${e.target.src}"
            alt="${e.target.alt}"
            >
        </div>
        `
}

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
        memeModal.style.display = 'none'
}

function renderMultipleCats(){
    const catsArray = getMatchingCatsArray()
    memeModalInner.innerHTML = ``
    catsArray.forEach(function(cat){
        memeModalInner.innerHTML +=  `
        <div>
            <img 
            class="cat-img" 
            src="./images/${cat.image}"
            alt="${cat.alt}"
            >
        </div>
        `
    memeModal.style.display = 'flex'
    })
}


function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




