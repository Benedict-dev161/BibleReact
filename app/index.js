import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import BookList from "../components/BookList";
import { getChapter } from "../utils/bibleApi";

export default function HomeScreen() {
  const router = useRouter(); // Inisialisasi router

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
      <BookList onSelectBook={handleSelectBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});
