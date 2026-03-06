import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getChapter } from "../utils/bibleApi";

export default function VerseScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const { reference, verses, bookKey, chapter } = params;

  const parsedVerses = verses ? JSON.parse(verses) : [];

  const [currentChapter, setCurrentChapter] = useState(
    chapter ? parseInt(chapter, 10) : 1,
  );
  const [localVerses, setLocalVerses] = useState(parsedVerses);
  const [jumpChapter, setJumpChapter] = useState("");

  const loadChapter = async (targetChapter) => {
    if (!bookKey) {
      Alert.alert("Error", "Informasi buku tidak tersedia.");
      return;
    }
    const data = await getChapter(bookKey, targetChapter);
    if (!data?.verses) {
      Alert.alert("Error", "Pasal tidak ditemukan.");
      return;
    }
    setCurrentChapter(targetChapter);
    setLocalVerses(data.verses);
  };

  const handleNextChapter = () => {
    const next = currentChapter + 1;
    loadChapter(next);
  };

  const handleJump = () => {
    const num = parseInt(jumpChapter, 10);
    if (isNaN(num) || num <= 0) {
      Alert.alert("Error", "Nomor pasal tidak valid.");
      return;
    }
    loadChapter(num);
  };

  let displayReference = `Chapter ${currentChapter}`;
  if (reference) {
    const parts = reference.split(" ");
    parts.pop();
    const bookName = parts.join(" ");
    displayReference = `${bookName} ${currentChapter}`;
  }


  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.headerTitle}>
            {displayReference}
          </Text>

          <View style={styles.rightPlaceholder} />
        </View>

        {/* Isi ayat diletakkan di atas navigasi */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          {localVerses.map((v, idx) => (
            <View key={idx.toString()} style={styles.verseRow}>
              <Text style={styles.verseNum}>{v.verse}</Text>
              <Text style={styles.verseText}>{v.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Kontrol pasal dipindah ke bawah */}
        <View style={styles.chapterBar}>
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navBtn, styles.prevBtn]}
              onPress={() => {
                if (currentChapter > 1) {
                  loadChapter(currentChapter - 1);
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.navText}>‹ Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navBtn, styles.nextBtn]}
              onPress={handleNextChapter}
              activeOpacity={0.8}
            >
              <Text style={styles.navText}>Next›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.jumpWrapper}>
            <TextInput
              style={styles.jumpInput}
              placeholder="Contoh: 1, 15, 20"
              keyboardType="numeric"
              value={jumpChapter}
              onChangeText={setJumpChapter}
            />
            <TouchableOpacity style={styles.goBtn} onPress={handleJump}>
              <Text style={styles.goText}>GO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },
  backIcon: { fontSize: 24, color: "#007AFF", marginRight: 2 },
  backText: { fontSize: 16, color: "#007AFF", fontWeight: "500" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  rightPlaceholder: { width: 70 },

  chapterBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  navBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  prevBtn: {
    backgroundColor: "#ff0000ff",
    marginRight: 6,
  },
  nextBtn: {
    backgroundColor: "#00ff62ff",
    marginLeft: 6,
  },
  navText: {
    color: "black",
    fontWeight: "600",
    fontSize: 13,
  },
  jumpWrapper: {
    flexDirection: "row",
  },
  jumpInput: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
  },
  goBtn: {
    backgroundColor: "#34C759",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  goText: { color: "white", fontWeight: "600" },

  container: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  verseRow: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 4,
  },
  verseNum: { width: 32, fontWeight: "bold", color: "#007AFF" },
  verseText: { flex: 1, fontSize: 16, lineHeight: 24 },
});


