// LVL and EXP bar script
try {

    const exp = parseInt(localStorage.getItem("exp"));

    let lvl = parseInt(localStorage.getItem("lvl"));

    const expRequired = 100 * (1.25 ** (lvl - 1));

    document.getElementById("currentLvL").textContent = lvl;

    document.getElementById("exp").textContent = Math.round(exp);

    document.getElementById("expRequired").textContent = Math.round(expRequired);

    if (exp <= 0) {
        document.getElementById("expBar").style.width = "0%";
    } else {
        document.getElementById("expBar").style.width = `${(exp / expRequired) * 100}%`;
    }

} catch {
    console.log("Couldn't load exp or lvl");
}


// Tutorial script for the game
const tutorial = localStorage.getItem("tutorial");

if (tutorial != "no" || tutorial == null) {
    let removeDistraction = document.createElement("div");
    removeDistraction.classList.add("removeDistraction");

    document.body.appendChild(removeDistraction);
}

if (tutorial == null) {

    let askTutoial = document.createElement("div");
    askTutoial.classList.add("askTutorial");

    document.body.appendChild(askTutoial);

    askTutoial.style.top = window.innerHeight / 2 - askTutoial.clientHeight / 2 + "px";

    let askTutoialText = document.createElement("h1");
    askTutoialText.textContent = "Do you want to play the tutorial?";

    askTutoial.appendChild(askTutoialText);

    let tutorialButtonContainer = document.createElement("div");
    tutorialButtonContainer.classList.add("tutorialButtonContainer");

    askTutoial.appendChild(tutorialButtonContainer);

    let askTutoialNo = document.createElement("div");
    askTutoialNo.textContent = "No";
    askTutoialNo.style.backgroundColor = "red";
    
    askTutoialNo.classList.add("tutorialButton");

    tutorialButtonContainer.appendChild(askTutoialNo);

    let askTutoialYes = document.createElement("div");
    askTutoialYes.textContent = "Yes";
    askTutoialYes.style.backgroundColor = "green";

    askTutoialYes.classList.add("tutorialButton");

    tutorialButtonContainer.appendChild(askTutoialYes);

    askTutoialNo.addEventListener("click", () => {
        localStorage.setItem("tutorial", "no");
        document.body.removeChild(askTutoial);
        document.body.removeChild(document.querySelector(".removeDistraction"));
    });

    askTutoialYes.addEventListener("click", () => {
        localStorage.setItem("tutorial", "step1");
        document.body.removeChild(askTutoial);

        step1();
    });
}

function step1() {

    if (!window.location.href.includes("/start/start.html")) {
        window.location.href = "/start/start.html";
    }

    let tutorialText = document.createElement("h1");
    tutorialText.classList.add("tutorialText");

    tutorialText.textContent = "Welcome to the tutorial! This is your level and the amount of exp required to level up! CLICK ON THE DARK AREA TO CONTINUE!";

    document.body.appendChild(tutorialText);

    let tutorialHighlight = document.getElementById("lvlContainer");

    tutorialHighlight.style.zIndex = "100";
    tutorialHighlight.style.border = "5px solid red";

    document.querySelector(".removeDistraction").addEventListener("click", function handler() {

        tutorialHighlight.style.zIndex = "";
        tutorialHighlight.style.border = "";

        document.querySelector(".removeDistraction").removeEventListener("click", handler);


        // part 2
        tutorialText.textContent = "Lets see your stats! CLICK ON CHARACTERS TO CONTINUE!";

        tutorialHighlight = document.getElementById("CharacterButton");

        tutorialHighlight.style.zIndex = "100";
        tutorialHighlight.style.border = "5px solid red";

        tutorialHighlight.addEventListener("click", () => {
            localStorage.setItem("tutorial", "step2");

            document.body.removeChild(tutorialText);
            tutorialHighlight.style.zIndex = "";
            tutorialHighlight.style.border = "none";
            
            document.body.removeChild(document.querySelector(".removeDistraction"));

        });

    });
}

function step2() {
    let removeDistraction = document.createElement("div");
    removeDistraction.classList.add("removeDistraction");

    document.body.appendChild(removeDistraction);
    
    let tutorialText = document.createElement("h1");
    tutorialText.classList.add("tutorialText");

    tutorialText.textContent = "This is the character screen! Health improves your HP, attack is your damage and defense reduces damage taken! There are exceptions to this, but we will get to that later! CLICK ON THE DARK AREA TO CONTINUE!";

    document.body.appendChild(tutorialText);

    let tutorialHighlight = document.querySelector(".stats");

    tutorialHighlight.style.zIndex = "100";
    tutorialHighlight.style.border = "5px solid red";
    tutorialHighlight.style.backgroundColor = "rgb(252, 232, 155)"

    removeDistraction.addEventListener("click", function handler() {

        removeDistraction.removeEventListener("click", handler);

        
        // part 2
        tutorialText.textContent = "Statpoints are used to upgrade your stats! All characters gain 10 statpoints per level! You can use them to upgrade your stats! CLICK ON THE DARK AREA TO CONTINUE!";
        
        removeDistraction.addEventListener("click", function handler() {
            tutorialHighlight.style.zIndex = "";
            tutorialHighlight.style.border = "";
            tutorialHighlight.style.backgroundColor = ""

            tutorialText.textContent = "Lets go to the skill page! CLICK ON THE SKILLPAGE BUTTON!";

            tutorialHighlight = document.getElementById("skillpage");

            tutorialHighlight.style.zIndex = "100";
            tutorialHighlight.style.border = "5px solid red";

            tutorialHighlight.addEventListener("click", function handler() {

                tutorialHighlight.style.zIndex = "";
                tutorialHighlight.style.border = "";
                tutorialHighlight.style.backgroundColor = ""


                // part 3
                tutorialText.textContent = "You will be able to see your skills here! Scroll down and make sure to look at what each stat the skills scales off! CLICK ON THE DARK AREA TO CONTINUE!";

                tutorialHighlight = document.querySelectorAll(".skillcontainer");

                tutorialHighlight.forEach(tutorialHighlight => {
                    tutorialHighlight.style.zIndex = "100";
                    tutorialHighlight.style.border = "5px solid red";
                    tutorialHighlight.style.backgroundColor = "rgb(252, 232, 155)"
                });

                removeDistraction.removeEventListener("click", handler);

                removeDistraction.addEventListener("click", function handler() {
                    localStorage.setItem("tutorial", "step3");

                    tutorialHighlight.forEach(tutorialHighlight => {
                        tutorialHighlight.style.zIndex = "";
                        tutorialHighlight.style.border = "";
                        tutorialHighlight.style.backgroundColor = ""
                    });


                    // part 4
                    tutorialText.textContent = "Lets move on to the gameplay!";

                    tutorialText.style.left = "50%";

                    tutorialHighlight = document.querySelector(".exit");

                    tutorialHighlight.style.zIndex = "100";
                    tutorialHighlight.style.border = "5px solid red";
                });
            });

            
        
        });

    });
}

