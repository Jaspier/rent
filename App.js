import { StyleSheet, SafeAreaView, Platform } from "react-native";
import PostItems from "./src/components/postItems";
import HeaderForMobile from "./src/components/headerForMobile";
import { colors } from "./src/modal/color";

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaViewForDroid}>
      <HeaderForMobile />
      <PostItems />
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
