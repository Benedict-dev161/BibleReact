import { useLocalSearchParams, useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { getChapter } from "../utils/bibleApi";

// --- Informasi batas maksimal pasal ---
const MAX_CHAPTERS = {
  genesis: 50,
  exodus: 40,
  leviticus: 27,
  numbers: 36,
  deuteronomy: 34,
  joshua: 24,
  judges: 21,
  ruth: 4,
  "1samuel": 31,
  "2samuel": 24,
  "1kings": 22,
  "2kings": 25,
  "1chronicles": 29,
  "2chronicles": 36,
  ezra: 10,
  nehemiah: 13,
  esther: 10,
  job: 42,
  psalms: 150,
  proverbs: 31,
  ecclesiastes: 12,
  songofsolomon: 8,
  isaiah: 66,
  jeremiah: 52,
  lamentations: 5,
  ezekiel: 48,
  daniel: 12,
  hosea: 14,
  joel: 3,
  amos: 9,
  obadiah: 1,
  jonah: 4,
  micah: 7,
  nahum: 3,
  habakkuk: 3,
  zephaniah: 3,
  haggai: 2,
  zechariah: 14,
  malachi: 4,
  matthew: 28,
  mark: 16,
  luke: 24,
  john: 21,
  acts: 28,
  romans: 16,
  "1corinthians": 16,
  "2corinthians": 13,
  galatians: 6,
  ephesians: 6,
  philippians: 4,
  colossians: 4,
  "1thessalonians": 5,
  "2thessalonians": 3,
  "1timothy": 6,
  "2timothy": 4,
  titus: 3,
  philemon: 1,
  hebrews: 13,
  james: 5,
  "1peter": 5,
  "2peter": 3,
  "1john": 5,
  "2john": 1,
  "3john": 1,
  jude: 1,
  revelation: 22,
};

export default function VerseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { reference, verses, bookKey, chapter } = params;

  const parsedVerses = verses ? JSON.parse(verses) : [];
  const [isSpecificVerse, setIsSpecificVerse] = useState(
    reference ? reference.includes(":") : false,
  );

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
    setIsSpecificVerse(false);
  };

  const handleJump = () => {
    const num = parseInt(jumpChapter, 10);
    const maxChap = MAX_CHAPTERS[bookKey] || 150;

    if (isNaN(num) || num <= 0 || num > maxChap) {
      Alert.alert(
        "Error",
        `Nomor pasal tidak valid. Batas pasal adalah 1 - ${maxChap}.`,
      );
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

  const isFirstChapter = currentChapter <= 1;
  const maxChapterForBook = MAX_CHAPTERS[bookKey] || 150;
  const isLastChapter = currentChapter >= maxChapterForBook;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backText}>Kembali</Text>
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.headerTitle}>
            {displayReference}
          </Text>

          <View style={styles.rightPlaceholder} />
        </View>

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

        <View style={styles.chapterBar}>
          {isSpecificVerse ? (
            <TouchableOpacity
              style={styles.fullChapterBtn}
              onPress={() => loadChapter(currentChapter)}
              activeOpacity={0.8}
            >
              <Text style={styles.fullChapterText}>
                Lihat Keseluruhan Pasal {currentChapter}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.navRow}>
                {/* Tombol Previous dimatikan dan dipudarkan jika pasal 1 */}
                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    styles.prevBtn,
                    isFirstChapter && styles.disabledBtn,
                  ]}
                  disabled={isFirstChapter}
                  onPress={() => loadChapter(currentChapter - 1)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.navText}>‹ Previous</Text>
                </TouchableOpacity>

                {/* Tombol Next dimatikan dan dipudarkan jika mencapai pasal maksimal */}
                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    styles.nextBtn,
                    isLastChapter && styles.disabledBtn,
                  ]}
                  disabled={isLastChapter}
                  onPress={() => loadChapter(currentChapter + 1)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.navText}>Next›</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.jumpWrapper}>
                <TextInput
                  style={styles.jumpInput}
                  placeholder={`Maks: ${maxChapterForBook}`}
                  keyboardType="numeric"
                  value={jumpChapter}
                  onChangeText={setJumpChapter}
                />
                <TouchableOpacity style={styles.goBtn} onPress={handleJump}>
                  <Text style={styles.goText}>GO</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
  fullChapterBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fullChapterText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  },
  prevBtn: {
    backgroundColor: "#ff0000ff",
    marginRight: 6,
  },
  nextBtn: {
    backgroundColor: "#00ff62ff",
    marginLeft: 6,
  },
  disabledBtn: {
    opacity: 0.3,
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
