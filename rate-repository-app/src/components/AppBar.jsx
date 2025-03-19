import Constants from "expo-constants";
import { Pressable, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    padding: 20,
  },
  link: {
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab link="/" title="Repositories" />
      <Tab link="/signin" title="Sign in" />
    </View>
  );
};

const Tab = ({ link, title }) => (
  <Pressable>
    <Link to={link} style={styles.link} underlayColor="transparent">
      <Text style={styles.text}>{title}</Text>
    </Link>
  </Pressable>
);

export default AppBar;
