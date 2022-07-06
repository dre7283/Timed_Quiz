// Get scores from local storage
function printHighscores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
    // Sort highscores in descending order
    highscores.sort(function(a,b) {
      return b.score - a.score;
    });
    
    highscores.forEach(function(score) {
    
    
    var list = document.createElement("li");
    list.textContent =score.initials + " - " + score.score;

    var olistEl = document.getElementById("highscores");
    olistEl.appendChild(list);
}); 
}

function clearScores() {
    localStorage.removeItem("highscores");
    location.reload();
}

document.getElementById("clear").onclick=clearScores;

printHighscores();