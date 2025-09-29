let leftarrow = '/Bilder/Stat_screen/SVG/Left_arrow.svg'
let rightarrow = '/Bilder/Stat_screen/SVG/Right_arrow.svg'
let statscreen = document.querySelector(".stats").clientWidth;

// Setting canvas size
for (let p = 1; p < 4; p++) {
    for (let i = 1; i < 5; i++) {
        try {
            let c = document.getElementById(p+"c"+i);
            c.style.width = statscreen*0.2;
            c.style.height = statscreen*0.1;

            if (!c) {
                console.warn(`canvas ${i} not found.`);
                continue;
            } else {
                console.log("set size", p, i);
            }
        } catch {
            console.warn("couldnt set size", p, i);
        }
    }
    console.log("\n\n");
}

let lvl = JSON.parse(localStorage.getItem("lvl"));
let usedpoints = JSON.parse(localStorage.getItem("usedpoints"));

for (let p = 1; p < 4; p++) {
    for (let i = 1; i < 5; i++) {
        try {
            document.getElementById(p+"s"+i).style.color = "black";
            console.log("style s", p, i)
        } catch {
            console.warn("couldnt find")
        }
    }
    console.log("\n\n");
}

// Knight = 1, Shielder = 2, Mage = 3
let characterstats1 = [
    {characterstats: 20},
    {characterstats: 20},
    {characterstats: 20},
]

let characterstats2 = [
    {characterstats: 30},
    {characterstats: 10},
    {characterstats: 30},
]

let characterstats3 = [
    {characterstats: 10},
    {characterstats: 30},
    {characterstats: 10},
]
// ------------------------------------------------

// Updating stats
function loadStats(p) {
    let characterusedpoint = usedpoints[p-1]["usedpoints"]
    localStorage.setItem("characterstatspoints", (lvl*10)-characterusedpoint);
    let characterstatspoints = JSON.parse(localStorage.getItem("characterstatspoints"));
    let extrastats = JSON.parse(localStorage.getItem("extrastats"+p));

    // Setting color
    for (let i = 1; i < 5; i++) {
        if (extrastats[i-1]["extrastat"] > 0) {
            document.getElementById(p+"s"+i).style.color = "green";
        } else {
            document.getElementById(p+"s"+i).style.color = "black";
        }
    }
    // ------------------------------------------------

    // Deciding which character stats to use
    let currentCharacterstats;
    if (p === 1) {
        currentCharacterstats = characterstats1;
    } else if (p === 2) {
        currentCharacterstats = characterstats2;
    } else if (p === 3) {
        currentCharacterstats = characterstats3;
    }

    // ------------------------------------------------


    // Final stat value
    let updatedStats = [
        { statvalue: currentCharacterstats[0]["characterstats"] + extrastats[0]["extrastat"] },
        { statvalue: currentCharacterstats[1]["characterstats"] + extrastats[1]["extrastat"] },
        { statvalue: currentCharacterstats[2]["characterstats"] + extrastats[2]["extrastat"] },
        { statvalue: characterstatspoints }
    ];
    localStorage.setItem("finalstatvalue"+p, JSON.stringify(updatedStats))
    // ------------------------------------------------

    // Update stat
    for (let i = 1; i < 5; i++) {
        try {
            document.getElementById(p+"s"+i).textContent = updatedStats[i-1]["statvalue"];
            console.log("added stats", p, i)
        } catch {
            console.warn("couldnt find stat")
        }
    }
    console.log("\n\n");
    // ------------------------------------------------

}
// ------------------------------------------------

drawStatNumbers();

