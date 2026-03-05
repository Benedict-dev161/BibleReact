import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const bibleBooks = [
  // OLD TESTAMENT
  { id: 1, name: "Genesis", key: "genesis" },
  { id: 2, name: "Exodus", key: "exodus" },
  { id: 3, name: "Leviticus", key: "leviticus" },
  { id: 4, name: "Numbers", key: "numbers" },
  { id: 5, name: "Deuteronomy", key: "deuteronomy" },
  { id: 6, name: "Joshua", key: "joshua" },
  { id: 7, name: "Judges", key: "judges" },
  { id: 8, name: "Ruth", key: "ruth" },
  { id: 9, name: "1 Samuel", key: "1samuel" },
  { id: 10, name: "2 Samuel", key: "2samuel" },
  { id: 11, name: "1 Kings", key: "1kings" },
  { id: 12, name: "2 Kings", key: "2kings" },
  { id: 13, name: "1 Chronicles", key: "1chronicles" },
  { id: 14, name: "2 Chronicles", key: "2chronicles" },
  { id: 15, name: "Ezra", key: "ezra" },
  { id: 16, name: "Nehemiah", key: "nehemiah" },
  { id: 17, name: "Esther", key: "ester" },
  { id: 18, name: "Job", key: "job" },
  { id: 19, name: "Psalms", key: "psalms" },
  { id: 20, name: "Proverbs", key: "proverbs" },
  { id: 21, name: "Ecclesiastes", key: "ecclesiastes" },
  { id: 22, name: "Song of Songs", key: "songofsolomon" },
  { id: 23, name: "Isaiah", key: "isaiah" },
  { id: 24, name: "Jeremiah", key: "jeremiah" },
  { id: 25, name: "Lamentations", key: "lamentations" },
  { id: 26, name: "Ezekiel", key: "ezekiel" },
  { id: 27, name: "Daniel", key: "daniel" },
  { id: 28, name: "Hosea", key: "hosea" },
  { id: 29, name: "Joel", key: "joel" },
  { id: 30, name: "Amos", key: "amos" },
  { id: 31, name: "Obadiah", key: "obadiah" },
  { id: 32, name: "Jonah", key: "jonah" },
  { id: 33, name: "Micah", key: "micah" },
  { id: 34, name: "Nahum", key: "nahum" },
  { id: 35, name: "Habakkuk", key: "habakkuk" },
  { id: 36, name: "Zephaniah", key: "zephaniah" },
  { id: 37, name: "Haggai", key: "haggai" },
  { id: 38, name: "Zechariah", key: "zechariah" },
  { id: 39, name: "Malachi", key: "malachi" },
  { id: 40, name: "Matthew", key: "matthew" },
  { id: 41, name: "Mark", key: "mark" },
  { id: 42, name: "Luke", key: "luke" },
  { id: 43, name: "John", key: "john" },
  { id: 44, name: "Acts", key: "acts" },
  { id: 45, name: "Romans", key: "romans" },
  { id: 46, name: "1 Corinthians", key: "1corinthians" },
  { id: 47, name: "2 Corinthians", key: "2corinthians" },
  { id: 48, name: "Galatians", key: "galatians" },
  { id: 49, name: "Ephesians", key: "ephesians" },
  { id: 50, name: "Philippians", key: "philippians" },
  { id: 51, name: "Colossians", key: "colossians" },
  { id: 52, name: "1 Thessalonians", key: "1thessalonians" },
  { id: 53, name: "2 Thessalonians", key: "2thessalonians" },
  { id: 54, name: "1 Timothy", key: "1timothy" },
  { id: 55, name: "2 Timothy", key: "2timothy" },
  { id: 56, name: "Titus", key: "titus" },
  { id: 57, name: "Philemon", key: "philemon" },
  { id: 58, name: "Hebrews", key: "hebrews" },
  { id: 59, name: "James", key: "james" },
  { id: 60, name: "1 Peter", key: "1peter" },
  { id: 61, name: "2 Peter", key: "2peter" },
  { id: 62, name: "1 John", key: "1john" },
  { id: 63, name: "2 John", key: "2john" },
  { id: 64, name: "3 John", key: "3john" },
  { id: 65, name: "Jude", key: "jude" },
  { id: 66, name: "Revelation", key: "revelation" },
];

export default function BookList({ onSelectBook, onSearchPress }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => onSelectBook(item.key, 1)}
      activeOpacity={0.7}
    >
      <Text style={styles.bookNumber}>{item.id}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>📖 BIBLE</Text>
      <FlatList
        data={bibleBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      {onSearchPress && (
        <TouchableOpacity style={styles.searchBtn} onPress={onSearchPress}>
          <Text style={styles.searchBtnText}>🔍 Cari Ayat/Pasal</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  listContainer: { paddingBottom: 80 },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  bookNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ecf0f1",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#3498db",
    fontWeight: "bold",
    marginRight: 10,
  },
  bookName: { fontSize: 16, fontWeight: "600" },
  bookKey: { fontSize: 12, color: "#7f8c8d" },
  searchBtn: {
    backgroundColor: "#e74c3c",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  searchBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
