import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const PostItems = (props) => {
	const navigation = useNavigation();
	const post = props.post;
	const [images, setImages] = useState(JSON.parse(post.images));
	return (
		<Pressable
			onPress={() => {
				navigation.navigate("PostDetails", {
					postInfo: post,
				});
			}}
			style={styles.container}
		>
			<View style={styles.postWrap}>
				<Image
					source={{
						uri: `https://d24upkfrw5ljca.cloudfront.net/fit-in/400x400/public/${images[0].imageUri}`,
					}}
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
