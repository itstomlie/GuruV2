import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LoginSignupForm from "./LoginSignupForm";

export default function Auth() {
  const sheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback((index: number) => {
    console.log("BottomSheet index changed to:", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.promptText}>Masuk ke akun yang sudah ada</Text>
        <Button title="Login" onPress={() => handleSnapPress(1)} />
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={["95%"]}
        maxDynamicContentSize={0.95}
        enablePanDownToClose
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetContent}
        >
          <LoginSignupForm />
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promptText: {
    fontSize: 16,
    marginBottom: 20,
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 20,
  },
});
