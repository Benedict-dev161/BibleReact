import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BIBLE_BOOKS = [
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
  { id: 17, name: "Esther", key: "esther" },
  { id: 18, name: "Job", key: "job" },
  { id: 19, name: "Psalms", key: "psalms" },
  { id: 20, name: "Proverbs", key: "proverbs" },
  { id: 21, name: "Ecclesiastes", key: "ecclesiastes" },
  { id: 22, name: "Song of Solomon", key: "songofsolomon" },
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

export default function BookList({ onSelectBook, searchQuery = "" }) {
  const filteredBooks = BIBLE_BOOKS.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onSelectBook(item.key, 1)}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{item.id}</Text>
      </View>
      <Text style={styles.bookName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredBooks}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Kitab tidak ditemukan.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e6f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  numberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
  },
  bookName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});
