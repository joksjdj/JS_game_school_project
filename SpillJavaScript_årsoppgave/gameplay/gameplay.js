const body = document.querySelector("body");

var turns = 1;

// Enemies
var deadEnemy1 = false;
var deadEnemy2 = false;
var deadEnemy3 = false;
{
    let maplvl = localStorage.getItem("maplvl")

    let difficulty = 1+(0.1*(maplvl-1));

    var enemytype1 = [
        {enemystat: 90*difficulty},
        {enemystat: 4*difficulty},
        {enemystat: 5*difficulty}
    ]

    var enemytype2 = [
        {enemystat: 300*difficulty},
        {enemystat: 6*difficulty},
        {enemystat: 10*difficulty}
    ]

    var enemytype3 = [
        {enemystat: 1000},
        {enemystat: 50},
        {enemystat: 30}
    ]

    let img;
    if (maplvl < 3) {

        for (let i = 1; i < 4; i++) {

            try {
                img = document.createElement("img")
                img.src = "/Bilder/Enemies/Goblin.apng"

                document.getElementById("enemy"+i).appendChild(img)

                localStorage.setItem("enemy"+i, JSON.stringify(enemytype1));
                localStorage.setItem("maxHP" + i, JSON.stringify(enemytype1));

                let enemyName = "Goblin"

                console.log("added enemy", i)

                addHealthbarEnemy(i, enemyName);
                
            } catch {
                console.warn("could not add enemy", i)
            }

        }
        console.log("\n\n");

    } else if (maplvl < 5) {

        for (let i = 1; i < 4; i++) {

            try {

                img = document.createElement("img")

                let enemyName;
                if (i == 1 || i == 3) {
                    img.src = "/Bilder/Enemies/Goblin.apng"
                    localStorage.setItem("enemy" + i, JSON.stringify(enemytype1));
                    localStorage.setItem("maxHP" + i, JSON.stringify(enemytype1));

                    enemyName = "Goblin"
                } else if (i == 2) {
                    img.src = "/Bilder/Enemies/Unfinished/OrcUnfinished.png"
                    localStorage.setItem("enemy" + i, JSON.stringify(enemytype2));
                    localStorage.setItem("maxHP" + i, JSON.stringify(enemytype2));

                    document.getElementById("enemy"+i).classList.add("orc")

                    enemyName = "Orc"
                }

                document.getElementById("enemy"+i).appendChild(img)

                console.log("added enemy", i)

                addHealthbarEnemy(i, enemyName);
            
            } catch {
                console.warn("could not add enemy", i)
            }
            
        }
        console.log("\n\n");

    } else if (maplvl == 5) {
        for (let i = 2; i < 4; i++) {
            document.getElementById("enemy"+i).remove();
        }

        try {
            img = document.createElement("img")
            img.src = "/Bilder/Enemies/SVG/newBoss.svg"

            document.getElementById("enemy1").appendChild(img)

            localStorage.setItem("enemy1", JSON.stringify(enemytype3));
            localStorage.setItem("maxHP1", JSON.stringify(enemytype3));

            console.log("added enemy1")

            let i = 1;

            deadEnemy2 = true;
            deadEnemy3 = true;

            let enemyName = "Boss"

            document.getElementById("enemy1").classList.add("boss")

            addHealthbarEnemy(i, enemyName);
            
        } catch {
            console.warn("could not add enemy", i)
        }
    }

    function addHealthbarEnemy(i, enemyName) {

        let enemyHealthContainer = document.getElementById("enemyhealth");

        let healtbarBox = document.createElement("div");

        healtbarBox.classList.add("healthbar");

        healtbarBox.style.width = enemyHealthContainer.clientWidth+"px";

        enemyHealthContainer.appendChild(healtbarBox);

        let currentHealthbar = document.createElement("div");

        currentHealthbar.id = "currentEnemyHealth"+i;
        currentHealthbar.classList.add("currenthealthbar");

        currentHealthbar.style.width = healtbarBox.clientWidth+"px";

        healtbarBox.appendChild(currentHealthbar);

        let maxHP = JSON.parse(localStorage.getItem("maxHP"+i))[0]["enemystat"];

        let healtbarInfo = document.createElement("div");
        healtbarInfo.classList.add("healthbarInfo");

        healtbarBox.appendChild(healtbarInfo);

        let enemyNameText = document.createElement("span");
        enemyNameText.textContent = enemyName+":";

        healtbarInfo.appendChild(enemyNameText);

        let currentHP = document.createElement("span");
        currentHP.id = "enemyCurrentHP"+i;
        currentHP.textContent = Math.round(maxHP);

        healtbarInfo.appendChild(currentHP);

        let shlash = document.createElement("span");
        shlash.textContent = "/";

        healtbarInfo.appendChild(shlash);

        let maxHPText = document.createElement("span");
        maxHPText.textContent = Math.round(maxHP);

        healtbarInfo.appendChild(maxHPText);

    }
}

