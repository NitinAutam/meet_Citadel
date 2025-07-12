import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// ✅ Define props shape
interface ProfileCardProps {
  name: string;
  year: number;
  role: string;
  education: string;
  isFriend: boolean;
  image: any; // Can use ImageSourcePropType if you want to be strict
}

export default function ProfileCard({
  name,
  year,
  role,
  education,
  image,
}: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <LinearGradient
          colors={["transparent", "#000", "#000"]}
          style={styles.gradient}
        />
        <View style={styles.topRightIcons}>
          <Ionicons name="grid-outline" size={20} color="#fff" style={{ marginRight: 12 }} />
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.badges}>
            <Text style={styles.friendBadge}>Friend</Text>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>Year</Text>
              <Text style={styles.yearNumber}>{year}</Text>
            </View>
          </View>

          <Text style={styles.name}>{name}</Text>

          <View style={styles.iconRow}>
            <Ionicons name="bulb-outline" size={16} color="#ccc" style={styles.icon} />
            <Text style={styles.detail}>{role}</Text>
          </View>

          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="school-outline" size={16} color="#ccc" style={styles.icon} />
            <Text style={styles.detail}>{education}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // match the fade target color
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    marginRight: 6,
  },

  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    height: 150,
    width: "100%",
    zIndex: 0,
  },
  topRightIcons: {
    position: "absolute",
    top: 70, // or StatusBar.currentHeight + margin
    right: 20,
    flexDirection: "row",
    zIndex: 2,
  },
  infoContainer: {
    padding: 20,
    zIndex: 1,
    backgroundColor: "transparent",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  detail: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // 🧠 forces vertical alignment
    marginBottom: 10,
  },
  friendBadge: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor:'transparent',
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  yearBadge: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48, // ✅ consistent width
    minHeight: 48, // ✅ keeps height consistent
  },
  yearText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "600",
    marginBottom: 4, // ✅ tighten vertical space
  },
  yearNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    lineHeight: 18,
  },
});
