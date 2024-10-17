import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { IFillInTheBlankQuestion } from "@/interfaces/quiz";

interface FillInTheBlankQuestionProps {
  question: IFillInTheBlankQuestion;
  onAnswer: (id: string, answer: string[]) => void;
}

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [answers, setAnswers] = useState<string[]>(
    Array(question.blanks).fill("")
  );

  const handleChange = (text: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onAnswer(question.id, answers);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: question.blanks }).map((_, index) => (
        <TextInput
          key={index}
          style={styles.textInput}
          placeholder={`Blank ${index + 1}`}
          value={answers[index]}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
      <Pressable
        onPress={handleSubmit}
        disabled={answers.some((a) => a.trim() === "")}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FillInTheBlankQuestion;
