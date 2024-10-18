import React from "react";
import { Text, StyleSheet } from "react-native";
import { IQuestion } from "@/interfaces/quiz";
import MultipleChoiceQuestion from "@/components/questions/MultipleChoiceQuestion";
import EssayQuestion from "@/components/questions/EssayQuestion";
import FillInTheBlankQuestion from "@/components/questions/FillInTheBlankQuestion";
import MatchPairsQuestion from "@/components/questions/MatchPairsQuestion";
import TypeInAnswerQuestion from "@/components/questions/TypeInAnswerQuestion";
import SelectAnswersQuestion from "@/components/questions/SelectAnswersQuestion";

interface QuestionRendererProps {
  question: IQuestion;
  onAnswer: (id: string, answer: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onAnswer,
}) => {
  switch (question.type) {
    case "multiple-choice":
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
    case "essay":
      return <EssayQuestion question={question} onAnswer={onAnswer} />;
    case "fill-in-the-blank":
      return <FillInTheBlankQuestion question={question} onAnswer={onAnswer} />;
    case "match-pairs":
      return <MatchPairsQuestion question={question} onAnswer={onAnswer} />;
    case "type-in-answer":
      return <TypeInAnswerQuestion question={question} onAnswer={onAnswer} />;
    case "select-answers":
      return <SelectAnswersQuestion question={question} onAnswer={onAnswer} />;
    default:
      return <Text style={styles.unsupported}>Unsupported question type.</Text>;
  }
};

export default QuestionRenderer;

const styles = StyleSheet.create({
  unsupported: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