function step3() {

    let tutorialText = document.createElement("h1");
    tutorialText.classList.add("tutorialText");

    tutorialText.textContent = "CLICK PLAY TO ENTER THE MAP!";

    document.body.appendChild(tutorialText);

    let tutorialHighlight = document.getElementById("PlayButton");

    tutorialHighlight.style.zIndex = "100";
    tutorialHighlight.style.border = "5px solid red";

    tutorialHighlight.addEventListener("click", () => {
        localStorage.setItem("tutorial", "step4");

        document.body.removeChild(tutorialText);
        tutorialHighlight.style.zIndex = "2";
        tutorialHighlight.style.border = "none";
        
        document.body.removeChild(document.querySelector(".removeDistraction"));

    });
}

function step4() {

    let tutorialText = document.createElement("h1");
    tutorialText.classList.add("tutorialText");

    tutorialText.textContent = "This is the map! You can't enter a map before you have beaten the previous map! CLICK ON THE GREY NODE TO ENTER BATTLE!";

    document.body.appendChild(tutorialText);

    let tutorialHighlight = document.getElementById("lvl1");

    tutorialHighlight.style.zIndex = "100";
    tutorialHighlight.style.border = "5px solid red";

    tutorialHighlight.addEventListener("click", () => {
        localStorage.setItem("tutorial", "step5");

        document.body.removeChild(tutorialText);
        tutorialHighlight.style.zIndex = "";
        tutorialHighlight.style.border = "none";
        
        document.body.removeChild(document.querySelector(".removeDistraction"));

    });
}

function step5() {

    let tutorialText = document.createElement("h1");
    tutorialText.classList.add("tutorialText");

    tutorialText.textContent = "This is the healtbar! You can see your health and the enemies health here! CLICK ON THE DARK AREA TO CONTINUE!";

    document.body.appendChild(tutorialText);

    let tutorialHighlight = document.getElementById("enemyhealth");

    tutorialHighlight.style.zIndex = "100";
    tutorialHighlight.style.border = "5px solid red";

    document.querySelector(".removeDistraction").addEventListener("click", function handler() {

        tutorialHighlight.style.zIndex = "";
        tutorialHighlight.style.border = "none";
        
        document.querySelector(".removeDistraction").removeEventListener("click", handler);


        // part 2
        tutorialText.textContent = "This is your characters! PRESS THE BOTTOM CHARACTER TO CONTINUE!";

        tutorialHighlight = document.querySelector(".playerarea");

        tutorialHighlight.style.zIndex = "100";
        tutorialHighlight.style.border = "5px solid red";


        document.getElementById("player3").addEventListener("click", function handler() {

            tutorialHighlight.style.zIndex = "";
            tutorialHighlight.style.border = "none";
            
            document.getElementById("player3").removeEventListener("click", handler);


            // part 3
            tutorialText.textContent = "This is your skills! Skills that target all or is used on yourself will activate immidietly, while single target skills will only activate once you press your chosen target! (SKILL => TARGET) CLICK ON THE DARK AREA TO CONTINUE!";

            tutorialHighlight = document.querySelector(".skillarea");

            tutorialHighlight.style.zIndex = "100";
            tutorialHighlight.style.border = "5px solid red";

            document.querySelector(".removeDistraction").addEventListener("click", function handler() {

                tutorialText.textContent = "Ultimate skills are powerful skills that can only be used once after a certain amount of actions before going on cooldown again! GOOD LUCK, you are on your own now! CLICK ON THE DARK AREA TO CONTINUE!";

                document.querySelector(".removeDistraction").addEventListener("click", function handler() {
                    localStorage.setItem("tutorial", "no");

                    tutorialHighlight.style.zIndex = "";
                    tutorialHighlight.style.border = "none";
                    
                    document.querySelector(".removeDistraction").removeEventListener("click", handler);

                    document.body.removeChild(tutorialText);
                    document.body.removeChild(document.querySelector(".removeDistraction"));

                });
            });
        });

    });
}

if (tutorial == "step1") {
    step1();
} else if (tutorial == "step2") {
    step2();
} else if (tutorial == "step3") {
    step3();
} else if (tutorial == "step4") {
    step4();
} else if (tutorial == "step5") {
    step5();
}