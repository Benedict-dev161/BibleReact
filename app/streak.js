// app/streak.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StreakScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="flame" size={80} color="#FF9500" />
      <Text style={styles.title}>Your Reading Streak</Text>
      <Text style={styles.subtitle}>
        You haven't started your streak yet! Read a devotional today to light the fire.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});
