import { Text, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import styles from "./styles.js";

const HeaderForMobile = () => {
  return (
    <>
      <View style={styles.headerWrap}>
        <View style={styles.searchByTextWrap}>
          <Feather name="search" size={24} color={colors.black} />
          <TextInput
            placeholder="Search in Rent.com"
            style={styles.searchPlaceholder}
            multiline={false}
          />
        </View>
        <View style={styles.locationCatSearchWrap}>
          <View style={styles.locationSearchWrap}>
            <MaterialIcons name="location-on" size={20} color={colors.black} />
            <Text>location</Text>
            <Text style={styles.locationSearchText}>Belfast</Text>
          </View>
          <View style={styles.catSearchWrap}>
            <MaterialIcons
              name="settings-input-component"
              size={20}
              color={colors.black}
            />
            <Text style={styles.catText}>Category</Text>
            <Text style={styles.catDynText}>Vehicle</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default HeaderForMobile;
