import CharacterCanvas from "@/components/character/character-canvas";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function Profile() {
  return (
    <>
      <CharacterCanvas />
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View>
              <View style={styles.userLevel}>
                <Text style={styles.username}>@itsTomLie</Text>
                <Text style={styles.level}>Lvl.1</Text>
              </View>
              <Text style={styles.fullName}>Tommy Tommy</Text>
              <Text style={styles.joinDate}>Joined Nov 2024</Text>
            </View>
          </View>
          <View style={styles.cta}>
            <TouchableOpacity style={styles.addFriendButton}>
              <Ionicons name="person-add" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addFriendButton}>
              <Ionicons name="share-social" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.socialStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>823</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <Text style={styles.statSeparator}>|</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>5738</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <Text style={styles.statSeparator}>|</Text>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>203k</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabContainer}>
          <View style={[styles.tabItemContainer, styles.activeTab]}>
            <Image
              source={require("@/assets/icons/dojo.png")}
              style={styles.tabIcon}
            />
            <Text style={styles.tabItem}>Dojo</Text>
          </View>
          <View style={[styles.tabItemContainer]}>
            <Ionicons name="grid-outline" size={20} />
            <Text style={styles.tabItem}>Posts</Text>
          </View>
        </View>

        {/* Character Status */}
        <View style={styles.characterStatusContainer}>
          <View style={styles.healthOuterContainer}>
            <Ionicons
              name="heart"
              size={20}
              color="#ff6b6b"
              style={styles.healthIcon}
            />
            <View style={styles.healthContainer}>
              <View style={styles.healthBar} />
              <Text style={styles.progressLabel}>5 / 5 Health</Text>
            </View>
          </View>
          <View style={styles.experienceOuterContainer}>
            <Ionicons
              name="star"
              size={20}
              color="#ffd700"
              style={styles.experienceIcon}
            />
            <View style={styles.experienceContainer}>
              <View style={styles.experienceBar} />
              <Text style={styles.progressLabel}>0 / 25 Experience</Text>
            </View>
          </View>

          <View style={styles.currencyContainer}>
            <View style={styles.coinsContainer}>
              <FontAwesome6 name="bitcoin" size={20} color="#ffd700" />
              <Text>10,000</Text>
            </View>
            <View style={styles.gemContainer}>
              <FontAwesome6 name="gem" size={20} color="#5bcdfe" />
              <Text>500</Text>
            </View>
          </View>
        </View>

        {/* Starting Objectives */}
        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveTitle}>Starting Objectives</Text>
          <View style={styles.objectivePoints}>
            <Text style={styles.coins}>100</Text>
            <Text style={styles.tasksCompleted}>0 / 5</Text>
          </View>
        </View>

        {/* Streak Section */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>You’re on 21 days streak!</Text>
        </View>

        {/* Challenges */}
        <View style={styles.challengesContainer}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>Challenges</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeName}>Finish 3 Quizzes</Text>
            <View style={styles.objectivePoints}>
              <Text style={styles.coins}>150</Text>
              <Text style={styles.tasksCompleted}>0 / 3</Text>
            </View>
          </View>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeName}>Battle 2 friends</Text>
            <View style={styles.objectivePoints}>
              <Text style={styles.coins}>200</Text>
              <Text style={styles.tasksCompleted}>0 / 2</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addFriendButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  level: {
    color: "gray",
    fontSize: 12,
    marginLeft: 8,
  },
  userLevel: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullName: {
    fontSize: 14,
  },
  joinDate: {
    color: "gray",
    fontSize: 10,
  },
  socialStats: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginRight: 24,
    marginBottom: 8,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  statLabel: {
    color: "gray",
    fontSize: 14,
  },
  statSeparator: {
    color: "gray",
    opacity: 0.5,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  tabItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  tabItem: {
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  characterStatusContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  healthOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  healthIcon: {
    alignSelf: "stretch",
  },
  healthContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#eaeaea",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  healthBar: {
    width: "80%",
    backgroundColor: "#ff6b6b",
    height: "100%",
  },
  experienceOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  experienceIcon: {
    alignSelf: "stretch",
  },
  expBar: {
    width: "10%",
    backgroundColor: "#ffd700",
    height: "100%",
  },
  experienceContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#eaeaea",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  experienceBar: {
    width: "10%",
    backgroundColor: "#ffd700",
    height: "100%",
  },
  progressLabel: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    position: "absolute",
    width: "100%",
  },
  currencyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  gemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  objectiveCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  objectivePoints: {
    alignItems: "flex-end",
  },
  coins: {
    color: "#ffbf00",
    fontWeight: "bold",
    fontSize: 16,
  },
  tasksCompleted: {
    color: "gray",
    fontSize: 12,
  },
  streakContainer: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  streakText: {
    color: "#fff",
    fontWeight: "bold",
  },
  streakDays: {
    flexDirection: "row",
    marginTop: 8,
  },
  streakIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  challengesContainer: {
    marginBottom: 16,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: "#1e90ff",
  },
  challengeCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
