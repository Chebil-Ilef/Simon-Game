const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level =0;

$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
},70);
}

function nextSequence(){
userClickedPattern=[]; //this is very important inorder to verify every click every time
level++;
$("h1").html("Level " + level);
let constNumber=Math.floor(Math.random()*4);
let randomChosenColour=buttonColours[constNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(150).fadeIn(150);
playSound(randomChosenColour);

}


function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){ //meyet3ada ken meyeclicki aalihom lkol b shih
            setTimeout(function(){
                nextSequence(); //ki y clicki aalihom lkol b shih bech nfarghou userClickedPattern fel nextSequence khater kolmara chetssir verifiaction
            },1000);
        }
    }
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          started=false;
          level=0;
          gamePattern = [];
    }
}
