import React, { useEffect, useState } from "react";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { getListingByCreatedAt } from "../../graphql/queries";
import { API } from "aws-amplify";
import { FlatList, View, Dimensions } from "react-native";
import HeaderForDesktop from "../../components/headerForDesktop";
import { colors } from "../../modal/color";
import CategoryForDesktop from "../../components/categoryForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";
import { useRoute } from "@react-navigation/native";
import * as search from "../../utilities/search";

const Home = () => {
	const route = useRoute();
	const [searchText, setSearchText] = useState("");
	const [searchByLocation, setSearchByLocation] = useState({
		locationName: "All",
		locationId: "",
	});
	const [searchByCategory, setSearchByCategory] = useState({
		catName: "All",
		catId: "",
	});
	// useEffect(() => {
	// 	if (searchText !== "") {
	// 		alert(searchText);
	// 	}
	// }, [searchText]);
	useEffect(() => {
		if (!route.params) {
			console.log("Params not set");
		} else if (route.params.locID !== undefined) {
			setSearchByLocation({
				locationName: route.params.locName,
				locationId: route.params.locID,
			});
		} else if (route.params.catID !== undefined) {
			setSearchByCategory({
				catName: route.params.catName,
				catId: route.params.catID,
			});
		}
	}, [route.params]);
	const windowWidth = Number(Dimensions.get("window").width);
	const [newItems, setNewItems] = useState([]);
	const [menuToggle, setMenuToggle] = useState(false);

	useEffect(() => {
		if (searchByLocation.locationId !== "") {
			console.log("location id changed to:", searchByLocation);
			if (searchByCategory.catId == "") {
				if (searchText !== "") {
					const result = search.searchWithLocationAndText(
						searchText,
						searchByLocation
					);
					result.then((res) => setNewItems(res));
				} else {
					const result = search.searchWithLocation(
						searchByCategory,
						searchByLocation
					);
					result.then((res) => setNewItems(res));
				}
			} else {
				if (searchText !== "") {
					const result = search.searchWithLocationAndTextAndCategory(
						searchText,
						searchByCategory,
						searchByLocation
					);
					result.then((res) => setNewItems(res));
				} else {
					const result = search.searchWithLocationAndCategory(
						searchByCategory,
						searchByLocation
					);
					result.then((res) => setNewItems(res));
				}
			}
		} else {
			console.log("location id has not changed", searchByLocation);
		}
	}, [searchByLocation]);
	useEffect(() => {
		if (searchText !== "") {
			if (searchByCategory.catId == "") {
				console.log("searchText id changed to:", searchText);
				if (searchByLocation.locationId !== "") {
					const result = search.searchWithLocationAndText(searchText);
					result.then((res) => setNewItems(res));
				} else {
					const result = search.searchWithText(searchText);
					result.then((res) => setNewItems(res));
				}
			} else {
				console.log("searchText id changed to:", searchText);
				if (searchByLocation.locationId !== "") {
					const result = search.searchWithLocationAndTextAndCategory(
						searchText,
						searchByCategory
					);
					result.then((res) => setNewItems(res));
				} else {
					const result = search.searchWithTextAndCategory(
						searchText,
						searchByCategory
					);
					result.then((res) => setNewItems(res));
				}
			}
		} else {
			console.log("searchText id has not changed", searchText);
		}
	}, [searchText]);
	useEffect(() => {
		if (searchByCategory.catId !== "") {
			console.log("searchText id changed to:", searchText);
			if (searchByLocation.locationId !== "") {
				const result = search.searchWithLocationAndTextAndCategory(
					searchText,
					searchByCategory
				);
				result.then((res) => setNewItems(res));
			} else if (searchText !== "") {
				const result = search.searchWithTextAndCategory(
					searchText,
					searchByCategory
				);
				result.then((res) => setNewItems(res));
			} else {
				const result = search.searchByCatFunc(searchByCategory);
				result.then((res) => setNewItems(res));
			}
		} else {
			console.log("searchText id has not changed", searchText);
		}
	}, [searchByCategory]);

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
	}, []);

	return (
		<>
			<HeaderForMobile
				setSearchText={setSearchText}
				searchByCategory={searchByCategory}
				searchByLocation={searchByLocation}
			/>
			<HeaderForDesktop
				menuToggle={menuToggle}
				setMenuToggle={setMenuToggle}
				setSearchText={setSearchText}
				searchByCategory={searchByCategory}
				searchByLocation={searchByLocation}
			/>
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
				<MenuDetailsForDesktop
					menuToggle={menuToggle}
					top={-20}
					right={"28.55%"}
				/>
			</View>
		</>
	);
};

export default Home;