// Draw everything
function drawStatNumbers() {
    for (let p = 1; p < 4; p++) {


        // Clear the canvas
        for (let i = 1; i < 5; i++) {
            try {
                let c = document.getElementById(p+"c"+i);
                let ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);

                console.log("cleared:", c)
            } catch {
                console.warn("couldnt find")
            }
        }
        console.log("\n\n");
        // ------------------------------------------------
        
        // Draw the stat numbers
        loadStats(p);
        // --------------------------------------------------


        // Draw the arrows
        let leftarrowimg = new Image();
        leftarrowimg.src = leftarrow;

        leftarrowimg.onload = function() {
            for (let i = 1; i < 4; i++) {
                if (i != 5) {
                    let c = document.getElementById(p+"c"+i);
                    let ctx = c.getContext("2d");

                    ctx.drawImage(leftarrowimg, c.clientWidth*0.2, (c.clientHeight*0.5)-(c.clientWidth*0.05), c.clientWidth*0.1, c.clientWidth*0.1); 
                }
            }
        }

        let rightarrowimg = new Image();
        rightarrowimg.src = rightarrow;

        rightarrowimg.onload = function() {
            for (let i = 1; i < 4; i++) {
                if (i != 5) {
                    let c = document.getElementById(p+"c"+i);
                    let ctx = c.getContext("2d");

                    ctx.drawImage(rightarrowimg, c.clientWidth*0.7, (c.clientHeight*0.5)-(c.clientWidth*0.05), c.clientWidth*0.1, c.clientWidth*0.1);
                }
            }
        }
        // --------------------------------------------------
    }
}
// ------------------------------------------------


// Add event listener to the canvas
for (let p = 1; p < 4; p++) {
    for (let i = 1; i < 4; i++) {
        let c = document.getElementById(p+"c"+i);

        try {
            console.log("Canvas event added:", c);

            c.addEventListener("click", (event) => {
                let extrastats = JSON.parse(localStorage.getItem("extrastats"+p));
                console.log(`Clicked on canvas c${i}`);
                const rect = c.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const arrowSize = c.clientWidth * 0.2;
                const hitboxSize = arrowSize * 2;
                const arrowXLeft = c.clientWidth * 0.2 - (hitboxSize - arrowSize) / 2;
                const arrowXRight = c.clientWidth * 0.7 - (hitboxSize - arrowSize) / 2;
                const arrowY = c.clientHeight * 0.5 - hitboxSize * 0.5;

                // Checking if arrow was clicked
                /* Left arrow */ if (x >= arrowXLeft && x <= arrowXLeft + hitboxSize && y >= arrowY && y <= arrowY + hitboxSize) {
                    if (extrastats[i-1]["extrastat"] > 0) {

                        // Update usedpoints
                        usedpoints[p-1]["usedpoints"]--;
                        localStorage.setItem("usedpoints", JSON.stringify(usedpoints));
                        // ------------------------------------------------

                        // Update extrastats
                        extrastats[i-1]["extrastat"]--;
                        localStorage.setItem("extrastats"+p, JSON.stringify(extrastats));
                        // ------------------------------------------------

                        // Redraw the stat numbers
                        loadStats(p);
                    } else {
                        console.log("Stat is already at minimum");
                    }
                    console.log(`Clicked left arrow on c${i}`);
                } /* Right arrow */ else if (x >= arrowXRight && x <= arrowXRight + hitboxSize && y >= arrowY && y <= arrowY + hitboxSize) {
                    if (lvl*10-usedpoints[p-1]["usedpoints"] > 0) {

                        // Update usedpoints
                        usedpoints[p-1]["usedpoints"]++;
                        localStorage.setItem("usedpoints", JSON.stringify(usedpoints));
                        // ------------------------------------------------

                        // Update extrastats
                        extrastats[i-1]["extrastat"]++;
                        localStorage.setItem("extrastats"+p, JSON.stringify(extrastats));
                        // ------------------------------------------------
                        
                        // Redraw the stat numbers
                        loadStats(p);
                    } else {
                        console.log("No more points to use");
                    }
                    console.log(`Clicked right arrow on c${i}`);
                }
                // ------------------------------------------------

                // Updating color
                if (extrastats[i-1]["extrastat"] > 0) {
                    document.getElementById(p+"s"+i).style.color = "green";
                } else {
                    document.getElementById(p+"s"+i).style.color = "black";
                }
            });
        } catch {
            console.warn("couldnt find canvas")
        }
    }
    console.log("\n\n");

}
// ------------------------------------------------

// Switching to skill page
document.getElementById("skillpage").addEventListener("click", () => {
    document.querySelectorAll(".skillcontainer").forEach(el => el.classList.toggle("skillcontainerShow"))
    document.querySelectorAll(".stats").forEach(el => el.classList.toggle("statHidden"))
    console.log("Switched page")
});
// ------------------------------------------------