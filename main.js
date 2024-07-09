chineseChars = `臂
腿
胯
大腿
手
手指
手掌
指甲
脚
脚趾
腹肌
胸部
手腕
踝
骨
锁骨
肋骨
骨盆
弯头`.replace(/\n/g, ",").split(",");
chinesePronounciations = `bì
tuî
kuà
dàtuî
shôu
shôu zhî
shôu zhâng
zhî jia
jiâo
jiâo zhî
fù jī
xiōng bù
shôu wàn
huái
gû
suô gû
lèi gû
gû pén
wān tóu`.replace(/\n/g, ",").split(",");
chineseDefinitions = `arm
leg
crotch
thigh
hand
finger
palm
fingernail
foot
toe
abs
chest
wrist
ankle
bone
collarbone
ribcage
pelvis
elbow`.replace(/\n/g, ",").split(",");
var terms = []
for(let i in chineseDefinitions) {
    terms.push({"char":chineseChars[i], "pronounciation":chinesePronounciations[i], "def":chineseDefinitions[i]})
}



function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
shuffle(terms)
console.log(terms)
var keys = []
var currentCard = 0

function update() {
    document.getElementById("char").innerHTML = terms[currentCard].char
    document.getElementById("pronounciation").innerHTML = terms[currentCard].pronounciation
    if(keys["Shift"]) document.getElementById("def").innerHTML = terms[currentCard].def
    else document.getElementById("def").innerHTML = ""
    updateProgress()
}
function updateProgress() {
    let barL = document.getElementById("progress-l")
    let barR = document.getElementById("progress-r")
    let height = document.getElementById("card").offsetHeight-50
    let ratio = currentCard/terms.length
    barL.style.height = ratio*height + "px"
    barR.style.height = ratio*height + "px"
}

update()


document.addEventListener("keydown", (e)=>{
    keys[e.key] = true
    if(e.key == "Enter") {
        currentCard += 1
    } else if(e.key == "Backspace") {
        currentCard += -1
    } else if(e.key == "Tab") {
        shuffle(terms)
        currentCard = 0
    } else if(e.key == "Shift") {

    } else {return}
    if(currentCard<0)currentCard+=terms.length
    else if(currentCard>=terms.length)currentCard-=terms.length
    update()
})
document.addEventListener("keyup", (e)=>{
    keys[e.key] = false
    if(e.key == "Shift") update()
})


