// Grab HTML elements
var questionEl = $("#questionDiv");
var answerEl = $("#answerDiv");
var timerEl = $("#timeLeft");

var timeLeft = 60;
var score = 0;
var qNumber = 1;  // Starting with Question 1
var endGame;

// Creating questions and answers
var allQuestions = {
    1: {
        question: "question 1",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 1,
        },
    2: {
        question: "question 2",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 2,
        },
    3: {
        question: "question 3",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 3,
        },
    4: {
        question: "question 4",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correct: 4,
        },    
}

// Quiz welcome page with "Start Quiz" button
answerEl.append(`<button id="startButton">Start Quiz</button>`);

// Handle loading quiz
var loadQuiz = function() {
    // Handle ending game
    endGame = function() {
        // Clear timer
        clearInterval(timeInterval);
        
        // Create form for submitting score
        $(questionEl).html("All done!");
        $(answerEl).html("Your final score is " + score);
        var nameForm = $(`<form><input class="form-control" type="text" placeholder="Enter your name into the leaderboard"></form`);
        $(answerEl).append(nameForm);

        // On submit score, store name on local storage, order highscores from highest to lowest, display highscores
        $(nameForm).submit(function(e) {
            e.preventDefault();
            console.log("submitteddd");
        });

        // Add button to clear highscores
        var clearHighscores = $(`<button type="button" class="btn btn-secondary">`+`Clear Highscores`+`</button>`);
    }
    
    // Timer
    var timeInterval = setInterval(function() {
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
        $(questionEl).html(allQuestions[qNumber].question);
        // Display answers from allQuestions object
        var answerOptions = $("<div>");
        var possAnswers = allQuestions[qNumber].answers;
        possAnswers.forEach(function(answer) {
            $(answerOptions).append(`<button type="button" class="aButton btn btn-outline-secondary">` + answer + `</button>`);
            console.log(answerOptions);
        })
        $(answerEl).html(answerOptions);
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

// On clicking "Start Quiz", timer starts
$("#startButton").on("click", loadQuiz);