import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getVerse } from "../utils/bibleApi";
import MainLayout from "./MainLayout"; // pastikan path sesuai

export default function SearchScreen({ navigation }) {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const handleSearch = async () => {
    if (!book.trim() || !chapter.trim()) {
      Alert.alert("Error", "Please fill at least Book and Chapter.");
      return;
    }

    const ref = verse.trim()
      ? `${book.trim()} ${chapter.trim()}:${verse.trim()}`
      : `${book.trim()} ${chapter.trim()}`;

    const data = await getVerse(ref);

    if (!data || (!data.verses && !data.text)) {
      Alert.alert("Error", "Verse or chapter not found.");
      return;
    }

    // Normalisasi supaya selalu punya verses[]
    const versesArray = data.verses
      ? data.verses
      : [{ verse: data.verse || 1, text: data.text }];

    const safeReference = data.reference || ref;

    // Sederhanakan bookKey & chapter untuk VerseScreen
    const [bookKeyRaw, chapterRaw] = ref.split(" ");
    const bookKey = bookKeyRaw.toLowerCase();
    const chapterNum = parseInt(chapterRaw, 10);

    navigation.navigate("Verse", {
      reference: safeReference,
      verses: versesArray,
      bookKey,
      chapter: chapterNum,
    });
  };

  return (
    <MainLayout navigation={navigation} active="Search">
      <View style={styles.container}>
        <Text style={styles.title}>Cari Ayat / Pasal</Text>

        <Text style={styles.label}>Buku</Text>
        <TextInput
          style={styles.input}
          placeholder="example: john, genesis, psalms"
          value={book}
          onChangeText={setBook}
          autoCapitalize="none"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Pasal</Text>
            <TextInput
              style={styles.input}
              placeholder="example: 2"
              keyboardType="numeric"
              value={chapter}
              onChangeText={setChapter}
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.column}>
            <Text style={styles.label}>Ayat</Text>
            <TextInput
              style={styles.input}
              placeholder="example: 1-2 or 16"
              value={verse}
              onChangeText={setVerse}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  column: {
    flex: 1,
  },
  spacer: {
    width: 12,
  },
  searchBtn: {
    marginTop: 12,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  searchBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
