import React from "react";
import { View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import Greeting from "../home/Greeting";

export default function ProfileInfo() {
  const { user } = useAuth(); 
  if (!user) return
  return (
    <View>
      <Greeting />
    </View>
  );
}