import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { IVideo } from "@/interfaces/video";
import { Link, useNavigation } from "expo-router";
import { formatNumber } from "@/utils/numberFormatter";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoItemComponent = ({
  item,
  index,
  currentIndex,
}: {
  item: IVideo;
  index: number;
  currentIndex: number;
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
      fadeIn();
    } else {
      await videoRef.current.playAsync();
      fadeOut();
    }
    setIsPlaying(!isPlaying);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Manage playback based on currentIndex
  useEffect(() => {
    if (index === currentIndex && videoRef.current) {
      videoRef.current.playAsync();
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  }, [currentIndex, index]);

  // Determine the correct source format
  const videoSource =
    typeof item.uri === "string" ? { uri: item.uri } : item.uri;

  return (
    <View style={styles.videoContainer}>
      <Video
        key={item.id}
        ref={videoRef}
        source={videoSource}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(status)}
        onTouchEnd={togglePlayback}
      />
      {/* Animated Play/Pause Button */}
      {index === currentIndex && (
        <Animated.View style={[styles.playButton, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={togglePlayback}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={90}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      {/* Overlay Bottom - Information */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.hashtags}>{item.hashtags}</Text>
        <Text style={styles.date}>{item.datePosted}</Text>
      </View>
      {/* Right Side Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          {/* <Avatar size="md">
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge />
          </Avatar> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart" size={30} color="white" />
          <Text style={styles.iconText}>{formatNumber(item.likes)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses" size={30} color="white" />
          <Text style={styles.iconText}>{formatNumber(item.comments)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bookmark" size={30} color="white" />
          <Text style={styles.iconText}>{formatNumber(item.bookmarks)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-redo" size={30} color="white" />
          <Text style={styles.iconText}>{formatNumber(item.shares)}</Text>
        </TouchableOpacity>
        <Link
          href={{
            pathname: "/quiz/[videoId]",
            params: { videoId: item.id },
          }}
          asChild
        >
          <TouchableOpacity
            style={styles.brightBulb}
            onPress={async () => {
              setIsPlaying(false);
              fadeIn();
              await videoRef.current?.pauseAsync();
            }}
          >
            <FontAwesome name="lightbulb-o" size={24} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

// Custom comparison to prevent unnecessary re-renders
const areEqual = (
  prevProps: Readonly<{
    item: IVideo;
    index: number;
    currentIndex: number;
  }>,
  nextProps: Readonly<{
    item: IVideo;
    index: number;
    currentIndex: number;
  }>
) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.currentIndex === nextProps.currentIndex &&
    prevProps.index === nextProps.index
  );
};

export const VideoItem = React.memo(VideoItemComponent, areEqual);

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    height: SCREEN_HEIGHT, // Ensure exact screen height
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: SCREEN_HEIGHT / 2 - 40, // Center vertically
    left: 0,
    right: 0,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 60,
    left: 10,
    right: 80, // To make space for right icons
  },
  author: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  hashtags: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
  },
  rightIcons: {
    position: "absolute",
    right: 10,
    bottom: 100,
    alignItems: "center",
  },
  iconButton: {
    marginBottom: 25,
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  brightBulb: {
    marginBottom: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
});
