import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Reflections() {
  const [journalText, setJournalText] = useState("");

  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevotional();
  }, []);

  const fetchDevotional = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://192.168.1.65:3000/api/daily-devotional",
      );

      const json = await response.json();

      if (json.success) {
        setDevotional(json.data);
      } else {
        setError("Gagal mengambil data dari server.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server mati atau jaringan terputus.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!journalText.trim()) {
      Alert.alert("Kosong", "Tuliskan sesuatu sebelum menyimpan.");
      return;
    }
    Alert.alert("Tersimpan", "Renungan Anda telah dicatat.");
    setJournalText("");
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Renungan hari ini...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchDevotional}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Daily Reflection</Text>

      {/* Card Bacaan Injil (Gospel) */}
      <View style={styles.verseCard}>
        <Text style={styles.verseReference}>Gospel Reading</Text>
        <Text style={styles.verseText}>"{devotional?.gospel}"</Text>
      </View>

      {/* Area Teks Renungan Singkat */}
      <View style={styles.devotionalSection}>
        <Text style={styles.devotionalTitle}>Meditation</Text>
        <Text style={styles.devotionalBody}>{devotional?.meditation}</Text>
      </View>

      {/* Card Doa Penutup */}
      <View style={styles.prayerCard}>
        <Text style={styles.prayerTitle}>Prayer</Text>
        <Text style={styles.prayerText}>{devotional?.prayer}</Text>
      </View>

      {/* Atribusi Hukum yang Wajib Dicantumkan */}
      <Text style={styles.attributionText}>{devotional?.attribution}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
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
    marginBottom: 20,
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
  prayerCard: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  prayerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005bb5",
    marginBottom: 8,
  },
  prayerText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    fontStyle: "italic",
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
  attributionText: {
    marginTop: 24,
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    lineHeight: 16,
  },
});
