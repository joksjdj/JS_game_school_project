for (let i = 1; i < 6; i++) {
    try {
        document.getElementById("lvl"+i).addEventListener("click", () => {

            if (i==1) {
                
                localStorage.setItem("maplvl", i);
                window.location.href = "/gameplay/gameplay.html";

            } else {
                if (localStorage.getItem("maplvl"+(i-1)) == "won") {
                    localStorage.setItem("maplvl", i);
                    window.location.href = "/gameplay/gameplay.html";
                } else {
                    alert("You need to complete the previous level first!");
                }
            }

        });

        if (localStorage.getItem("maplvl"+i) == "won") {
            document.getElementById("lvl"+i).classList.add("active");
        }
    } catch {
        console.error("Error: Element with ID lvl" + i + " not found.");
    }
}