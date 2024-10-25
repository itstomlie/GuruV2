import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import quizzes from "@/constants/quizzes";
import { IQuiz, IQuestion } from "@/interfaces/quiz";
import QuestionRenderer from "@/components/quiz/QuestionRenderer";
import Header from "@/components/quiz/Header";
import HalfwayScreen from "@/components/quiz/HalfwayScreen";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { decrementHp, selectHp } from "@/store/character/hpSlice";

const QuizScreen: React.FC = () => {
  const router = useRouter();
  const { videoId, author, title, avatar } = useLocalSearchParams();

  const handleClose = () => {
    router.back();
  };

  const quiz: IQuiz | undefined = quizzes.find((q) => q.videoId === videoId);
  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.quizText}>Quiz not found.</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHalfwayScreen, setShowHalfwayScreen] = useState(false);
  const [correctAnswersNum, setCorrectAnswersNum] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  const currentHp = useAppSelector(selectHp).currentHp;
  const dispatch = useAppDispatch();
  const quizLength = quiz.questions.length;
  const halfwayIndex = Math.floor(quizLength / 2);
  const currentQuestion: IQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizLength) * 100;

  useEffect(() => {
    if (currentQuestionIndex === halfwayIndex) {
      setShowHalfwayScreen(true);
    }
  }, [currentQuestionIndex, halfwayIndex]);

  const handleContinueFromHalfway = () => {
    setShowHalfwayScreen(false);
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizLength - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.push({ pathname: "/quiz/results", params: { correctAnswersNum } });
    }
  };

  const checkIfAnswerIsCorrect = (answer: any): boolean => {
    if (currentQuestion.type === "multiple-choice") {
      return currentQuestion.correctOption === answer;
    } else if (currentQuestion.type === "fill-in-the-blank") {
      return (
        answer
          .map((a: string | number) =>
            typeof a === "string" ? a.toLowerCase() : a
          )
          .sort()
          .toString() ===
        currentQuestion.correctAnswers
          .map((a: string | number) =>
            typeof a === "string" ? a.toLowerCase() : a
          )
          .sort()
          .toString()
      );
    } else if (currentQuestion.type === "match-pairs") {
      return answer.toLowerCase().trim() === currentQuestion.pairs;
    } else if (currentQuestion.type === "type-in-answer") {
      return (
        answer.toLowerCase().trim() ===
        currentQuestion.correctAnswer.toLowerCase().trim()
      );
    } else {
      return true;
    }
  };

  const handleAnswer = (questionId: string, answer: any) => {
    if (!checkIfAnswerIsCorrect(answer)) {
      dispatch(decrementHp());
    } else {
      setCorrectAnswersNum(
        (prevCorrectAnswersNum) => prevCorrectAnswersNum + 1
      );
    }
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    handleNext();
  };

  return (
    <View style={styles.container}>
      <Header onClose={handleClose} progress={progress} currentHp={currentHp} />
      {showHalfwayScreen ? (
        <HalfwayScreen onContinue={handleContinueFromHalfway} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.quizContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorNameContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri:
                      (avatar as string) ||
                      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                  }}
                />
              </View>
              <Text style={styles.author}>{author}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.quizText}>{currentQuestion.question}</Text>
          <QuestionRenderer
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  quizContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  authorContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  authorNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  author: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
  },
  quizText: {
    color: "#333",
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 10,
  },
});
