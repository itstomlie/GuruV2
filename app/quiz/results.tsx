import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import quizzes from "@/constants/quizzes";
import { IQuiz } from "@/interfaces/quiz";

const ResultsScreen = () => {
  const router = useRouter();
  const { answers, quizId } = useLocalSearchParams();
  const [score, setScore] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const parsedAnswers = answers ? JSON.parse(answers as string) : {};
    const quiz: IQuiz | undefined = quizzes.find((q) => q.id === quizId);

    if (quiz) {
      let calculatedScore = 0;
      quiz.questions.forEach((question) => {
        const userAnswer = parsedAnswers[question.id];
        switch (question.type) {
          case "multiple-choice":
            if (userAnswer === (question as any).correctOption) {
              calculatedScore += 1;
            }
            break;
          case "fill-in-the-blank":
            // Simple check: all answers must match
            if (
              Array.isArray(userAnswer) &&
              userAnswer.every((ans) =>
                (question as any).correctAnswers.includes(ans.toLowerCase())
              )
            ) {
              calculatedScore += 1;
            }
            break;
          case "type-in-answer":
            if (
              userAnswer.toLowerCase() ===
              (question as any).correctAnswer.toLowerCase()
            ) {
              calculatedScore += 1;
            }
            break;
          case "select-answers":
            const correct = (question as any).correctAnswers;
            if (
              Array.isArray(userAnswer) &&
              userAnswer.length === correct.length &&
              userAnswer.every((ans: string) => correct.includes(ans))
            ) {
              calculatedScore += 1;
            }
            break;
          // Add checks for other question types as needed
          default:
            break;
        }
        setTotal((prev) => prev + 1);
      });
      setScore(calculatedScore);
    }
  }, []);

  const handleClose = () => {
    router.push("/"); // Navigate to home or another appropriate screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Quiz Results</Text>
      <Text style={styles.scoreText}>
        You scored {score} out of {total}
      </Text>
      <TouchableOpacity style={styles.homeButton} onPress={handleClose}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000CC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreText: {
    color: "gray",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ResultsScreen;
