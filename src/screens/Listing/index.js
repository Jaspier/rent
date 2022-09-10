import {
	View,
	Text,
	Pressable,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { createListing } from "../../graphql/mutations";
import HeaderForDesktop from "../../components/headerForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";

const Listing = () => {
	const navigation = useNavigation();
	const [category, setCategory] = useState({ catID: 0, catName: "Category" });
	const [location, setLocation] = useState({ locID: 0, locName: "Location" });
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [rentValue, setRentValue] = useState("");
	const [userID, setUserID] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [postSuccess, setPostSuccess] = useState("");
	const [postProcessing, setPostProcessing] = useState(false);

	useEffect(() => {
		if (postSuccess !== "") {
			setPostProcessing(false);
			Alert.alert("Success", postSuccess, [
				{
					text: "OK",
					onPress: () => {
						navigation.navigate("Home", { screen: "Explore" });
					},
				},
			]);
		}
	}, [postSuccess]);

	Auth.currentAuthenticatedUser()
		.then((user) => {
			// console.log(user.attributes.sub);
			setUserID(user.attributes.sub);
			setUserEmail(user.attributes.email);
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});

	const [imageData, setImageData] = useState([]);

	const route = useRoute();
	useEffect(() => {
		if (!route.params) {
			console.log("There is no data in route");
		} else {
			if (route.params.imageData !== undefined) {
				setImageData(route.params.imageData);
			} else if (route.params.catID !== undefined) {
				setCategory(route.params);
			} else if (route.params.locID !== undefined) {
				setLocation(route.params);
			}
		}
	});

	// Auth.signOut();

	const imageAllUrl = [];
	const storeToDB = async () => {
		setPostProcessing(true);
		imageData &&
			imageData.map(async (component, index) => {
				const imageUrl = component.uri;
				const response = await fetch(imageUrl);
				const blob = await response.blob();
				const urlParts = imageUrl.split(".");
				const extension =
					urlParts.length > 1 ? urlParts[urlParts.length - 1] : "jpeg";
				const key = `${uuidv4()}.${extension}`;
				imageAllUrl.push({ imageUri: key });
				await Storage.put(key, blob);
				if (imageData.length == index + 1) {
					const postData = {
						title,
						categoryName: category.catName,
						categoryID: category.catID,
						description,
						images: JSON.stringify(imageAllUrl),
						locationName: location.locName,
						locationID: location.locID,
						owner: userEmail,
						rentValue,
						userID,
						commonID: "1",
					};
					await API.graphql({
						query: createListing,
						variables: { input: postData },
						authMode: "AMAZON_COGNITO_USER_POOLS",
					});
					setPostProcessing(false);
					setPostSuccess("Your AD has published successfully.");
				}
			});
	};
	const [menuToggle, setMenuToggle] = useState(false);
	return (
		<View
			style={{
				flex: 1,
				width: "100%",
				alignItems: "center",
				backgroundColor: colors.background,
			}}
		>
			<HeaderForDesktop menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
			<ScrollView style={{ margin: 10, width: "80%", padding: 50 }}>
				<View>
					<View>
						<Text style={{ marginTop: 10 }}>Upload images [Max 5 photos]</Text>
						<Pressable
							style={{
								backgroundColor: colors.white,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginVertical: 20,
								height: 150,
								width: 150,
								borderWidth: 1,
								borderStyle: "dashed",
								borderRadius: 30,
							}}
							onPress={() => {
								navigation.navigate("SelectPhoto");
							}}
						>
							<AntDesign name="pluscircle" size={24} color={colors.secondary} />
						</Pressable>
						<View>
							<ScrollView horizontal={true}>
								{imageData &&
									imageData.map((component, index) => (
										<Image
											key={component.id}
											source={{ uri: component.uri }}
											style={{
												height: 100,
												width: 100,
												marginBottom: 20,
												marginTop: -5,
												marginRight: 5,
											}}
										/>
									))}
							</ScrollView>
						</View>
					</View>
					<Pressable
						style={styles.catStyle}
						onPress={() => {
							navigation.navigate("SelectCategory");
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<MaterialIcons
								name="settings-input-component"
								size={20}
								color={colors.secondary}
							/>
							<Text
								style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}
							>
								{category.catName}
							</Text>
						</View>
						<AntDesign name="right" size={22} color={colors.secondary} />
					</Pressable>
					<Pressable
						onPress={() => {
							navigation.navigate("SelectLocation");
						}}
						style={styles.catStyle}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<MaterialCommunityIcons
								name="map-marker"
								size={24}
								color={colors.secondary}
							/>
							<Text
								style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}
							>
								{location.locName}
							</Text>
						</View>
						<AntDesign name="right" size={22} color={colors.secondary} />
					</Pressable>
					<View style={styles.inputTextStyle}>
						<MaterialIcons name="title" size={24} color={colors.secondary} />
						<TextInput
							placeholder="Ad Title"
							style={{ width: "90%" }}
							onChangeText={(text) => {
								setTitle(text);
							}}
						/>
					</View>
					<View style={styles.inputTextStyle}>
						<MaterialIcons
							name="description"
							size={24}
							color={colors.secondary}
						/>
						<TextInput
							placeholder="Write a description"
							style={{ marginLeft: 5, width: "90%" }}
							onChangeText={(text) => {
								setDescription(text);
							}}
							multiline={true}
							numberOfLines={3}
						/>
					</View>
					<View style={[styles.inputTextStyle, { width: "50%" }]}>
						<Foundation name="pound" size={24} color={colors.secondary} />
						<TextInput
							placeholder="Add a value"
							style={{ marginLeft: 5, width: "90%" }}
							onChangeText={(text) => {
								setRentValue(text);
							}}
							keyboardType="numeric"
						/>
					</View>
					<TouchableOpacity
						onPress={() => storeToDB()}
						style={{
							margin: 10,
							borderRadius: 30,
							backgroundColor: colors.secondary,
							alignItems: "center",
							paddingLeft: 20,
							// marginTop: 20,
							elevation: 5,
						}}
					>
						<Text
							style={{
								color: colors.white,
								paddingVertical: 12,
								fontSize: 14.5,
								fontWeight: "bold",
							}}
						>
							{postProcessing ? "Processing..." : "POST AD"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<MenuDetailsForDesktop
				menuToggle={menuToggle}
				top={59}
				right={"28.55%"}
			/>
		</View>
	);
};

export default withAuthenticator(Listing);
