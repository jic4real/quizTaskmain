const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn"); 
const correctAnswers = document.querySelector(".correct-answers")
const seeResultBtn = document.querySelector (".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
let questionIndex = 0; 
let score = 0;  
let number = 0;
let myArray = [];
let interval;
let attempt=0;
myApp = [
    {
        question:"How is COVID-19 passed on?",
        options:[
            "Through droplets that come from your mouth and nose when you cough or breathe out",
            "In sexual fluids, including semen, vaginal fluids and anal mucous",
            "By drinking unclean water",
            "All of the above"
        ],
        answer:0,
        description:"When a person with COVID-19 coughs, breathes out or sneezes, droplets come out from their nose and mouth which can contain the virus. These can be breathed in by people who are nearby or it can land on surfaces which other people can then touch. Regular washing of hands and keeping your distance from others is the best way to prevent COVID-19."
    },
    {
        question:"What are the common symptoms of COVID-19?",
        options:[
            "A new and continuous cough",
            "Fever",
            "Tiredness",
            "All of the above"
        ],
        answer:3,
        description:"COVID-19 is usually marked by a new and continuous cough, but some people get other symptoms too including tiredness, a fever and flu-like symptoms including headaches, runny nose and a sore throat. If you're finding it hard to breathe or your symptoms don't improve after 7 days, call your local health service sharp sharp."
    },
    {
        question:"Can you always tell if someone has COVID-19?",
        options:[
            "No -  not everyone with COVID-19 has symptoms",
            "Yes - it will be obvious, a person with COVID-19 coughs a lot",
            "Yes - you can tell just by where a person comes from, their race and ethnicity",
            "Yes - especially if the person is just coming from states like Lagos, Kano and Abuja"
        ],
        answer: 0,
        description:"The virus can be in someone's body for up to 14 days before they get symptoms, and some people will have such a mild case of COVID-19 that they might not notice anything is wrong. That's why its important that everyone follows their government's advice even if the feel healthy"
    },
    {
        question:"Can washing of your hands protect you from COVID-19?",
        options:[
            "Yes - but only if you use a strong bleach",
            "Yes - normal soap and water or hand sanitizer is enough",
            "No - Washing your hands doesn't stop COVID-19",
            "All of the above",
        ],
        answer:1,
        description:"Washing your hands regurlarly is one of the best way to avoid getting or passing on COVID-19. Make sure you wash them for at least 40 seconds if you are using soap and water, and for at least 20 seconds if you're using hand sanitizer"
    },
    {
        question:"Which class of people can be infected by the virus",
        options:[
            "Only first class citizens of a country (Big Men)",
            "Only second class citizens of a country (Semi Big Men)",
            "Only third class citizens of a country (Poor Men)",
            "Every class of citizen can be infected"
        ],
        answer:3,
        description:"The virus is not a respecter of your level in the society. It can affect anybody. So please stay safe and follow all recommended procedures by our health experts on combating the virus"
    }
]
function load(){
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + "/" + myApp.length;
}
function createOptions(){
    optionBox.innerHTML="";
    let animationDalay = 0.2;
    for (let i=0; i<myApp[questionIndex].options.length; i++){
        const option = document.createElement("div");
        option.innerHTML=myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id=i;
        option.style.animationDelay=animationDalay + "s";
        animationDalay=animationDalay+0.2;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}
function generateRandomQuestion(){
    const randomNumber=Math.floor(Math.random() * myApp.length);
    let hitDuplicate = 0;
    if(myApp.length==0){
        questionIndex=randomNumber; 
    }
    else{
        for(let i=0; i<myArray.length; i++){
            if(randomNumber == myArray[i]){
                hitDuplicate=1;
            }
        }
        if (hitDuplicate==1){
            generateRandomQuestion();
            return;
        }
        else{
            questionIndex=randomNumber;
        }
    }
    myArray.push(randomNumber); 
    load();
}
function check(ele){
    const id=ele.id;
    if(id==myApp[questionIndex].answer){
        ele.classList.add("correct");
        score++
        scoreBoard()
    } else{
        ele.classList.add("wrong");
        for(let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id==myApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct"); 
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();
    if(number == myApp.length){
        quizOver();
    }
}
function timeIsUp(){
    showTimeUpText();
    for(let i=0; i<optionBox.children.length; i++){
        if(optionBox.children[i].id==myApp[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct"); 
        }
    }
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();
};
function startTimer(){
    let timeLimit = 15;
    remainingTime.innerHTML=timeLimit;
    remainingTime.classList.add("less-time");
    interval = setInterval(()=>{
        timeLimit--;
        if(timeLimit< 10){
            timeLimit="0" + timeLimit;
        }
        if(timeLimit<6){
            remainingTime.classList.add("less-time");
        }
        remainingTime.innerHTML=timeLimit;
        if(timeLimit==0){
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000);
}
function stopTimer(){
    clearInterval(interval); 
}


function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++){
        optionBox.children[i].classList.add("already-answered"); 
    }
}
function showAnswerDescription(){
    if (typeof myApp[questionIndex].description!==undefined){
        answerDescription.classList.add("show");
        answerDescription.innerHTML= myApp[questionIndex].description;
    }
}
function hideAnswerDescription(){
    answerDescription.classList.remove("show");
    answerDescription.innerHTML= "";
}
function showNextQuestionBtn(){
    nextQuestionBtn.classList.add("show");
}
function hideNextQuestionBtn(){
    nextQuestionBtn.classList.remove("show");
}
function showTimeUpText(){
    timeUpText.classList.add("show");
}
function hideTimeUpText(){
    timeUpText.classList.remove("show");
}
function scoreBoard(){
    correctAnswers.innerHTML=score;
}
nextQuestionBtn.addEventListener("click", nextQuestion);
function nextQuestion(){
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer(); 
}
function quizResult(){
    document.querySelector(".total-questions").innerHTML=myApp.length;
    document.querySelector(".total-attempt").innerHTML=attempt;
    document.querySelector(".total-correct").innerHTML=score;
    document.querySelector(".total-wrong").innerHTML=attempt-score;
    const percentage=(score/myApp.length)*100;
    document.querySelector(".percentage").innerHTML=percentage.toFixed(2)+"%";
}
function resetQuiz(){
     score = 0;  
     number = 0;
     myArray = [];
     attempt=0;
}
function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}
function motivationText(){
    const movText = document.querySelector(".mov-text");
    if(score<=2){
        movText.textContent="Oin...You're not doing well..Try again..";
    }
    else if(score>=3&&score<=4){
        movText.textContent="Oin...You're doing well.Keep trying...";
    }
    else{
        movText.textContent="Faantabulus...";
    }
}
seeResultBtn.addEventListener("click",()=>{
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
    motivationText();
});
startAgainQuizBtn.addEventListener("click", ()=>{
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
});
goHomeBtn.addEventListener("click",()=>{
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
});
startQuizBtn.addEventListener("click", ()=>{
    quizHomeBox.classList.remove("show");
    quizBox.classList.add("show");
    nextQuestion();
});

