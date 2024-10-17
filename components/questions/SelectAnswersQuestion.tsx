import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ISelectAnswersQuestion } from "@/interfaces/quiz";
import SubmitButton from "./SubmitButton";

interface SelectAnswersQuestionProps {
  question: ISelectAnswersQuestion;
  onAnswer: (id: string, answer: string[]) => void;
}

const SelectAnswersQuestion: React.FC<SelectAnswersQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    onAnswer(question.id, selectedOptions);
  };

  return (
    <View style={styles.container}>
      {question.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedOptions.includes(option) && styles.selectedOption,
          ]}
          onPress={() => toggleOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <SubmitButton
        onPress={handleSubmit}
        disabled={selectedOptions.length === 0}
        text={"Submit"}
      />
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
  selectedOption: {
    backgroundColor: "#555",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SelectAnswersQuestion;
