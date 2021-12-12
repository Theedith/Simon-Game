var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = -1;
var n = 0;
var level = 0;
var i = -1;

function playSound(randomChoosenColor){
    let randomChoosenAudio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    randomChoosenAudio.play();
}

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    n = n + 1;
    $(`#${randomChoosenColor}`).fadeOut().fadeIn();
    playSound(randomChoosenColor);
    $('h1').text(`Level ${++level}`);
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkOrder(event){
    i++;
    let f = 1;
    if($(event.target).attr("id") != gamePattern[i]){
        n = 0;
        gamePattern = [];
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        f = 0;
        i = -1;
        level = 0;
        pressedOrder = [];
    }
    if (f === 1 && i == gamePattern.length - 1) {
        i = -1;
        setTimeout(nextSequence(), 200);
    }
}

function clickHandler(event){
    let userChoosenColor = $(event.target).attr("id");
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkOrder(event);
}

$(".btn").click(clickHandler);
$("body").keypress(nextSequence);