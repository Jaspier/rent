import { View, Text, Pressable, TextInput } from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import styles from "./styles";

const Listing = () => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      // console.log(user.attributes.email);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

  return (
    <View style={{ margin: 10 }}>
      <View>
        <Text style={{ marginTop: 10 }}>Upload images [Max 5 photos]</Text>
        <Pressable
          style={{
            backgroundColor: colors.white,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
            height: 150,
            width: 150,
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 30,
          }}
        >
          <AntDesign name="pluscircle" size={24} color={colors.secondary} />
        </Pressable>
      </View>
      <View style={styles.catStyle}>
        <Text style={{ fontSize: 16, color: colors.secondary }}>Category</Text>
        <AntDesign name="right" size={22} color={colors.secondary} />
      </View>
      <View style={styles.catStyle}>
        <Text style={{ fontSize: 16, color: colors.secondary }}>Location</Text>
        <AntDesign name="right" size={22} color={colors.secondary} />
      </View>
      <View>
        <TextInput
          placeholder="Advertisement Title"
          style={styles.inputTextStyle}
        />
      </View>
      <View>
        <TextInput
          placeholder="Write a description"
          style={styles.inputTextStyle}
        />
      </View>
      <View>
        <TextInput
          placeholder="Add a value"
          style={[styles.inputTextStyle, { width: "50%" }]}
        />
      </View>
      <View
        style={{
          margin: 10,
          borderRadius: 30,
          backgroundColor: colors.secondary,
          alignItems: "center",
          paddingLeft: 20,
          marginTop: 20,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: colors.white,
            paddingVertical: 12,
            fontSize: 14.5,
            fontWeight: "bold",
          }}
        >
          POST AD
        </Text>
      </View>
    </View>
  );
};

export default withAuthenticator(Listing);
