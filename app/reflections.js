import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Reflections() {
  const [journalText, setJournalText] = useState("");

  const handleSave = () => {
    if (!journalText.trim()) {
      Alert.alert("Kosong", "Tuliskan sesuatu sebelum menyimpan.");
      return;
    }

    // Placeholder untuk logika penyimpanan data
    Alert.alert("Tersimpan", "Renungan Anda telah dicatat.");
    setJournalText("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Daily Reflection</Text>

      {/* Card Ayat Sorotan */}
      <View style={styles.verseCard}>
        <Text style={styles.verseReference}>Mazmur 119:105</Text>
        <Text style={styles.verseText}>
          "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
        </Text>
      </View>

      {/* Area Teks Renungan Singkat */}
      <View style={styles.devotionalSection}>
        <Text style={styles.devotionalTitle}>Terang di Tengah Kegelapan</Text>
        <Text style={styles.devotionalBody}>
          Seringkali kita bingung menentukan langkah selanjutnya dalam hidup.
          Namun, setiap kali kita membaca firman, kita diberikan petunjuk
          selangkah demi selangkah. Apa langkah yang sedang Anda gumulkan hari
          ini?
        </Text>
      </View>

      {/* Area Jurnal Pengguna */}
      <View style={styles.journalSection}>
        <Text style={styles.journalLabel}>Catatan Pribadi Anda:</Text>
        <TextInput
          style={styles.journalInput}
          placeholder="Tuliskan renungan atau doa Anda hari ini..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          value={journalText}
          onChangeText={setJournalText}
          textAlignVertical="top"
        />
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>Simpan Catatan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
    marginTop: 8,
  },
  verseCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  verseReference: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 6,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    fontStyle: "italic",
  },
  devotionalSection: {
    marginBottom: 24,
  },
  devotionalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  devotionalBody: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
  journalSection: {
    marginTop: 8,
  },
  journalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },
  journalInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#333",
    minHeight: 120,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
