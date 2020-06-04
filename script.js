// ADDDD DOCUMENT.READYYYYYYYYYYYYYYYY /////////////////////////////////////////////////////
///////////////////////////////////////
////////////////////////////////////////////////

// Grab HTML elements
var mainTitleEl = $("#mainTitleEl");
var mainBodyEl = $("#mainBodyEl");
var timerEl = $("#timeLeft");

var timeLeft = 60;
var score = 0;
var qNumber = 1;  // Starting with Question 1
var timeInterval;

// Getting existing highscores from local storage
var highscoresObj = {};
if( localStorage.getItem("highscoresString") ){
    highscoresObj = JSON.parse(localStorage.getItem("highscoresString"));
}

// Getting previous playerId from local storage
var playerId = 1;
if( localStorage.getItem("playerId")) {
    playerId = parseInt(localStorage.getItem("playerId")) + 1;
}
// Setting current playerId
localStorage.setItem("playerId", playerId);


// Creating questions and answers
var allQuestions = {
    1: {question: "question 1",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 1,
        },
    2: {question: "question 2",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 2,
        },
    3: {question: "question 3",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 3,
        },
    4: {question: "question 4",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 4,
        },    
}

// Quiz welcome page with "Start Quiz" button
mainBodyEl.append(`<button id="startButton">Start Quiz</button>`);


// Handle loading quiz
var loadQuiz = function() {
    console.log(playerId);
    // Timer
    timeInterval = setInterval(function() {
            // Decrease time and display it
            timeLeft--;
            $(timerEl).html(timeLeft);
    
            // If timer hits 0, end game
            if (timeLeft === 0) {
                clearInterval(timeInterval);
                endGame();
            }
        }, 1000);

    // Load first question
    loadQuestion();
};

// Load next question
var loadQuestion = function() {
    console.log("loadQuestion")
    // If there is a next question, load question
    if(allQuestions[qNumber]){
        console.log("next question")
        console.log(allQuestions[qNumber])
        // Display question from allQuestions object
        $(mainTitleEl).html(allQuestions[qNumber].question);
        // Display answers from allQuestions object
        var answerOptions = $("<div>");
        var possAnswers = allQuestions[qNumber].answers;
        possAnswers.forEach(function(answer) {
            $(answerOptions).append(`<button type="button" class="aButton btn btn-outline-secondary">` + answer + `</button>`);
            console.log(answerOptions);
        })
        $(mainBodyEl).html(answerOptions);
    } else {
        // End game
        endGame();
    }

    // On clicking an answer button, load next question
    $(".aButton").on("click", handleAnswerClick);
}

// Handle when player clicks an answer
var handleAnswerClick = function(e) {
    // Check answer
    console.log("checking answer");
    var playerAnswer = allQuestions[qNumber].answers.indexOf(e.target.innerHTML) + 1;
    if(playerAnswer === allQuestions[qNumber].correct){
        // Add points
        score = score + 10;
        console.log("correct! add points");
    } else {
        // Subtract time from timer
        timeLeft = timeLeft - 10;
        console.log("wrong! taking time away from you")
    }
    // Load next question
    qNumber++;  // Increase question number
    loadQuestion();
}

// Handle ending game
var endGame = function() {
    // Display time left
    $(timerEl).html(timeLeft);

    // Clear timer
    clearInterval(timeInterval);
    
    // Create form for submitting score
    $(mainTitleEl).html("All done!");
    $(mainBodyEl).html("Your final score is " + score);
    var nameForm = $(`<form><input class="form-control" id="nameForm" type="text" placeholder="Enter your name into the leaderboard"></form`);
    $(mainBodyEl).append(nameForm);

    // On submit score, store name on local storage, order highscores from highest to lowest, display highscores
    $(nameForm).submit(function(e) {
        e.preventDefault();
        console.log("submitteddd");

        // Store name to local storage
        var newName = $("#nameForm")[0].value;
        
        if (newName === "") {
            $("form").append(`<div id="nameEnterError">Name cannot be blank</div>`);
        } else {
            highscoresObj[playerId] = {id: playerId, name: newName, score: score};
            localStorage.setItem("highscoresString", JSON.stringify(highscoresObj));
            console.log(playerId)
            $("form").append(`<div id="nameEnterError">Ye boi your name has been entered!</div>`);

            // Sort highscores from highest to lowest
            console.log(JSON.parse(localStorage.getItem("highscoresString")));
            var highscoresSorted = Object.values(highscoresObj).sort((a, b) => (a.score > b.score) ? -1 : 1);

            // Load highscores page
            highscoresSorted.forEach( function(player) {
                $(mainBodyEl).append("<p>"+player.name+player.score+"</p>");
            })
        }

    });
};

// On clicking "Start Quiz", timer starts
$("#startButton").on("click", loadQuiz);

var loadHighscores = function() {
    // Display "Highscores" title
    $(mainTitleEl).html("Highscores");
    // Order highscores from highest to lowest

    // Display highscores

    // Add button to clear highscores
    var clearHighscores = function() {
        highscoresObj = {};
        // playerId = 1;
    }
    var clearHighscoresButton = $(`<button type="button" class="btn btn-secondary">`+`Clear Highscores`+`</button>`);
    $(clearHighscoresButton).on("click", clearHighscores)
}