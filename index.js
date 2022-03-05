const buttonColors =['red','blue','green','yellow']
var gamePattern = []
var userClickedPattern =[]
const title = document.querySelector('#level-title')
const body = document.querySelector('body')
var startGame = false;
var level = 0;


$( "body" ).keydown(function() {
    if (!startGame) {
        startGame = true;
        nextSequence();
    }
  });

function nextSequence(){
    const randomNumber = Math.floor(Math.random()*4)

    const randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)

    $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor)

    level += 1;
    
    title.innerText = `Level ${level}`
    
}

$('.btn').click((e) =>{
    var userChosenColor = e.target.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(e.target)
    checkPattern(userClickedPattern.length - 1)
})

function animatePress(currentColor) {
    currentColor.classList.add("pressed")
    setTimeout(() => {
        currentColor.classList.remove("pressed")
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function checkPattern(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
              setTimeout(() => {
                nextSequence()
                userClickedPattern = [];    
                }, 1000);   
            }          
    }else{
        startOver()
    }
}

function startOver() {
    playSound('wrong')
        startGame = false;
        title.innerText = 'Game Over, Press A Key to Restart';
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        body.classList.add('game-over')
        setTimeout(() => {
            body.classList.remove('game-over')
        }, 200);
}