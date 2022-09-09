import {
	Text,
	TextInput,
	View,
	Image,
	Dimensions,
	Pressable,
	Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import styles from "./styles";

const HeaderForDesktop = () => {
	const windowWidth = Number(Dimensions.get("window").width);

	return (
		<>
			<View
				style={[
					styles.headerWrap,
					{
						display: windowWidth > 800 ? "flex" : "none",
						height: 80,
						backgroundColor: colors.primary,
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						shadowColor: colors.black,
						shadowOffset: { width: 0, height: 1 },
						shadowOpacity: 0.9,
						shadowRadius: 5,
						elevation: 5,
					},
				]}
			>
				<View
					style={{
						width: "80%",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						<View
							style={{
								height: 60,
								width: 60,
								justifyContent: "center",
								alignItems: "flex-start",
							}}
						>
							<Image
								resizeMode="contain"
								source={require("../../../assets/logo.png")}
								style={{ width: "100%", height: "100%" }}
							/>
						</View>
						<View
							style={{
								marginLeft: 15,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<TextInput
								multiline={false}
								placeholder="Search Rent.com"
								style={{
									backgroundColor: colors.white,
									height: 40,
									width: 250,
									padding: 5,
									borderBottomLeftRadius: 5,
									borderTopLeftRadius: 5,
									borderWidth: 2,
									borderColor: colors.secondary,
								}}
							/>
							<Pressable>
								<Text
									style={{
										backgroundColor: colors.primary,
										height: 40,
										padding: 8.5,
										borderBottomRightRadius: 5,
										borderTopRightRadius: 5,
										borderWidth: 2,
										borderColor: colors.secondary,
										marginLeft: -1.8,
										fontWeight: "bold",
										color: colors.secondary,
									}}
								>
									Search
								</Text>
							</Pressable>
						</View>
						<View
							style={{
								flexDirection: "row",
								paddingVertical: 15,
								paddingHorizontal: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MaterialIcons
								name="location-on"
								size={24}
								color={colors.secondary}
							/>
							<Text style={{ color: colors.secondary }}>
								Location{" "}
								<Text style={{ fontWeight: "bold", color: colors.secondary }}>
									Belfast
								</Text>
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View>
							<Button title="Add Property" color={colors.darkgreen} />
						</View>
						<View style={{ marginLeft: 10 }}>
							<Button title="Menu" color={colors.secondary} />
						</View>
					</View>
				</View>
			</View>
		</>
	);
};
export default HeaderForDesktop;
