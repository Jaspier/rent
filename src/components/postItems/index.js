import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const PostItems = (props) => {
	const navigation = useNavigation();
	const post = props.post;
	return (
		<Pressable
			onPress={() => {
				navigation.navigate("PostDetails");
			}}
			style={styles.container}
		>
			<View style={styles.postWrap}>
				<Image
					source={{ uri: "https://picsum.photos/200/300" }}
					style={styles.postImage}
				></Image>
				<View style={styles.postContentWrap}>
					<View>
						<Text style={styles.postTitle}>{post.title}</Text>
						<Text style={styles.postPlace}>{post.locationName}</Text>
					</View>
					<Text style={styles.postValue}>£{post.rentValue} / day</Text>
				</View>
			</View>
		</Pressable>
	);
};
export default PostItems;
