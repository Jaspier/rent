import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../modal/color";
import PostDetails from "../screens/postDetails";
import SelectCategoryScreen from "../screens/selectCategory";
import SelectPhotosScreen from "../screens/selectPhotos";
import BottomTabNav from "./BottomTabNavigator";

const Route = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