// Skill buttons
var enemies;
var targetHeal;

function characterClicked(event) {

    console.log("clicked", event.target.id);

    document.getElementById("player1skillcontainer").style.display = "none";
    document.getElementById("player2skillcontainer").style.display = "none";
    document.getElementById("player3skillcontainer").style.display = "none";

    document.getElementById(event.target.id+"skillcontainer").style.display = "block";

    console.log("\n\n");
    
}

{
    for (let p = 1; p < 4; p++) {
        
        let chosenCharacter = document.getElementById("player"+p);

        

        try {
            chosenCharacter.addEventListener("click", characterClicked);

            console.log("added event listener to player", p, document.getElementById("player"+p))
        } catch {
            console.warn("could not add event listener to player", p)
        }
    }
    console.log("\n\n");
}

// Players
var targetPlayerList = ["player1", "player2", "player3"];
var KnightStats = JSON.parse(localStorage.getItem("finalstatvalue1"))
var ShieldStats = JSON.parse(localStorage.getItem("finalstatvalue2"))
var MageStats = JSON.parse(localStorage.getItem("finalstatvalue3"))
var playerSkillstatus = [];
var cancelSkill = [];
var dmg;
var shieldDead = false;

function updateHealthBarPlayer() {
    let players = [KnightStats, ShieldStats, MageStats];

    try {
        for (let i = 0; i < players.length; i++) {
            let playerHP = players[i][0]["statvalue"];
            document.getElementById("currentHP" + (i + 1)).textContent = Math.ceil(playerHP);

            let playerMaxHP = JSON.parse(localStorage.getItem("finalstatvalue"+(i+1)))[0]["statvalue"];
            document.getElementById("maxHP" + (i + 1)).textContent = playerMaxHP;

            let playerHealthbarBox;
            if (playerHP <= 0) {
                playerHealthbarBox = 0;
                targetPlayerList = targetPlayerList.filter(name => name !== "player"+(i+1));

                if ("player"+(i+1) == "player3") {
                    mageAgro = 0;
                }
                if ("player"+(i+1) == "player2") {
                    agro = 0;

                    shieldDead = true;
                }
                if ("player"+(i+1) == "player1") {
                    counterState = false;
                }
            } else {
                playerHealthbarBox = document.getElementById("playerhealth"+(i+1)).clientWidth;
            }
            document.getElementById("playerHealthbar" + (i + 1)).style.width = playerHealthbarBox*(playerHP/playerMaxHP)+"px";

            if (playerHP <= 0) {
                document.getElementById("player"+(i+1)).removeEventListener("click", characterClicked);
                document.getElementById("player"+(i+1)+"skillcontainer").style.display = "none";

                console.log("Player", (i+1), "is dead", document.getElementById("player"+(i+1)))
            }

            if (KnightStats[0]["statvalue"] <= 0 && ShieldStats[0]["statvalue"] <= 0 && MageStats[0]["statvalue"] <= 0) {
                let losingScreen = document.createElement("div")

                losingScreen.classList.add("losingScreen")

                body.appendChild(losingScreen)

                let losingText = document.createElement("h1")
                losingText.classList.add("losingText")

                losingText.textContent = "You lost"

                losingScreen.appendChild(losingText)

                returnButton = document.createElement("button")
                returnButton.classList.add("returnButton")
                returnButton.textContent = "Return to map"
                returnButton.addEventListener("click", () => {
                    window.location.href = "/map/map.html";
                })

                losingScreen.appendChild(returnButton)
                console.log("you lost")
            }

        }
    } catch {
        console.error("Something went wrong with the player healthbar")
    }
}
updateHealthBarPlayer();

