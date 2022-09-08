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

	const TransitionScreen = {
		gestureDirection: "horizontal",
		transitionSpec: {
			open: TransitionSpecs.TransitionIOSSpec,
			close: TransitionSpecs.TransitionIOSSpec,
		},
		cardStyleInterpolator: ({ current, next, layouts }) => {
			return {
				cardStyle: {
					transform: [
						{
							translateX: current.progress.interpolate({
								inputRange: [0, 1],
								outputRange: [layouts.screen.width, 0],
							}),
						},
						{
							translateX: next
								? next.progress.interpolate({
										inputRange: [0, 1],
										outputRange: [0, -layouts.screen.width],
								  })
								: 1,
						},
					],
				},
				overlayStyle: {
					opacity: current.progress.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 0.5],
					}),
				},
			};
		},
	};

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					cardStyle: {
						backgroundColor: colors.background,
					},
					...TransitionScreen,
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
