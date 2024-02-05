const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [20];

let questions = [
  {
    question: "What is a male cow called?",
    choice1: "Ewe",
    choice2: "Ox",
    choice3: "Kiwi",
    choice4: "Lamb",
    answer: 2
  },
  {
    question:
      "Which of the following is a fur bearing animal?",
    choice1: "3",
    choice2: "Fish",
    choice3: "Snake",
    choice4: "Cat",
    answer: 4
  },
  {
    question: "Who is the mother of Computer Science?",
    choice1: "Aduke",
    choice2: "Aminat",
    choice3: "Ada Lovelace",
    choice4: "Adaku",
    answer: 3
  },
  {
    question: "The movement of food through the intestines is known as?:",
    choice1: "Excretion",
    choice2: "Digestion",
    choice3: "Injection",
    choice4: "Peristalsis",
    answer: 4
  },
  {
    question: "How many teeth do adults have?",
    choice1: "32",
    choice2: "25",
    choice3: "36",
    choice4: "28",
    answer: 1
  },
  {
    question: "Which of the following protects the brain? ",
    choice1: "Hairs",
    choice2: "Bones",
    choice3: "Skin",
    choice4: "Skull",
    answer: 4
  },
  {
    question: "How many bones are in the human body?",
    choice1: "263",
    choice2: "107",
    choice3: "83",
    choice4: "206",
    answer: 4
  },
  {
    question: "What is the biggest planet in our solar system?",
    choice1: "Earth",
    choice2: "Jupiter",
    choice3: "Neptune",
    choice4: "Mars",
    answer: 2
  },
  {
    question: "How many ethnic groups do we have?",
    choice1: "250",
    choice2: "199",
    choice3: "191",
    choice4: "991",
    answer: 1
  },
  {
    question: " Who is the current chief justice of Nigeria?",
    choice1: "Ibrahim Tanko Muhammad",
    choice2: "Toby Azeez",
    choice3: "Walter Onoghen",
    choice4: "Justice Peace",
    answer: 1
  },
  {
    question: "Who was the first President of Nigeria?",
    choice1: "Tinubu",
    choice2: "Goodluck Jonathan",
    choice3: "Dr. Nnamdi Azikiwe",
    choice4: "Olusegun Obasanjo",
    answer: 3
  },
  {
    question: " What is a 70th anniversary called",
    choice1: "Silver",
    choice2: "Golden",
    choice3: "Platinum",
    choice4: "Bronze",
    answer: 3
  },


    {
      question: "Who created the Nigeria council",
      choice1: "Fredrick Lugard",
      choice2: "Amos Ayuba",
      choice3: "Toyeebat & Tofeekat",
      choice4: "Flora Talin Paul",
      answer: 1
    },
    {
      question:
        " Who gave the name of Nigeria?",
      choice1: "Alkali Baba",
      choice2: "Flora shaw",
      choice3: "Fredrick Lugard",
      choice4: "Patience Jonathan",
      answer: 2
    },
    {
      question: "Which continent is the smallest in the world?",
      choice1: "Australia",
      choice2: "African",
      choice3: "America",
      choice4: "Canada",
      answer: 1
    },
    {
      question: "How many local government areas do we have in Nigeria?",
      choice1: "126",
      choice2: "480",
      choice3: "609",
      choice4: "774",
      answer: 4
    },
    
    {
      question: " When was paper currency introduced in Nigeria?",
      choice1: "2002",
      choice2: "2007",
      choice3: "1999",
      choice4: "1918",
      answer: 4
    },

    {
      question: "How many countries constitute the Economic Community of West African States?",
      choice1: "26",
      choice2: "27",
      choice3: "16",
      choice4: "14",
      answer: 3
    },

    {
      question: "Which state has the highest contribution in percentage in oil revenue in Nigeria?",
      choice1: "Imo",
      choice2: "Delta",
      choice3: "Lagos",
      choice4: "Osun",
      answer: 2
    },

    {
      question: " __ is the ability to do work?",
      choice1: "Will",
      choice2: "Power",
      choice3: "Voltage",
      choice4: "Current",
      answer: 2
    },
];

//CONSTANTS
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();