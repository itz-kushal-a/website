/* Background music */
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

function startMusic(){
  if(musicStarted) return;
  bgMusic.volume = 0.25;
  bgMusic.play().catch(()=>{});
  musicStarted = true;
}
document.addEventListener("click", startMusic, { once:true });
document.addEventListener("keydown", startMusic, { once:true });
document.addEventListener("touchstart", startMusic, { once:true });

/* Elements */
const modes = document.querySelectorAll(".mode");
const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

let currentMode = "survival";

/* Mode live status */
const modeLive = {
  survival: true,
  lifesteal: false,
  oneblock: false
};

/* Mode switching */
modes.forEach(btn=>{
  btn.addEventListener("click",()=>{
    modes.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    showPage(document.querySelector(".nav-btn.active").dataset.page);
  });
});

/* Tab switching */
navBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    navBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    showPage(btn.dataset.page);
  });
});

/* Page logic */
function showPage(page){
  pages.forEach(p=>p.classList.remove("active"));

  if(!modeLive[currentMode]){
    document.getElementById("coming").classList.add("active");
    return;
  }
  document.getElementById(page).classList.add("active");
}

/* Copy IP */
function copyIP(){
  navigator.clipboard.writeText("play.mcverse.in");
  alert("IP copied!");
}

/* Server stats */
const startPing = performance.now();
fetch("https://api.mcsrvstat.us/2/play.mcverse.in")
.then(r=>r.json())
.then(d=>{
  const ping = Math.round(performance.now() - startPing);

  document.getElementById("playersCount").innerText =
    d.players?.online ?? "0";
  document.getElementById("maxPlayers").innerText =
    d.players?.max ?? "--";
  document.getElementById("version").innerText =
    d.version ?? "--";

  document.getElementById("status").innerText =
    d.online ? "Online" : "Offline";

  document.getElementById("ping").innerText = `${ping} ms`;

  document.getElementById("motd").innerHTML =
    d.motd?.clean?.join("<br>") ?? "No MOTD";

  if(d.players?.list){
    document.getElementById("playerList").innerHTML =
      d.players.list.join("<br>");
  } else {
    document.getElementById("playerList").innerText =
      "No players online";
  }
});