// Shield
var ShieldSkillStatus = 0;
var ShieldCooldown = 2;
var agro = 0;
var agroStatus = 0;
{
    function shieldUltCooldown() {
        if (ShieldCooldown <= 0) {
            document.getElementById("skillshield3").querySelector(".skillOnCooldown").style.visibility = "hidden";
        } else if (ShieldCooldown >= 1) {
            document.getElementById("skillshield3").querySelector(".skillOnCooldown").style.visibility = "visible";
        }
    }

    function shielddealdmg() {    

        for (let i = 1; i < 4; i++) {

            let skill = document.getElementById("skillshield"+i);

            /*Console log*/{
                if (!skill) {
                    console.warn(`Element skillshield${i} not found.`);
                    continue;
                } else {
                    console.log("added SHIELD skill", i);
                }
            }

            skill.addEventListener("click", shieldAction);

            async function shieldAction() {
                console.log("clicked skill", i);

                ShieldSkillStatus = i

                if (turns == 1) {
                    turns = 2;

                    if (ShieldSkillStatus == 1) {
                        await ShieldSkill1()
                    } else if (ShieldSkillStatus == 2) {
                        await ShieldSkill2()
                    } else if (ShieldSkillStatus == 3) {
                        await ShieldSkill3()
                    }
                }

                shieldUltCooldown();

            }
        }
        console.log("\n\n");
    }

    let skillIsWaiting = false;

    async function ShieldSkill1() {
        if (skillIsWaiting) return;
        skillIsWaiting = true;

        console.log("Waiting...")

        playerSkillstatus.push("shield")

        await waitForEnemyClick();

        if (cancelSkill.includes("shield")) throw new Error("Skill cancelled");

        console.log("Target chosen");

        dmg = ShieldStats[2]["statvalue"]*0.5;
        
        SingleTargetSkillUsed(enemies)

        ShieldCooldown--;
        skillIsWaiting = false;

        console.log("\n\n");
    }

    async function ShieldSkill2() {

        if (agroStatus <= 0) {
            document.querySelector("#skillshield2 h1").textContent += " (ACTIVE)";
        }

        agroStatus = 4;

        ShieldCooldown--;

        document.getElementById("player2").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player2").classList.remove("animation");
        }, 1000);

        console.log("\n\n");

        enemydealDmg();
    }

    async function ShieldSkill3() {
        if (ShieldCooldown <= 0) {
            if (skillIsWaiting) return;
            skillIsWaiting = true;

            document.querySelectorAll(".playerarea div").forEach((div) => {
                div.removeEventListener("click", characterClicked);
            })

            console.log("Waiting...")

            await waitForPlayerClick();

            let HealNow;
            let maxHeal;
            if (targetHeal == "player1") {
                HealNow = KnightStats;
                maxHeal = JSON.parse(localStorage.getItem("finalstatvalue1"))[0]["statvalue"];
            } else if (targetHeal == "player2") {
                HealNow = ShieldStats;
                maxHeal = JSON.parse(localStorage.getItem("finalstatvalue2"))[0]["statvalue"];
            } else if (targetHeal == "player3") {
                HealNow = MageStats;
                maxHeal = JSON.parse(localStorage.getItem("finalstatvalue3"))[0]["statvalue"];
            }

            HealNow[0]["statvalue"] = Math.min(HealNow[0]["statvalue"] + ShieldStats[2]["statvalue"]*0.3, maxHeal);

            ShieldCooldown = 2;

            skillIsWaiting = false;

            document.getElementById("player2").classList.add("animation");
            setTimeout(() => {
                document.getElementById("player2").classList.remove("animation");
            }, 1000);

            updateHealthBarPlayer();

            document.querySelectorAll(".playerarea div").forEach((div) => {
                div.addEventListener("click", characterClicked);
            })

            console.log("\n\n");

            enemydealDmg();
        }
    }

    function waitForPlayerClick() {
        return new Promise(resolve => {
            document.querySelectorAll(".playerarea div").forEach((div) => {
                div.addEventListener("click", () => {
                targetHeal = div.id;
                console.log("clicked", div.id);
                resolve(div.id);
            }); 
            });
        });
    }

}
shielddealdmg();

