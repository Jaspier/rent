import React, { useEffect, useState } from "react";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { getListingByCreatedAt } from "../../graphql/queries";
import { API } from "aws-amplify";
import { FlatList, View, Text, Dimensions } from "react-native";
import HeaderForDesktop from "../../components/headerForDesktop";
import { colors } from "../../modal/color";
import CategoryForDesktop from "../../components/categoryForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";

const Home = () => {
	const windowWidth = Number(Dimensions.get("window").width);
	const [newItems, setNewItems] = useState([]);
	const [menuToggle, setMenuToggle] = useState(false);
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
			<HeaderForDesktop menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
			<View
				style={{
					flex: 1,
					alignItems: "center",
					position: "relative",
					backgroundColor: windowWidth > 800 ? colors.background : "",
				}}
			>
				<View
					style={{
						flex: 1,
						width: windowWidth > 800 ? "80%" : "100%",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<View
						style={{
							display: windowWidth > 800 ? "flex" : "none",
							flexBasis: "20%",
						}}
					>
						<CategoryForDesktop />
					</View>
					<FlatList
						style={{ flexBasis: "80%", marginTop: 10 }}
						data={newItems}
						renderItem={({ item }) => <PostItems post={item} />}
					/>
				</View>
				<MenuDetailsForDesktop menuToggle={menuToggle} />
			</View>
		</>
	);
};

export default Home;
