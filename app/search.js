import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getVerse } from "../utils/bibleApi";

export default function SearchScreen() {
  const router = useRouter();
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  const handleSearch = async () => {
    // 1. Validasi Input
    if (!book.trim() || !chapter.trim()) {
      Alert.alert("Error", "Buku dan Pasal harus diisi.");
      return;
    }

    // 2. Gabungkan HANYA untuk kebutuhan query API
    const ref = verse.trim()
      ? `${book.trim()} ${chapter.trim()}:${verse.trim()}`
      : `${book.trim()} ${chapter.trim()}`;

    // 3. Panggil API
    const data = await getVerse(ref);

    if (!data || (!data.verses && !data.text)) {
      Alert.alert("Error", "Ayat atau pasal tidak ditemukan.");
      return;
    }

    // 4. Normalisasi data dari API
    const versesArray = data.verses
      ? data.verses
      : [{ verse: data.verse || 1, text: data.text }];

    const safeReference = data.reference || ref;

    const bookKey = book.trim().toLowerCase().replace(/\s+/g, "");
    const chapterNum = parseInt(chapter.trim(), 10);

    // 5. Navigasi ke halaman Verse
    router.push({
      pathname: "/verse",
      params: {
        reference: safeReference,
        verses: JSON.stringify(versesArray),
        bookKey: bookKey,
        chapter: chapterNum,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <Text style={styles.label}>Book</Text>
      <TextInput
        style={styles.input}
        placeholder="example: john, genesis, psalms"
        value={book}
        onChangeText={setBook}
        autoCapitalize="none"
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Chapter</Text>
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
          <Text style={styles.label}>Verse</Text>
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
