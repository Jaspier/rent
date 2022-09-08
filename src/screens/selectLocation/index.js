import React, { useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../modal/color";

const SelectLocationScreen = () => {
	const navigation = useNavigation();

	const [locState, setLocState] = useState({
		names: [
			{
				id: 0,
				name: "Belfast",
			},
			{
				id: 1,
				name: "Antrim",
			},
			{
				id: 2,
				name: "Newtownards",
			},
			{
				id: 3,
				name: "Ballymena",
			},
			{
				id: 4,
				name: "Larne",
			},
		],
	});

	return (
		<ScrollView>
			<Text style={{ fontSize: 20, margin: 20 }}>Choose a Location</Text>
			{locState.names.map((item, index) => (
				<TouchableOpacity
					key={item.id}
					style={{
						padding: 15,
						backgroundColor: colors.primary,
						alignItems: "center",
						justifyContent: "flex-start",
						flexDirection: "row",
						paddingLeft: 30,
						borderBottomWidth: 1,
						borderBottomColor: colors.grey,
					}}
					onPress={() => {
						navigation.navigate("Listing", {
							locID: item.id,
							locName: item.name,
						});
					}}
				>
					<Text>{item.name}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

export default SelectLocationScreen;
