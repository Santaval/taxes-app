import { Colors, Typography } from "@/config/theme";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Greeting() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Buenos días";
    } else if (hour >= 12 && hour < 20) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getGreeting()}, {user?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: Typography.size.xl,
    fontWeight: "bold",
    color: Colors.white,
  },
});