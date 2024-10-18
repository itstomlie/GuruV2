import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onClose: () => void;
  progress: number;
  currentHp: number;
}

const Header: React.FC<HeaderProps> = ({ onClose, progress, currentHp }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <View style={styles.healthLabelContainer}>
        <Ionicons name="heart" size={14} color="#ff6b6b" />
        <Text style={styles.healthLabel}>{currentHp}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: "gray",
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "#72BF78",
    height: "100%",
  },
  healthLabel: {
    color: "#ff6b6b",
    fontSize: 14,
    marginLeft: 5,
  },
  healthLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
