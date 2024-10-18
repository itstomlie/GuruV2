import React from "react";
import { View, Text, Image } from "react-native";
const HalfwayScreen = () => {
  return (
    <View>
      <Text>You're halfway there!</Text>
      <Image
        width={100}
        height={100}
        source={require("@/assets/images/clap.png")}
      />
    </View>
  );
};

export default HalfwayScreen;
