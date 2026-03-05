import React from "react";
import { StyleSheet, View } from "react-native";
import BookList from "../components/BookList";
import { getChapter } from "../utils/bibleApi";
import MainLayout from "./MainLayout";

export default function HomeScreen({ navigation }) {
  const handleSelectBook = async (bookKey, chapter) => {
    const data = await getChapter(bookKey, chapter);
    if (data?.verses) {
      navigation.navigate("Verse", {
        reference: data.reference,
        verses: data.verses,
        bookKey,
        chapter,
      });
    }
  };

  return (
    <MainLayout navigation={navigation} active="Home">
      <View style={styles.container}>
        <BookList onSelectBook={handleSelectBook} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});
