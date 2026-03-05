// screens/MainLayout.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout({ children, navigation, active }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.bottomBtn, active === "Home" && styles.activeBtn]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={[
                styles.bottomLabel,
                active === "Home" && styles.activeLabel,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomBtn, active === "Search" && styles.activeBtn]}
            onPress={() => navigation.navigate("Search")}
          >
            <Text
              style={[
                styles.bottomLabel,
                active === "Search" && styles.activeLabel,
              ]}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 4, // extra jarak dari gesture bar
    paddingTop: 4,
  },
  bottomBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLabel: { fontSize: 14, fontWeight: "600", color: "#007AFF" },
  activeBtn: { backgroundColor: "#e6f0ff" },
  activeLabel: { color: "#0053c7" },
});
