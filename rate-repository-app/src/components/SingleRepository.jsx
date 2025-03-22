import * as Linking from "expo-linking";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: theme.colors.primary,
    margin: 18,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
  },
  background: {
    backgroundColor: theme.colors.appBar,
    height: "100%",
    width: "100%",
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  if (loading) return <Text>Loading...</Text>;

  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.background}>
      <View>
        <RepositoryItem item={repository} />
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={openGitHub}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SingleRepository;
