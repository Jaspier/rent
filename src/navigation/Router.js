import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { colors } from "../modal/color";
import PostDetails from "../screens/postDetails";
import SelectCategoryScreen from "../screens/selectCategory";
import SelectLocationScreen from "../screens/selectLocation";
import SelectPhotosScreen from "../screens/selectPhotos";
import BottomTabNav from "./BottomTabNavigator";

const Route = () => {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer
			linking={{
				prefixes: ["myapp://", "https://rent.com", "https://*.rent.com"],
				config: {
					screens: {
						Home: {
							screens: {
								Explore: "/Explore",
								Listing: "/Listing",
								Chat: "/Chat",
								Profile: "/Profile",
							},
						},
						SelectLocation: "/SelectLocation",
						PostDetails: "/PostDetails",
					},
				},
			}}
		>
			<Stack.Navigator
				screenOptions={{
					cardStyle: {
						backgroundColor: colors.background,
					},
				}}
			>
				<Stack.Screen
					name="Home"
					component={BottomTabNav}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PostDetails"
					component={PostDetails}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SelectPhoto"
					component={SelectPhotosScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SelectCategory"
					component={SelectCategoryScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SelectLocation"
					component={SelectLocationScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Route;
