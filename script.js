// Grab HTML elements
var questionEl = $("#questionDiv");
var answerEl = $("#answerDiv");
var timerEl = $("#timeLeft");

// Questions
var qArray = [1, 2, 3, 4];
var q1 = "Question 1";
var q1a1 = "Question 1 Answer 1";
var q1a2 = "Question 1 Answer 2";
var q1a3 = "Question 1 Answer 3";
var q1a4 = "Question 1 Answer 4";

// Quiz welcome page with "Start Quiz" button
answerEl.append(`<button id="startButton">Start Quiz</button>`);

var timeLeft = 60;
var qNumber = 0;

var loadQuiz = function() {
    // Timer
    var timeInterval = setInterval(function() {
        // Decrease time and display it
        timeLeft--;
        $(timerEl).html(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            // End game()
            console.log("engGame");
        }

    }, 1000);

    // Load first question
    loadQuestion();
};

// Load next question
var loadQuestion = function() {
    console.log("loadQuestion")
    // If there is a next question, load question
    if(qArray[qNumber]){
        console.log("next question")
        $(questionEl).html(qArray[qNumber]);
        var allAnswers = $("<div>");
        var possAnswers = ["answer1", "answer2", "answer3", "answer4"];
        possAnswers.forEach(function(answer) {
            $(allAnswers).append("<button class='aButton'>" + answer + "</button>");
            console.log(allAnswers);
        })
        $(answerEl).html(allAnswers);
    } else {
        // endGame()
        console.log("endGame");
    }
    qNumber++;

    // On clicking an answer button, check answer
    // Handle points / timer updates

    // On clicking an answer button, load next question
    $(".aButton").on("click", loadQuestion);
}

// On clicking "Start Quiz", timer starts
$("#startButton").on("click", loadQuiz);



// Create variable for score

// Create questions and answers
// q1 = "laskdjfsdlkfj?"
// q1a1 = {answer: "slkdfjslkfdj", correct: true}
// q1a2 = {answer: "sdfsdfassdfs", correct: false}
// q1a3 = {answer: "sdfdgdfgsdfs", correct: false}
// q1a4 = {answer: "dfgsdasfsdfs", correct: false}
// q2 = "laskdjfsdlkfj?"
// q2a1 = {answer: "slkdfjslkfdj", correct: true}
// q2a2 = {answer: "sdfsdfassdfs", correct: false}
// q2a3 = {answer: "sdfdgdfgsdfs", correct: false}
// q2a4 = {answer: "dfgsdasfsdfs", correct: false}

// for each question:
//// Display the question
//// Display the possible answers
//// On click event on an answer, compare user's answer with correct answer
////// If correct, add to score
////// If wrong, subtract time from timer

// When timer hits 0, game is over (while loop??)

// When all questions are completed, game is over
// Display form to submit initials

// Order scores from highest to lowest
// Display highscores on page