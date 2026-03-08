import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import BookList from "../components/BookList";
import { getChapter } from "../utils/bibleApi";

export default function HomeScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectBook = async (bookKey, chapter) => {
    const data = await getChapter(bookKey, chapter);

    if (data?.verses) {
      router.push({
        pathname: "/verse",
        params: {
          reference: data.reference,
          verses: JSON.stringify(data.verses),
          bookKey: bookKey,
          chapter: chapter,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Area Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for books (e.g., Genesis, John)"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Daftar Kitab */}
      <BookList onSelectBook={handleSelectBook} searchQuery={searchQuery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
