import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SubmitButton from "@/components/questions/SubmitButton";

interface HalfwayScreenProps {
  onContinue: () => void;
}

const HalfwayScreen: React.FC<HalfwayScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You're halfway there!</Text>
      <Image
        style={styles.image}
        source={require("@/assets/images/clap.png")}
        resizeMode="contain"
      />
      <SubmitButton
        style={styles.button}
        onPress={onContinue}
        disabled={false}
        text={"Continue"}
      />
    </View>
  );
};

export default HalfwayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "80%",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#72BF78",
  },
  image: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
  },
});