// Knight
var KnightSkillStatus = 0;
var KnightCooldown = 4;
var storedDmg = 0;
var knightBuff = false;
var knightBuffLength = 0;
var counterState = false;
var counterStateLength = 0;
{
    function knightUltCooldown() {
        if (KnightCooldown <= 0) {
            document.getElementById("skillknight4").querySelector(".skillOnCooldown").style.visibility = "hidden";
        } else if (KnightCooldown >= 1) {
            document.getElementById("skillknight4").querySelector(".skillOnCooldown").style.visibility = "visible";
        }
    }

    function knightdealdmg() {
        for (let i = 1; i < 5; i++) {

            let skill = document.getElementById("skillknight"+i);

            /*Console log*/{
                if (!skill) {
                    console.warn(`Element skillknight${i} not found.`);
                    continue;
                } else {
                    console.log("added KNIGHT skill", i);
                }
            }

            skill.addEventListener("click", knightAction);

            async function knightAction() {
                console.log("clicked skill", i);

                KnightSkillStatus = i

                if (turns == 1) {
                    turns = 2;

                    if (KnightSkillStatus == 1) {
                        await KnightSkill1()
                    } else if (KnightSkillStatus == 2) {
                        await KnightSkill2()
                    } else if (KnightSkillStatus == 3) {
                        await KnightSkill3()
                    } else if (KnightSkillStatus == 4) {
                        await KnightSkill4()
                    }
                }

                knightUltCooldown();

            }
        }
        console.log("\n\n");
    }

    let skillIsWaiting = false;

    async function KnightSkill1() {
        if (skillIsWaiting) return;
        skillIsWaiting = true;

        console.log("Waiting...")

        playerSkillstatus.push("knight")

        await waitForEnemyClick();

        if (cancelSkill.includes("knight")) throw new Error("Skill cancelled");

        console.log("Target chosen");

        dmg = KnightStats[1]["statvalue"];
        
        SingleTargetSkillUsed(enemies);

        KnightCooldown--;
        skillIsWaiting = false;

        console.log("\n\n");
    }

    async function KnightSkill2() {

        if (knightBuff == false) {
            KnightStats[1]["statvalue"] = KnightStats[1]["statvalue"]*1.2;
            KnightStats[2]["statvalue"] = KnightStats[2]["statvalue"]*1.2;

            document.querySelector("#skillknight2 h1").textContent += " (ACTIVE)";

            knightBuff = true;
            knightBuffLength = 3;
        } else {
            knightBuffLength = 3;
        }

        KnightCooldown--;

        document.getElementById("player1").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player1").classList.remove("animation");
        }, 1000);

        enemydealDmg();

    }

    async function KnightSkill3() {
        
        if (counterState == false) {
            document.querySelector("#skillknight3 h1").textContent += " (ACTIVE)";
        }

        counterState = true;
        counterStateLength = 4;

        KnightCooldown--;

        document.getElementById("player1").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player1").classList.remove("animation");
        }, 1000);

        enemydealDmg();
    }

    async function KnightSkill4() {
        if (KnightCooldown <= 0) {
            if (skillIsWaiting) return;
            skillIsWaiting = true;

            console.log("Waiting...")

            playerSkillstatus.push("knight")

            await waitForEnemyClick();

            if (cancelSkill.includes("knight")) throw new Error("Skill cancelled");

            console.log("Target chosen");

            dmg = storedDmg*4;

            SingleTargetSkillUsed(enemies);

            storedDmg = 0;

            KnightCooldown = 4;

            skillIsWaiting = false;
            
            console.log("\n\n");
        }
    }
}
knightdealdmg();

