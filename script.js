const questions = [
    {
        question:"What does HTML stand for?",
        answers:[
            { text:"A. Hyper Text Markup Language", correct: true},
            { text:"B. High Text Machine Language", correct: false},
            { text:"C. Hyper Tabular Markup Language", correct: false},
            { text:"D. None of these", correct: false},
        ]
    },
    {
        question:"Which tag is used to link CSS file?",
        answers:[
            { text:"A. script", correct: false},
            { text:"B. style", correct: false},
            { text:"C. link", correct: true},
            { text:"D. css", correct: false},
        ]
    },
    {
        question:"Which CSS property is used for spacing inside element?",
        answers:[
            { text:"A. padding", correct: true},
            { text:"B. margin", correct: false},
            { text:"C. spacing", correct: false},
            { text:"D. border", correct: false},
        ]
    },
    {
        question:"What is the correct file extension for JavaScript?",
        answers:[
            { text:"A. .javascript", correct: false},
            { text:"B. .script", correct: false},
            { text:"C. .js", correct: true},
            { text:"D. .java", correct: false},
        ]
    },
    {
        question:"Which operator is used for strict comparison in JS?",
        answers:[
            { text:"A. ==", correct: false},
            { text:"B. ===", correct: true},
            { text:"C. !=", correct: false},
            { text:"D. =", correct: false},
        ]
    },
    {
        question:" What is React?",
        answers:[
            { text:"A. Database", correct: false},
            { text:"B. Library of UI", correct: true},
            { text:"C. Server", correct: false},
            { text:"D. Language", correct: false},
        ]
    },
    {
        question:"What is JSX?",
        answers:[
            { text:"A. JavaScript XML", correct: true},
            { text:"B. JSON Syntax Extention", correct: false},
            { text:"C. JSON Syntax", correct: false},
            { text:"D. JavaScript Extention", correct: false},
        ]
    },
    {
        question:"Which hook is used for state in React?",
        answers:[
            { text:"A. useEffect", correct: false},
            { text:"B. useMemo", correct: false},
            { text:"C. useState", correct: true},
            { text:"D. useRef", correct: false},
        ]
    },
    {
        question:"Which tool is used to manage packages in React?",
        answers:[
            { text:"A. npm ", correct: true},
            { text:"B. git", correct: false},
            { text:"C. docker", correct: false},
            { text:"D. webpack", correct: false},
        ]
    },
    {
        question:"Which company developed React?",
        answers:[
            { text:"A. Google", correct: false},
            { text:"B. Microsoft", correct: false},
            { text:"C. Facebook(meta) ", correct: true},
            { text:"D. Apple", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
};

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    };
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");   
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
});