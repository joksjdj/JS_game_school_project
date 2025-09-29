// New game
localStorage.setItem("lvl", localStorage.getItem("lvl") ?? 1);
let lvl = JSON.parse(localStorage.getItem("lvl"));

if (localStorage.getItem("usedpoints") == null) {
    let usedpoints = [
        {usedpoints: 0},
        {usedpoints: 0},
        {usedpoints: 0}
    ]
    localStorage.setItem("usedpoints", JSON.stringify(usedpoints));
}
let usedpoints = JSON.parse(localStorage.getItem("usedpoints"));

if (localStorage.getItem("characterstatspoints") == null) {
    localStorage.setItem("characterstatspoints", (lvl*10)-usedpoints);
}

for (let p = 1; p < 4; p++) {

    if (localStorage.getItem("extrastats"+p) == null) {
        let extrastats1 = [
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0}
        ]
        let extrastats2 = [
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0}
        ]
        let extrastats3 = [
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0},
            {extrastat: 0}
        ]
        let extrastats = eval(`extrastats${p}`);
        localStorage.setItem("extrastats"+p, JSON.stringify(extrastats));
    }
}
// -----------------------------------------------

// Knight = 1, Shielder = 2, Mage = 3
let characterstats2 = [
    {characterstats: 30},
    {characterstats: 10},
    {characterstats: 30},
]

let characterstats1 = [
    {characterstats: 20},
    {characterstats: 20},
    {characterstats: 20},
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
}
// ------------------------------------------------

drawStatNumbers();

// Draw everything
function drawStatNumbers() {
    for (let p = 1; p < 4; p++) {
        // Draw the stat numbers
        loadStats(p);
        // --------------------------------------------------
    }
}
// ------------------------------------------------

function map() {
    let something = document.getElementById("map");

    let button = something.querySelector(".button");
    let sword = something.querySelector(".sword");

    button.classList.remove("button");
    button.classList.add("animateObject");
    sword.classList.remove("sword");
    sword.classList.add("animateSword");
    
    setTimeout(() => {
        window.location.href = `/map/map.html`;
    }, 550);
};

function characters() {
    let something = document.getElementById("characters");

    let button = something.querySelector(".button");
    let sword = something.querySelector(".sword");

    button.classList.remove("button");
    button.classList.add("animateObject");
    sword.classList.remove("sword");
    sword.classList.add("animateSword");
    
    setTimeout(() => {
        window.location.href = `/characters/characters.html`;
    }, 550);
};

function settings() {
    let something = document.getElementById("settings");

    let button = something.querySelector(".button");
    let sword = something.querySelector(".sword");

    button.classList.remove("button");
    button.classList.add("animateObject");
    sword.classList.remove("sword");
    sword.classList.add("animateSword");
    
    setTimeout(() => {
        window.location.href = `/settings/settings.html`;
    }, 550);
}

if (localStorage.getItem("exp") == null) {
    localStorage.setItem("exp", 0);
}