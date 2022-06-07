var questionIndex = 0;
var clockId;

//variables
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");
var startBtn = document.getElementById("start-quiz");






function startQuiz() {
//hide the start screen
var introEl = document.getElementById("intro");
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
    //get current question object from question array
var newQuestion = questions[questionIndex];

//update title dynamically with current question
var qTitleEl = document.getElementById("question-title");
qTitleEl.textContent = newQuestion.title;
}

newQuestion.choices.forEach(function(choice, i) {
    var option = document.createElement("button");
    
}
);

function Ticker(){
    time--;
    timerEl.textContent = time;
}

questionIndex++;

//click button to start quiz
startBtn.onclick = startQuiz;