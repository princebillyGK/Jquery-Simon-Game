$(document).ready(function () {
    let buttonColors = ["red", "blue", "green", "yellow"];

    let gamePattern = [];
    let userClickedPattern = [];

    let started = false;
    let level = 0;

    let $heading = $("h1");
    let currentLevel = 0;

    $(this).keypress((e) => {
        if (!started) {
            nextSequence();
            started = true;
        }
    })

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $heading.text(`Level ${level}`);

        let randomColorCode = Math.floor(Math.random() * 4);
        let randomColor = buttonColors[randomColorCode];
        gamePattern.push(randomColor);

        $('.' + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }


    $('.btn').click(function (e) {
        let $currentItem = $(this);
        let userChosenColor = $currentItem.attr("id");

        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function playSound(name) {
        var audio = new Audio('sounds/' + name + '.mp3');
        audio.play();
    }

    function animatePress(currentColor) {
        let $item = $("#" + currentColor);
        $item.addClass("pressed");
        setTimeout(() => {
            $item.removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
            console.log("Success");
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }
        } else {
            playSound("wrong");
            
            $('body').addClass("game-over");
            setTimeout(() => {
                $('body').removeClass("game-over");
            }, 200);
            $heading.text("Game Over, Press Any Key to Restart");
            startOver();
        }

    }
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});