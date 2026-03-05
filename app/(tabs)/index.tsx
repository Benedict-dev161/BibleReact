// app/(tabs)/index.tsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import SearchScreen from "../../screens/SearchScreen";
import VerseScreen from "../../screens/VerseScreen";

const Stack = createStackNavigator();

export default function BibleTab() {
  // gunakan navigator saja, tanpa NavigationContainer
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Verse" component={VerseScreen} />
    </Stack.Navigator>
  );
}
