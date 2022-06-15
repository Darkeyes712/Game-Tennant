// Player name
const player1 = "Kireto";
const player2 = "Baceto";

// Play sound: 
function playSound(link) {
    var audio = new Audio(link);
    audio.loop = false;
    audio.play();

    return audio.play();
}


// Function to roll the dice
function rollTheDice() {
    setTimeout(function () {
        var randomNumber1 = Math.floor(Math.random() * 6) + 1;
        var randomNumber2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".img1").setAttribute("src",
            "assets/img/dice" + randomNumber1 + ".png");

        document.querySelector(".img2").setAttribute("src",
            "assets/img/dice" + randomNumber2 + ".png");

        if (randomNumber1 === randomNumber2) {
            document.querySelector("h1").innerHTML = "Draw!";
            window.scrollTo(0, 0);
            playSound('assets/sound/d.mp3');
        }

        else if (randomNumber1 < randomNumber2) {
            document.querySelector("h1").innerHTML
                = (player2 + " WINS!");
            window.scrollTo(0, 0);
            playSound('assets/sound/b.mp3');
        }

        else {
            document.querySelector("h1").innerHTML
                = (player1 + " WINS!");
            window.scrollTo(0, 0);
            playSound('assets/sound/k.mp3');
        }
    }, 100);
}