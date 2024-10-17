export interface IQuiz {
  id: string;
  videoId: string;
  title: string;
  description: string;
  questions: IQuestion[];
}

export type QuestionType =
  | "multiple-choice"
  | "essay"
  | "fill-in-the-blank"
  | "match-pairs"
  | "type-in-answer"
  | "select-answers";

export interface IQuestionBase {
  id: string;
  type: QuestionType;
  question: string;
}

export interface IMultipleChoiceQuestion extends IQuestionBase {
  type: "multiple-choice";
  options: string[];
  correctOption: string;
}

export interface IEssayQuestion extends IQuestionBase {
  type: "essay";
  // You can add additional fields if needed
}

export interface IFillInTheBlankQuestion extends IQuestionBase {
  type: "fill-in-the-blank";
  blanks: number; // Number of blanks in the question
  correctAnswers: string[];
}

export interface IMatchPairsQuestion extends IQuestionBase {
  type: "match-pairs";
  pairs: {
    left: string;
    right: string;
  }[];
}

export interface ITypeInAnswerQuestion extends IQuestionBase {
  type: "type-in-answer";
  correctAnswer: string;
}

export interface ISelectAnswersQuestion extends IQuestionBase {
  type: "select-answers";
  options: string[];
  correctAnswers: string[];
}

export type IQuestion =
  | IMultipleChoiceQuestion
  | IEssayQuestion
  | IFillInTheBlankQuestion
  | IMatchPairsQuestion
  | ITypeInAnswerQuestion
  | ISelectAnswersQuestion;
