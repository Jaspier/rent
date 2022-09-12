import { Text, View, TextInput, Dimensions, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import styles from "./styles.js";
import { useNavigation } from "@react-navigation/native";

const HeaderForMobile = (props) => {
	const navigation = useNavigation();
	const windowWidth = Number(Dimensions.get("window").width);
	function onSearch(e) {
		props.setSearchText(e);
	}

	return (
		<>
			<View
				style={[
					styles.headerWrap,
					{ display: windowWidth > 800 ? "none" : "flex" },
				]}
			>
				<View style={styles.searchByTextWrap}>
					<Feather name="search" size={24} color={colors.black} />
					<TextInput
						placeholder="Search in Rent.com"
						style={styles.searchPlaceholder}
						multiline={false}
						onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
					/>
				</View>
				<View style={styles.locationCatSearchWrap}>
					<Pressable
						onPress={() => {
							navigation.navigate("LocationSearch");
						}}
						style={styles.locationSearchWrap}
					>
						<MaterialIcons name="location-on" size={20} color={colors.black} />
						<Text>Location</Text>
						<Text style={styles.locationSearchText}>
							{props.searchByLocation.locationName}
						</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							navigation.navigate("CategorySearch");
						}}
						style={styles.catSearchWrap}
					>
						<MaterialIcons
							name="settings-input-component"
							size={20}
							color={colors.black}
						/>
						<Text style={styles.catText}>Category</Text>
						<Text style={styles.catDynText}>
							{props.searchByCategory.catName}
						</Text>
					</Pressable>
				</View>
			</View>
		</>
	);
};
export default HeaderForMobile;
