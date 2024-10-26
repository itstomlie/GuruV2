import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Timeline from "react-native-timeline-flatlist";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [video, setVideo] = useState({
    uri: "",
    base64: "",
    filePath: "",
    contentType: "",
  });
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback((index: number) => {
    console.log("BottomSheet index changed to:", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      const video = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(video.uri, {
        encoding: "base64",
      });
      const filePath = `public/${new Date().getTime()}-${video.fileName}.mp4`;
      const contentType = video.type || "video/mp4";

      setVideo({
        uri: video.uri,
        base64: base64,
        filePath: filePath,
        contentType: contentType,
      });
    }
  };

  const uploadVideo = async () => {
    setLoading(true);

    try {
      await supabase.storage
        .from("videos")
        .upload(video.filePath, decode(video.base64), {
          contentType: video.contentType,
        });

      alert("Video uploaded successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = async () => {
    try {
      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("videos").getPublicUrl(video.filePath);

      // Save metadata to database
      const { data: videoData, error: dbError } = await supabase
        .from("videos")
        .insert([
          {
            title,
            description,
            hashtags: hashtags.split(" ").filter((tag) => tag.length > 0),
            video_url: publicUrl,
            quizzes,
          },
        ])
        .select();

      if (dbError) throw dbError;
    } catch (error) {
      console.error("Error getPublicUrl:", error);
    }
  };

  //   // Add new quiz
  //   const addQuiz = (quizData) => {
  //     setQuizzes([
  //       ...quizzes,
  //       {
  //         id: Date.now(),
  //         time: quizData.time,
  //         question: quizData.question,
  //         options: quizData.options,
  //         correctAnswer: quizData.correctAnswer,
  //       },
  //     ]);
  //     bottomSheetModalRef.current?.dismiss();
  //   };

  const renderQuizForm = () => (
    <View style={styles.quizForm}>
      <Text style={styles.formTitle}>Add Quiz Question</Text>
      {/* Add your quiz form fields here */}
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.uploadArea} onPress={pickVideo}>
          {video ? (
            <MaterialIcons name="check-circle" size={40} color="green" />
          ) : (
            <MaterialIcons name="add-photo-alternate" size={40} color="gray" />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="# Hashtags"
          value={hashtags}
          onChangeText={setHashtags}
        />

        <View style={styles.quizSection}>
          <View style={styles.quizHeader}>
            <Text style={styles.quizTitle}>Quiz</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleSnapPress(1)}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Timeline
            data={quizzes.map((quiz) => ({
              time: quiz.time,
              title: quiz.question,
              description: quiz.options.join(", "),
            }))}
            innerCircle={"dot"}
          />
        </View>

        {/* <TouchableOpacity
          style={[styles.postButton, loading && styles.postButtonDisabled]}
          onPress={uploadVideo}
          disabled={loading}
        >
          <Text style={styles.postButtonText}>
            {loading ? "Uploading..." : "Post"}
          </Text>
        </TouchableOpacity> */}

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
            <View style={styles.quizForm}>
              <Text style={styles.formTitle}>Add Quiz Question</Text>
              {/* Add your quiz form fields here */}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  uploadArea: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadLabel: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  selectedFile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  fileName: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  uploadPrompt: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  quizSection: {
    flex: 1,
    marginTop: 16,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  quizForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default Post;
