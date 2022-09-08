import { View, Text, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";

const PostDetails = () => {
	const route = useRoute();
	const navigation = useNavigation();
	console.log(route.params);
	const [images, setImages] = useState(
		JSON.parse(route.params.postInfo.images)
	);
	return (
		<View>
			<ScrollView horizontal={true}>
				{images &&
					images.map((data, index) => (
						<Image
							source={{
								uri: `https://d24upkfrw5ljca.cloudfront.net/fit-in/500x500/public/${images[index].imageUri}`,
							}}
							style={{ height: 320, width: 360, marginRight: 10 }}
							key={index}
						/>
					))}
			</ScrollView>
			<Text
				style={{
					marginLeft: 10,
					fontSize: 30,
					fontWeight: "bold",
					marginRight: 10,
					marginTop: 30,
				}}
			>
				{route.params.postInfo.title}
			</Text>
		</View>
	);
};

export default PostDetails;
