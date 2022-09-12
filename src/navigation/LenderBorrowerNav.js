import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeaderForDesktop from "../components/headerForDesktop";
import MenuDetailsForDesktop from "../components/menuDetailsForDesktop";
import BorrowerScreen from "../screens/Borrower";
import LenderScreen from "../screens/Lender";

const Tab = createMaterialTopTabNavigator();

const LenderBorrowerNavScreen = () => {
	const [menuToggle, setMenuToggle] = useState(false);
	return (
		<>
			<HeaderForDesktop menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
			<Tab.Navigator>
				<Tab.Screen name="Borrower" component={BorrowerScreen} />
				<Tab.Screen name="Lender" component={LenderScreen} />
			</Tab.Navigator>
			<MenuDetailsForDesktop
				menuToggle={menuToggle}
				top={59}
				right={"28.55%"}
			/>
		</>
	);
};

export default LenderBorrowerNavScreen;
