import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import ProfileCard from "../components/ProfileCard";
import ActionButtons from "../components/ActionButtons";
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

type UserProfile = {
  id: number;
  name: string;
  role?: string;
  demographics: {
    age: number;
    gender: string;
    city: string;
    university: string;
    degree: string;
    year_in_college: number;
    graduation_year: number;
  };
  interests: string[];
  uploaded_media?: string[];
};

export default function Explore() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNextProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get<UserProfile>(
        "http://172.23.16.76:8000/api/explore/next"
      );
      if (res.data && res.data.name) setUser(res.data);
      else setUser(null);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInteraction = async (action: "like" | "dislike") => {
    if (!user) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(async () => {
      try {
        await axios.post("http://172.23.16.76:8000/api/explore/interact", {
          user_id: user.id,
          action,
        });

        const res = await axios.get<UserProfile>(
          "http://172.23.16.76:8000/api/explore/next"
        );
        if (res.data && res.data.name) setUser(res.data);
        else setUser(null);
      } catch (err) {
        console.error("Error during interaction:", err);
      } finally {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  useEffect(() => {
    fetchNextProfile();
  }, []);

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (!user) return <Text style={styles.loading}>No profile available</Text>;

  return (
    <View style={styles.container}>
    <Animated.View style={[styles.cardWrapper, { opacity: fadeAnim }]}>
      <ProfileCard
        name={user.name}
        year={user.demographics.year_in_college}
        role={
          user.interests && user.interests.length >= 2
            ? `${user.interests[0]}, ${user.interests[1]}`
            : user.interests[0] || "Not mentioned"
        }
        education={`${user.demographics.university} · ${user.demographics.degree}`}
        isFriend={false}
        image={{ uri: user.uploaded_media?.[0] }}
      />
    </Animated.View>

    <ActionButtons
      onLike={() => handleInteraction("like")}
      onDislike={() => handleInteraction("dislike")}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  loading: {
    color: "#07f582ff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
 
cardWrapper: {
  height: screenHeight * 0.84, // 65% of screen
  overflow: 'hidden',
},
});
