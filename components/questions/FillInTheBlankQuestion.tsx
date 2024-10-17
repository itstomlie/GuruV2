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
import SubmitButton from "./SubmitButton";

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
      <SubmitButton
        onPress={handleSubmit}
        disabled={answers.some((a) => a.trim() === "")}
        text={"Submit"}
      />
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
});

export default FillInTheBlankQuestion;
