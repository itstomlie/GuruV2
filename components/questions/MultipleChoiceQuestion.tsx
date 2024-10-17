import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IMultipleChoiceQuestion } from "@/interfaces/quiz";

interface MultipleChoiceQuestionProps {
  question: IMultipleChoiceQuestion;
  onAnswer: (id: string, answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
}) => {
  return (
    <View style={styles.container}>
      {question.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.optionButton}
          onPress={() => onAnswer(question.id, option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MultipleChoiceQuestion;
