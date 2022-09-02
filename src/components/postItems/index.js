import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import styles from "./styles";

const PostItems = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#90EE90" />
      <View style={styles.postWrap}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.postImage}
        ></Image>
        <View style={styles.postContentWrap}>
          <View>
            <Text style={styles.postTitle}>This is title for rent.</Text>
            <Text style={styles.postPlace}>Belfast</Text>
          </View>
          <Text style={styles.postValue}>£100 / day</Text>
        </View>
      </View>
    </View>
  );
};
export default PostItems;