// Mage
var MageSkillStatus = 0;
var MageCooldown = 3;
var mageUlt = document.getElementById("skillmage3");
var mageAgro = 10;
{
    
    function mageUltCooldown() {
        if (MageCooldown <= 0) {
            mageUlt.querySelector(".skillOnCooldown").style.visibility = "hidden";
        } else if (MageCooldown >= 1) {
            mageUlt.querySelector(".skillOnCooldown").style.visibility = "visible";
        }
    }

    function magedealdmg() {

        for (let i = 1; i < 4; i++) {

            let skill = document.getElementById("skillmage"+i);

            /*Console log*/{
                if (!skill) {
                    console.warn(`Element skillmage${i} not found.`);
                    continue;
                } else {
                    console.log("added MAGE skill", i);
                }
            }

            skill.addEventListener("click", mageAction);

            async function mageAction() {
                console.log("clicked skill", i);

                MageSkillStatus = i

                if (turns == 1) {
                    turns = 2;

                    if (MageSkillStatus == 1) {
                        await MageSkill1()
                    } else if (MageSkillStatus == 2) {
                        await MageSkill2()
                    } else if (MageSkillStatus == 3) {
                        await MageSkill3()
                    }
                }

                mageUltCooldown();

            }
        }
        console.log("\n\n");
    }

    let skillIsWaiting = false;

    async function MageSkill1() {
        if (skillIsWaiting) return;
        skillIsWaiting = true;

        console.log("Waiting...")

        playerSkillstatus.push("mage")

        await waitForEnemyClick();

        if (cancelSkill.includes("mage")) throw new Error("Skill cancelled");

        console.log("Target chosen");

        dmg = MageStats[1]["statvalue"]*2;
        
        SingleTargetSkillUsed(enemies)

        MageCooldown--;
        skillIsWaiting = false;

        console.log("\n\n");
    }

    async function MageSkill2() {

        dmg = MageStats[1]["statvalue"];

        MageCooldown--;

        AoEskillUsed()

        skillIsWaiting = false;

        console.log("\n\n");
    }

    async function MageSkill3() {

        if (MageCooldown <= 0) {

            dmg = MageStats[1]["statvalue"]*4;

            MageCooldown = 4

            AoEskillUsed()

            skillIsWaiting = false;

            console.log("\n\n");
        } else {
            console.log("on cooldown")
        }
    }
}
magedealdmg();

// Skills Used
function AoEskillUsed() {
    document.querySelectorAll(".enemyarea div").forEach((div) => {
        let targetData = JSON.parse(localStorage.getItem(div.id));
        targetData[0].enemystat -= dmg;
        localStorage.setItem(div.id, JSON.stringify(targetData));
        
        console.log(`Hits ${div.id} for ${dmg} damage`);
    });

    document.getElementById("player3").classList.add("animation");
    setTimeout(() => {
        document.getElementById("player3").classList.remove("animation");
    }, 1000);
    
    UpdateHealthBarEnemy();

    console.log("\n\n");

    enemydealDmg();
}

