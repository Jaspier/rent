import { API, Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import BorrowerTabScreen from "../../components/borrowerTab";
import { listRentOrders } from "../../graphql/queries";

const BorrowerScreen = () => {
	const [newItems, setNewItems] = useState([]);
	const [userID, setUserID] = useState("");
	Auth.currentAuthenticatedUser()
		.then((user) => {
			// console.log(user.attributes.sub);
			setUserID(user.attributes.sub);
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});

	const fetchAll = async () => {
		try {
			const orderList = await API.graphql({
				query: listRentOrders,
				variables: {
					filter: {
						borrowerUserId: { eq: userID },
					},
				},
				authMode: "AMAZON_COGNITO_USER_POOLS",
			});
			setNewItems(orderList.data.listRentOrders.items);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchAll();
	});
	return (
		<View>
			<FlatList
				data={newItems}
				renderItem={({ item }) => <BorrowerTabScreen BorrowerTab={item} />}
			/>
		</View>
	);
};

export default BorrowerScreen;
