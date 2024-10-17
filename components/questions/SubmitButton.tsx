import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

const SubmitButton = ({
  style,
  onPress,
  disabled,
  text,
}: {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled: boolean;
  text: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.submitButton, style]}
    >
      <Text style={styles.submitButtonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default SubmitButton;
