import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { colors } from "./src/modal/color";
import { StatusBar } from "expo-status-bar";
import Route from "./src/navigation/Router";
import "react-native-gesture-handler";

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaViewForDroid}>
      <StatusBar barStyle="dark-content" backgroundColor="#90EE90" />
      <Route />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaViewForDroid: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 24 : 0,
    backgroundColor: colors.background,
  },
});
