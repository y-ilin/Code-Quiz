$(document).ready(function () {

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
        1: {question: "1. Which one of these is NOT a JavaScript data type?",
            answers: ["string", "boolean", "true/false", "undefined"],
            correct: 2,
            },
        2: {question: "2. I want to wait 5 seconds after page load before prompting the user to enter their input. What API do I need to use?",
            answers: ["setInterval()", "fetch()", "clearInterval()", "setTimeout()"],
            correct: 3,
            },
        3: {question: `3. What does 'console.log( ["one", "two", "three"].push("four") )' give us?`,
            answers: ["4", "four", `["one", "two", "three", "four"]`, `["four", "one", "two", "three"]`],
            correct: 0,
            },
        4: {question: "4. Which symbol can be used for comments in JavaScript?",
            answers: ["<-->", "//", "/!--/", "!-->"],
            correct: 1,
            },    
    }

    // Quiz welcome page with "Start Quiz" button
    mainBodyEl.append(`<div id="startButtonDiv"><button id="startButton">Start Quiz</button></div>`);

    // Handle loading quiz
    var loadQuiz = function() {
        // Timer
        timeInterval = setInterval(function() {
                // Decrease time and display it
                timeLeft--;
                $(timerEl).html(timeLeft);
        
                // If timer hits 0, end game
                if (timeLeft <= 0) {
                    clearInterval(timeInterval);
                    timeLeft = 0;
                    endGame();
                }
            }, 1000);

        // Load first question
        loadQuestion();
    };

    // Load next question
    var loadQuestion = function() {
        // If there is a next question, load question
        if(allQuestions[qNumber]){
            // Display question from allQuestions object
            $(mainTitleEl).html(allQuestions[qNumber].question);
            // Display answers from allQuestions object
            var answerOptions = $("<div>");
            var possAnswers = allQuestions[qNumber].answers;
            possAnswers.forEach(function(answer) {
                $(answerOptions).append(`<button type="button" class="aButton btn btn-outline-secondary">` + answer + `</button>`);
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
        var playerAnswer = allQuestions[qNumber].answers.indexOf(e.target.innerHTML);
        if(playerAnswer === allQuestions[qNumber].correct){
            // If correct, add points
            score = score + 10;
            $(mainBodyEl).append("<div class='correctWrong'>Correct");
        } else {
            // If wrong, subtract time from timer
            timeLeft = timeLeft - 10;
            $(mainBodyEl).append("<div class='correctWrong'>Wrong");
        }
        // Load next question
        qNumber++;  // Increase question number
        setTimeout(loadQuestion, 500); // Load next question after 0.5 seconds
    }

    // Handle ending game
    var endGame = function() {
        // Display time left
        $(timerEl).html(timeLeft);

        // Clear timer
        clearInterval(timeInterval);
        
        // Create form for submitting score
        $(mainTitleEl).html("End of quiz");
        $(mainBodyEl).html("<p>Your final score is " + score + "</p>");
        var nameForm = $(`<form><input class="form-control" id="nameForm" type="text" placeholder="Enter your name into the leaderboard"></form`);
        $(mainBodyEl).append(nameForm);

        // On submit score
        $(nameForm).submit(function(e) {
            e.preventDefault();
            handleNameSubmit();
        });
    };

    // Load highscores page
    var loadHighscores = function() {
        // Remove elements not needed on highscore page
        $(mainBodyEl).empty();
        $("#timeDisplay").empty();
        
        // Display "Highscores" title
        $(mainTitleEl).html("Highscores");
        
        // Sort highscores from highest to lowest
        var highscoresSorted = Object.values(highscoresObj).sort((a, b) => (a.score > b.score) ? -1 : 1);

        // Load highscores on page
        highscoresSorted.forEach( function(player) {
            $(mainBodyEl).append("<p class='highscoreEntry'>"+player.name
            +"<span id=highscoreScore>"+player.score+"</span></p>");
        })

        // Add button to clear highscores
        var clearHighscores = function() {
            localStorage.clear();
            $(".highscoreEntry").remove();
        }
        var clearHighscoresButton = $(`<button type="button" class="btn btn-secondary" id="clearHighscoresButton">`+`Clear Highscores`+`</button>`);
        $(mainBodyEl).append(clearHighscoresButton);
        $(clearHighscoresButton).on("click", clearHighscores);

        // Add button to play again
        var refreshPage = () => location.reload();
        var playAgainButton = $("<button type='button' class='btn btn-secondary' id='playAgainButton'>Play Again</button>");
        $(mainBodyEl).append(playAgainButton);
        $(playAgainButton).on("click", refreshPage);
    }

    // Handle submitting player name in form
    var handleNameSubmit = function() {
        // Store name to local storage
        var newName = $("#nameForm")[0].value;
        
        if (newName === "") {
            $("form").append("<div>Name cannot be blank</div>");
        } else {
            highscoresObj[playerId] = {id: playerId, name: newName, score: score};
            localStorage.setItem("highscoresString", JSON.stringify(highscoresObj));

            // Load highscores page
            loadHighscores();
        }
    }

    // On clicking "Start Quiz", timer starts
    $("#startButton").on("click", loadQuiz);

    // On clicking "View Highscores"
    $("#viewHighscores").on("click", loadHighscores)


});