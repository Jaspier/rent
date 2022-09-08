import React, { useEffect, useState } from "react";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { getListingByCreatedAt } from "../../graphql/queries";
import { API } from "aws-amplify";
import { FlatList, View } from "react-native";
import HeaderForDesktop from "../../components/headerForDesktop";
import { colors } from "../../modal/color";

const Home = () => {
	const [newItems, setNewItems] = useState([]);
	const fetchAll = async () => {
		try {
			const itemListByCommonID = await API.graphql({
				query: getListingByCreatedAt,
				variables: { commonID: "1", sortDirection: "DESC" },
				authMode: "AWS_IAM",
			});
			setNewItems(itemListByCommonID.data.getListingByCreatedAt.items);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAll();
	});

	return (
		<View style={{ backgroundColor: colors.background }}>
			<HeaderForMobile />
			<HeaderForDesktop />
			<FlatList
				data={newItems}
				renderItem={({ item }) => <PostItems post={item} />}
			/>
		</View>
	);
};

export default Home;
