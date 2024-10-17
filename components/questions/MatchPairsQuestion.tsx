import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IMatchPairsQuestion } from "@/interfaces/quiz";
import SubmitButton from "./SubmitButton";

interface MatchPairsQuestionProps {
  question: IMatchPairsQuestion;
  onAnswer: (id: string, answer: { [key: string]: string }) => void;
}

const MatchPairsQuestion: React.FC<MatchPairsQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});

  const handleMatch = (left: string, right: string) => {
    setMatches((prev) => ({ ...prev, [left]: right }));
  };

  const handleSubmit = () => {
    onAnswer(question.id, matches);
  };

  return (
    <View style={styles.container}>
      {question.pairs.map((pair) => (
        <View key={pair.left} style={styles.pairContainer}>
          <Text style={styles.leftText}>{pair.left}</Text>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => handleMatch(pair.left, pair.right)}
          >
            <Text style={styles.rightText}>
              {matches[pair.left] || "Select"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <SubmitButton
        onPress={handleSubmit}
        disabled={Object.values(matches).some((v) => v === "")}
        text={"Submit"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pairContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  leftText: {
    color: "white",
    fontSize: 16,
  },
  rightButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    width: "50%",
  },
  rightText: {
    color: "white",
    textAlign: "center",
  },
});

export default MatchPairsQuestion;
