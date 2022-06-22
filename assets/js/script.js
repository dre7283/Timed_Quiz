var questionIndex = 0;
var time = questions.length * 15;
var clockId;

//variables
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");
var startBtn = document.getElementById("start-quiz");
var feedbackEl = document.getElementById("feedback");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");





function startQuiz() {
//hide the start screen
var introEl = document.getElementById("begin");
introEl.setAttribute("class", "hide");

//reveal questions 
questionsEl.removeAttribute("class");

//Start Timer
clockId = setInterval(Ticker, 1000);

//Show start time
timerEl.textContent = time;

displayQuestion();
}

function displayQuestion() {
    //get new question object from question array
var newQuestion = questions[questionIndex];

//update title dynamically with current question
var qTitleEl = document.getElementById("question-title");
qTitleEl.textContent = newQuestion.title;

choicesEl.innerHTML = "";

newQuestion.choices.forEach(function(choice, i) {
    // creates a new button for each choice option
    var option = document.createElement("button");
    option.setAttribute("class", "choice");
    option.setAttribute("value", choice);
    option.textContent = i + 1 + "." + choice;

    // click event for each choice option
    option.onclick = clickQuestion;
    choicesEl.appendChild(option);
});
}
function clickQuestion() {
    // check if answer is right or wrong
    if (this.value !== questions[questionIndex].answer) {
        // wrong answer = -15 seconds
        time -=15;
        if (time < 0){
            time = 0;
        }
// put new time on page
timerEl.textContent = time;

feedbackEl.textContent = "wrong Answer";
    } else {
feedbackEl.textContent = "Correct Answer";
}

// flash Wrong or Correct Answer on page for 1/2 second
feedbackEl.setAttribute("class", "feedback");
setTimeout(function(){
   feedbackEl.setAttribute("class", "feedback hide"); 
}, 1000);

// Next Question
questionIndex++;

// Check if we reached the end of the quiz
if(questionIndex === questions.length){
    endQuiz();
    } else { 
        displayQuestion();
    }
}

function endQuiz() {
    // stop the timer
    clearInterval(clockId);

    // quiz finished show last page
var finishedEl = document.getElementById("finished");
finishedEl.removeAttribute("class");

// show the final score
var finalScoreEl = document.getElementById("final-score");
finalScoreEl.textContent = time;

// hide questions
questionsEl.setAttribute("class", "hide");
}


// updates time
function Ticker(){
    time--;
    timerEl.textContent = time;
}

// check if time expired
if (time <= 0) {
    endQuiz();
}

// Save HighScore
function saveHighScore(){
    var initials = initialsEl.value.trim();

// make sure user enters initials
if(initials !== ""){
    // get saved scores from localStorage, if there are none then set to empty array
    var highscores=
    JSON.parse(localStorage.getItem("highscores")) || [];

// format new score object
var newScore = {
    score: time,
    initials: initials
};

// save to localStorage
highscores.push(newScore);
localStorage.setItem("highscores", JSON.stringify (highscores));

location.href = "hscore.html"
}
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}



// submit highscores
submitBtn.onclick = saveHighScore;

//click button to start quiz
startBtn.onclick = startQuiz;

initials.onkeyup = checkForEnter;