import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const BorrowerTabScreen = (props) => {
	const navigation = useNavigation();
	const post = props.BorrowerTab;
	console.log(post);
	return (
		<View>
			<Text>{post.borrowerEmailID}</Text>
		</View>
		// <Pressable
		// 	onPress={() => {
		// 		navigation.navigate("PostDetails", {
		// 			postInfo: post,
		// 		});
		// 	}}
		// 	style={styles.container}
		// >
		// 	<View style={styles.postWrap}>
		// 		<Image
		// 			source={{
		// 				uri: `https://d24upkfrw5ljca.cloudfront.net/fit-in/400x400/public/${images[0].imageUri}`,
		// 			}}
		// 			style={styles.postImage}
		// 		></Image>
		// 		<View style={styles.postContentWrap}>
		// 			<View>
		// 				<Text style={styles.postTitle}>{post.title}</Text>
		// 				<Text style={styles.postPlace}>{post.locationName}</Text>
		// 			</View>
		// 			<Text style={styles.postValue}>£{post.rentValue} / day</Text>
		// 		</View>
		// 	</View>
		// </Pressable>
	);
};
export default BorrowerTabScreen;