function SingleTargetSkillUsed(target) {

    let targetData = JSON.parse(localStorage.getItem(target));
    targetData[0].enemystat -= dmg;
    localStorage.setItem(target, JSON.stringify(targetData));

    let animatedPlayer = playerSkillstatus[playerSkillstatus.length-1];

    if (animatedPlayer == "knight") {
        document.getElementById("player1").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player1").classList.remove("animation");
        }, 1000);

    } else if (animatedPlayer == "shield") {
        document.getElementById("player2").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player2").classList.remove("animation");
        }, 1000);

    } else if (animatedPlayer == "mage") {
        document.getElementById("player3").classList.add("animation");
        setTimeout(() => {
            document.getElementById("player3").classList.remove("animation");
        }, 1000);
        
    }

    playerSkillstatus = [];
    cancelSkill = [];

    console.log(`Dealt ${dmg} damage to ${target}`);

    UpdateHealthBarEnemy();

    console.log("\n\n");
    
    enemydealDmg();
}

function UpdateHealthBarEnemy() {
    
        for (let i = 1; i < 4; i++) {
            try {
                let currentHealthbar = document.getElementById("currentEnemyHealth"+i);
                let healtbarBox = currentHealthbar.parentElement;
                

                let maxHP = JSON.parse(localStorage.getItem("maxHP"+i))[0]["enemystat"];
                let currentHP = JSON.parse(localStorage.getItem("enemy"+i))[0]["enemystat"];

                let newSizeMulti;
                if (currentHP <= 0) {
                    if (i == 1) {
                        deadEnemy1 = true;
                        document.getElementById("enemy1").remove();
                    } else if (i == 2) {
                        deadEnemy2 = true;
                        document.getElementById("enemy2").remove();
                    } else if (i == 3) {
                        document.getElementById("enemy3").remove();
                        deadEnemy3 = true;
                    }

                    newSizeMulti = 0;
                } else {
                    newSizeMulti = currentHP/maxHP;
                }

                let newSize = healtbarBox.clientWidth*newSizeMulti;

                currentHealthbar.style.width = newSize+"px";

                document.getElementById("enemyCurrentHP"+i).textContent = Math.ceil(currentHP);
            } catch {
                console.error("Something went wrong with enemy", i, "healthbar")
            }
        }

        if (deadEnemy1 == true && deadEnemy2 == true && deadEnemy3 == true) {
            
            document.getElementById("player1skillcontainer").style.display = "none";
            document.getElementById("player2skillcontainer").style.display = "none";
            document.getElementById("player3skillcontainer").style.display = "none";
            
            let winningScreen = document.createElement("div")
            winningScreen.classList.add("winningScreen")

            body.appendChild(winningScreen)
            let winningText = document.createElement("h1")

            winningText.classList.add("winningText")

            winningText.textContent = "You won"

            winningScreen.appendChild(winningText)

            console.log("you won")

            localStorage.setItem("maplvl"+localStorage.getItem("maplvl"), "won");

            let maplvl = localStorage.getItem("maplvl")
            let lvl = JSON.parse(localStorage.getItem("lvl"));

            let exp = parseInt(localStorage.getItem("exp"));

            let expRequired = 100 * (1.25 ** (lvl - 1));

            exp += 100 * (1.1 ** (maplvl - 1));

            if (exp >= expRequired) {
                exp = exp - expRequired;
                lvl++;
                localStorage.setItem("lvl", lvl);
                localStorage.setItem("exp", exp);

                let lvlUpScreen = document.createElement("h1")
                lvlUpScreen.classList.add("lvlUpScreen")

                lvlUpScreen.textContent = "Level up! You are now level " + lvl

                winningScreen.appendChild(lvlUpScreen)

            }

            localStorage.setItem("exp", exp);

            returnButton = document.createElement("button")
            returnButton.classList.add("returnButton")
            returnButton.textContent = "Return to map"
            returnButton.addEventListener("click", () => {
                window.location.href = "/map/map.html";
            })

            winningScreen.appendChild(returnButton)
        }
    
}

function waitForEnemyClick() {
    return new Promise(resolve => {

        if (playerSkillstatus.length >= 2) {
            for (let i = 0; i < playerSkillstatus.length-1; i++) {
                try {
                    cancelSkill.push(playerSkillstatus[i])
                } catch {
                    console.error("Something went wrong with the skill cancel")
                }
            }
        }

        document.querySelectorAll(".enemyarea div").forEach((div) => {
            div.addEventListener("click", () => {
                enemies = div.id;
                console.log("clicked", div.id);
                resolve();
            }); 
        });
      
    });
}

