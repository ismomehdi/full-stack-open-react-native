import { FlatList, StyleSheet, Text, View } from "react-native";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
    margin: 10,
  },
  list: {
    backgroundColor: theme.colors.white,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) return <Text>Loading...</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
