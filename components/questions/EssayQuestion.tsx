import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { IEssayQuestion } from "@/interfaces/quiz";

interface EssayQuestionProps {
  question: IEssayQuestion;
  onAnswer: (id: string, answer: string) => void;
}

const EssayQuestion: React.FC<EssayQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAnswer(question.id, text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type your answer here"
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={text.trim() === ""}
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
    marginBottom: 10,
    color: "#000",
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EssayQuestion;
