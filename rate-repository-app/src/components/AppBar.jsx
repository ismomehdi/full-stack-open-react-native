import Constants from "expo-constants";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab />
    </View>
  );
};

const Tab = () => (
  <Pressable>
    <Text style={styles.text}>Repositories</Text>
  </Pressable>
);

export default AppBar;
