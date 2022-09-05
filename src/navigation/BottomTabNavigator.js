import Home from "../screens/Home";
import { colors } from "../modal/color";
import PostDetails from "../screens/postDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Listing from "../screens/Listing";

const BottomTabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        //tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.secondary,
        tabBarStyle: { backgroundColor: colors.primary, height: 50 },
      }}
      sceneContainerStyle={{ backgroundColor: colors.backgroundColor }}
    >
      <Tab.Screen
        name={"Explore"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={25} color={colors.secondary} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Listing"}
        component={Listing}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={25}
              color={colors.secondary}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={"Chat"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={25} color={colors.secondary} />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="user-circle"
              size={25}
              color={colors.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;