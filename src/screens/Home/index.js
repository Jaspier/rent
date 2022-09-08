import React, { useEffect, useState } from "react";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { getListingByCreatedAt } from "../../graphql/queries";
import { API } from "aws-amplify";
import { FlatList } from "react-native";

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
		<>
			<HeaderForMobile />
			<FlatList
				data={newItems}
				renderItem={({ item }) => <PostItems post={item} />}
			/>
		</>
	);
};

export default Home;
