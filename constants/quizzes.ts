import { IQuiz } from "@/interfaces/quiz";

const quizzes: IQuiz[] = [
  {
    id: "quiz0",
    videoId: "0",
    title: "Language Proficiency Test",
    description: "A quiz to assess your language skills.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctOption: "Paris",
      },
      {
        id: "q2",
        type: "essay",
        question: "Describe your favorite book and why you like it.",
      },
      {
        id: "q3",
        type: "fill-in-the-blank",
        question: "The quick ___ fox jumps over the lazy dog.",
        blanks: 1,
        correctAnswers: ["brown"],
      },
      {
        id: "q4",
        type: "match-pairs",
        question: "Match the countries to their capitals.",
        pairs: [
          { left: "Italy", right: "Rome" },
          { left: "Spain", right: "Madrid" },
          { left: "Germany", right: "Berlin" },
        ],
      },
      {
        id: "q5",
        type: "type-in-answer",
        question: "Type the chemical symbol for water.",
        correctAnswer: "H2O",
      },
      {
        id: "q6",
        type: "select-answers",
        question: "Select all prime numbers.",
        options: ["2", "3", "4", "5"],
        correctAnswers: ["2", "3", "5"],
      },
    ],
  },
  {
    id: "quiz1",
    videoId: "1",
    title: "Hydrogen and Oxygen Gas Reaction",
    description:
      "A quiz to assess your understanding of the hydrogen and oxygen gas reaction demonstrated in the video.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question:
          "What gases were used to create the bubbles in the experiment?",
        options: [
          "Hydrogen and Oxygen",
          "Carbon Dioxide and Oxygen",
          "Nitrogen and Oxygen",
          "Helium and Neon",
        ],
        correctOption: "Hydrogen and Oxygen",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What happened when the bubbles were lit on fire?",
        options: [
          "They popped quietly",
          "They exploded loudly",
          "They melted",
          "They changed color",
        ],
        correctOption: "They exploded loudly",
      },
      {
        id: "q3",
        type: "fill-in-the-blank",
        question:
          "In the second experiment, the mixture had 3x as much ___ as before.",
        blanks: 1,
        correctAnswers: ["oxygen"],
      },
      {
        id: "q4",
        type: "essay",
        question:
          "Why do you think the second reaction was louder than the first? Explain your reasoning.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        question:
          "How did the presenter handle the bubbles before lighting them up?",
        options: [
          "With gloves",
          "With a spoon",
          "With his bare hand",
          "Using tweezers",
        ],
        correctOption: "With his bare hand",
      },
      {
        id: "q6",
        type: "type-in-answer",
        question:
          "What is the chemical formula for water, a byproduct of the reaction between hydrogen and oxygen?",
        correctAnswer: "H2O",
      },
    ],
  },
];

export default quizzes;
