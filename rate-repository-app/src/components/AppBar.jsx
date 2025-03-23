import { useApolloClient } from "@apollo/client";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Link, useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import useMe from "../hooks/useMe";
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
  const { user } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab link="/" title="Repositories" />
        {!user && <Tab link="/signin" title="Sign in" />}
        {user && (
          <>
            <Tab link="/review" title="Create a review" />
            <Pressable
              style={styles.link}
              onPress={() => {
                authStorage.removeAccessToken();
                apolloClient.resetStore();
                navigate("/signin");
              }}
            >
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
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
