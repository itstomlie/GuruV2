import React, { useState, useRef, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { BaseApi } from "@/lib/axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

interface User {
  username: string;
  email: string;
}

export default function LoginSignupForm() {
  const [useEmail, setUseEmail] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [isChecked, setChecked] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const createUserMutation = useMutation<void, Error, User>({
    mutationFn: (user: User) => BaseApi.post("/users", user),
  });

  const signInWithEmail = useCallback(async () => {
    setLoading(true);

    try {
      supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error: any) {
      let backendMessage = "An unexpected error occurred.";

      if (axios.isAxiosError(error)) {
        backendMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        backendMessage = error.message;
      }

      Alert.alert(backendMessage);
    }

    setLoading(false);
  }, [email, password]);

  const signUpWithEmail = useCallback(async () => {
    setLoading(true);

    createUserMutation
      .mutateAsync({
        username: username.trim(),
        email: email.trim(),
      })
      .then(() => {
        supabase.auth.signUp({
          email,
          password,
        });
      })
      .catch((error: any) => {
        let backendMessage = "An unexpected error occurred.";

        if (axios.isAxiosError(error)) {
          backendMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          backendMessage = error.message;
        }

        Alert.alert(backendMessage);
      });

    setLoading(false);
  }, [email, password, username, createUserMutation]);

  const handleAuthAction = useCallback(() => {
    if (isLogin) {
      signInWithEmail();
    } else {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match!");
        return;
      }
      signUpWithEmail();
    }
  }, [isLogin, signInWithEmail, signUpWithEmail, password, confirmPassword]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>
          {isLogin ? "Login" : "Sign Up"} to{" "}
          <Text style={styles.highlight}>Guru</Text>
        </Text>
        <Text style={styles.subHeader}>
          {isLogin
            ? "Access your account, explore characters, track your progress, and much more."
            : "Join us to manage your account, explore characters, and track your learning journey."}
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={isLogin ? styles.activeTab : styles.inactiveTab}
            onPress={() => setIsLogin(true)}
          >
            <Text
              style={isLogin ? styles.activeTabText : styles.inactiveTabText}
            >
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!isLogin ? styles.activeTab : styles.inactiveTab}
            onPress={() => setIsLogin(false)}
          >
            <Text
              style={!isLogin ? styles.activeTabText : styles.inactiveTabText}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="#c4c4c4"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}

        {useEmail ? (
          <>
            <TextInput
              ref={emailInputRef}
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="email@address.com"
              placeholderTextColor="#c4c4c4"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
            />

            <TextInput
              ref={passwordInputRef}
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#c4c4c4"
              autoCapitalize="none"
              returnKeyType={isLogin ? "done" : "next"}
              onSubmitEditing={() => {
                if (!isLogin) {
                  confirmPasswordInputRef.current?.focus();
                } else {
                  handleAuthAction();
                }
              }}
              blurOnSubmit={false}
            />
          </>
        ) : (
          <></>
          // <TextInput
          //   style={styles.input}
          //   placeholder="Phone Number"
          //   placeholderTextColor="#c4c4c4"
          //   keyboardType="phone-pad"
          //   returnKeyType="done"
          //   onSubmitEditing={handleAuthAction}
          //   blurOnSubmit={false}
          // />
        )}

        {!isLogin && useEmail && (
          <TextInput
            ref={confirmPasswordInputRef}
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#c4c4c4"
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleAuthAction}
          />
        )}

        {isLogin && useEmail && (
          <View style={styles.optionsContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text style={styles.optionText}>Save login info</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.optionText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* 
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View> */}

        {/* <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setUseEmail(!useEmail)}
          >
            <Ionicons
              name={useEmail ? "call-outline" : "mail-outline"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View> */}

        <Text style={styles.footerText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleAuthAction}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {isLogin ? "Log in" : "Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  highlight: {
    color: "#57c278",
  },
  subHeader: {
    textAlign: "center",
    color: "#888888",
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  inactiveTab: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  activeTabText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveTabText: {
    color: "#888888",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    color: "#000",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: "#888888",
    marginLeft: 5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888888",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  iconButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  footerText: {
    textAlign: "center",
    color: "#888888",
    marginVertical: 30,
  },
  link: {
    color: "#57c278",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#57c278",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
