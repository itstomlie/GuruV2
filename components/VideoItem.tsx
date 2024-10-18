import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { IVideo } from "@/interfaces/video";
import { Link, useNavigation } from "expo-router";
import { formatNumber } from "@/utils/numberFormatter";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();
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
      <View
        style={[
          styles.bottomOverlay,
          { paddingBottom: insets.top + 10 }, // Adjust padding based on safe area
        ]}
      >
        <View style={styles.authorNameContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  (item.avatar as string) ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
              }}
            />
          </View>
          <Text style={styles.author}>{item.author}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.hashtags}>{item.hashtags}</Text>
        <Text style={styles.date}>{item.datePosted}</Text>
      </View>
      {/* Right Side Icons */}
      <View style={[styles.rightIcons, { paddingBottom: insets.top + 30 }]}>
        <TouchableOpacity style={styles.iconButton}>
          {/* Placeholder for Avatar or other icons */}
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
            params: {
              videoId: item.id,
              author: item.author,
              title: item.title,
              description: item.description,
              avatar: item.avatar,
            },
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
    bottom: 25,
    left: 10,
    right: 80, // To make space for right icons
    gap: 5,
  },
  authorNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  author: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 14,
  },
  hashtags: {
    color: "white",
    fontSize: 14,
  },
  date: {
    color: "gray",
    fontSize: 12,
  },
  rightIcons: {
    position: "absolute",
    right: 10,
    bottom: 15,
    alignItems: "center",
    gap: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  brightBulb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
});