// Enemy
var Turn = 1
function enemydealDmg() {

    setTimeout(() => {

        let attackingEnemy;
        let animatedEnemy;
        try {
            while (true) {
                if (deadEnemy1 == true && deadEnemy2 == true && deadEnemy3 == true) {
                    console.log("All enemies are dead")
                    return;
                } else if (Turn == 1) {
                    attackingEnemy = JSON.parse(localStorage.getItem("enemy1"));
                    console.log("enemy", Turn);

                    animatedEnemy = document.getElementById("enemy1");
            
                    if (deadEnemy1 == true) {
                        console.log("Enemy 1 is dead");
                        Turn = 2;
                    } else {
                        Turn++;
                        break;
                    }
            
                } else if (Turn == 2) {
                    attackingEnemy = JSON.parse(localStorage.getItem("enemy2"));
                    console.log("enemy", Turn);
                    animatedEnemy = document.getElementById("enemy2");
            
                    if (deadEnemy2 == true) {
                        console.log("Enemy 2 is dead");
                        Turn = 3;
                    } else {
                        Turn++;
                        break;
                    }
            
                } else if (Turn == 3) {
                    attackingEnemy = JSON.parse(localStorage.getItem("enemy3"));
                    console.log("enemy", Turn);
                    animatedEnemy = document.getElementById("enemy3");
            
                    if (deadEnemy3 == true) {
                        console.log("Enemy 3 is dead");
                        Turn = 1;
                    } else {
                        Turn = 1;
                        break;
                    }
                }
            }
        } catch {
                console.error("Enemy couldnt be selected")
        }

        let n = targetPlayerList.length;

        let baseWeight = 100/n;

        let targetPlayer;
        let randomNumber;

        if (agroStatus > 0) {
            agro = 10;
        } else {
            agro = 0;

            document.querySelector("#skillshield2 h1").textContent = document.querySelector("#skillshield2 h1").textContent.replace("(ACTIVE)", "");
            console.log("Shield agro ended");
        }

        try {
            randomNumber = targetPlayerList.map(name => {
                if (name == "player1") {
                    if (n == 1) {
                        return { name, weight: baseWeight };
                    } else {
                        return { name, weight: baseWeight + (mageAgro/(n-1)) - (agro/(n-1)) };
                    }
                }

                if (name == "player2") {
                    if (n == 1) {
                        return { name, weight: baseWeight };
                    } else {
                        return { name, weight: baseWeight + (mageAgro/(n-1)) + agro  };
                    }
                }

                if (name == "player3") {
                    if (n == 1) {
                        return { name, weight: baseWeight };
                    } else {
                        return { name, weight: baseWeight - mageAgro - (agro/(n-1)) };
                    }
                }
            });
            console.log(randomNumber);

            function chooseWeightedRandom(options) {
                const totalWeight = options.reduce((sum, item) => sum + item.weight, 0);
                const rand = Math.random() * totalWeight;

                let cumulative = 0;
                for (const item of options) {
                    cumulative += item.weight;
                    if (rand < cumulative) {
                    return item.name;
                    }
                }
            }

            const result = chooseWeightedRandom(randomNumber);
            console.log("Chosen target:", result);

            if (result == "player1") {
                targetPlayer = KnightStats;
            } else if (result == "player2") {
                targetPlayer = ShieldStats;
            } else if (result == "player3") {
                targetPlayer = MageStats;
            }

        } catch {
            console.error("Something went wrong with the random number")
        }

        try {
            if (shieldDead == true) {
                let dmgDealtTarget = ((attackingEnemy[1]["enemystat"])*(targetPlayer[2]["statvalue"] ** (-0.005*targetPlayer[2]["statvalue"])));

                targetPlayer[0]["statvalue"]-=dmgDealtTarget;

                console.log("Enemy dealt", dmgDealtTarget, "DMG");

                console.log("players health is", targetPlayer[0]["statvalue"]);
                
            } else {
                let dmgDealtTarget = ((attackingEnemy[1]["enemystat"]*0.3)*(targetPlayer[2]["statvalue"] ** (-0.005*targetPlayer[2]["statvalue"])));
                let dmgDealtShield = ((attackingEnemy[1]["enemystat"]*0.7)*(ShieldStats[2]["statvalue"] ** (-0.005*ShieldStats[2]["statvalue"])));

                targetPlayer[0]["statvalue"]-=dmgDealtTarget;
                ShieldStats[0]["statvalue"]-=dmgDealtShield;

                console.log("Enemy dealt", dmgDealtTarget, "DMG");
                console.log("Enemy dealt", dmgDealtShield, "DMG");

                console.log("players health is", targetPlayer[0]["statvalue"]);
            }
        } catch {
            console.error("Something wrong with the math")
        }

        document.getElementById(animatedEnemy.id).classList.add("animation");

        updateHealthBarPlayer();

        setTimeout(() => {
            document.getElementById(animatedEnemy.id).classList.remove("animation");
        
            agroStatus--;

            counterStateLength--;
            if (counterStateLength <= 0) {
                counterState = false;
                document.querySelector("#skillknight3 h1").textContent = document.querySelector("#skillknight3 h1").textContent.replace("(ACTIVE)", "");

                console.log("Counter state ended");
            } else if (counterState == true) {
                let counterText = document.createElement("h1");
                counterText.classList.add("actionText");
                counterText.textContent = "Counter!";

                let counterStateParent = document.querySelector(".battlearea");
                counterStateParent.appendChild(counterText);

                counterText.style.top = counterStateParent.clientHeight/2 - counterText.clientHeight/2 +"px";
                
                counterText.style.left = counterStateParent.clientWidth/2 - counterText.clientWidth +"px"
                counterText.style.left = counterStateParent.clientWidth/2 - counterText.clientWidth/2 +"px";

                setTimeout(() => {
                    counterText.remove();
                
                    dmg = KnightStats[1]["statvalue"];

                    storedDmg += KnightStats[1]["statvalue"]*0.3;

                    let randomEnemy = [];
                    document.querySelectorAll(".enemyarea div").forEach((div) => {
                        randomEnemy.push(div.id);
                    });

                    let randomNumber = Math.floor(Math.random() * randomEnemy.length);

                    if (randomEnemy[randomNumber] == "enemy1") {
                        enemies = "enemy1";
                    } else if (randomEnemy[randomNumber] == "enemy2") {
                        enemies = "enemy2";
                    } else if (randomEnemy[randomNumber] == "enemy3") {
                        enemies = "enemy3";
                    }

                    let targetData = JSON.parse(localStorage.getItem(enemies));
                    targetData[0].enemystat -= dmg;
                    localStorage.setItem(enemies, JSON.stringify(targetData));

                    KnightCooldown--;

                    console.log("\n\n");

                    console.log("Countered", randomEnemy[randomNumber], "for", dmg);

                    document.getElementById("player1").classList.add("animation");
                    setTimeout(() => {
                        document.getElementById("player1").classList.remove("animation");
                    }, 1000);

                    UpdateHealthBarEnemy();
                }, 600);
            }

            knightBuffLength--;
            if (knightBuffLength <= 0) {
                KnightStats[1]["statvalue"] = KnightStats[1]["statvalue"]/12*10;
                KnightStats[2]["statvalue"] = KnightStats[2]["statvalue"]/12*10;

                knightBuff = false;

                document.querySelector("#skillknight2 h1").textContent = document.querySelector("#skillknight2 h1").textContent.replace("(ACTIVE)", "");
                console.log("Knight buff ended");
            }

            if (counterState == true) {
                setTimeout(() => {
                    turns = 1;
                }, 1000);
            } else {
                turns = 1;
            }

        }, 1000);

        console.log("\n\n");

    }, 1000);
}