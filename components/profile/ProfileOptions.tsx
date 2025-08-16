import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/config/theme";
export default function ProfileOptions() {
  const { logout } = useAuth();
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={logout}>
        <Text>Cerrar sesión</Text>
        <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});