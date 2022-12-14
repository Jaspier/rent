import React from "react";
import { Text, View, Dimensions, Pressable } from "react-native";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../modal/color";

const MenuDetailsForDesktop = (props) => {
	const windowWidth = Number(Dimensions.get("window").width);
	const navigation = useNavigation();

	return (
		<View style={{ position: "absolute", top: props.top, right: props.right }}>
			<View
				style={{
					display: props.menuToggle
						? windowWidth > 800
							? "flex"
							: "none"
						: "none",
					position: "absolute",
					width: 200,
					backgroundColor: colors.secondary,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
					padding: 20,
					shadowColor: colors.black,
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.9,
					shadowRadius: 5,
					elevation: 5,
				}}
			>
				<View>
					<Pressable
						onPress={() => {
							navigation.navigate("Home", { screen: "Journal" });
						}}
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<FontAwesome5
							name="journal-whills"
							size={24}
							color={colors.white}
						/>
						<Text style={{ color: colors.white, marginLeft: 10 }}>Journal</Text>
					</Pressable>
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<FontAwesome name="user-circle" size={25} color={colors.white} />
						<Text style={{ color: colors.white, marginLeft: 10 }}>Profile</Text>
					</Pressable>
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						<AntDesign name="logout" size={24} color={colors.white} />
						<Text style={{ color: colors.white, marginLeft: 10 }}>Logout</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default MenuDetailsForDesktop;
