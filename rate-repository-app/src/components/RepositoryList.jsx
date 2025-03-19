import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
  const [repositories, setRepositories] = useState();
  const fetchRepositories = async () => {
    // Replace the IP address part with your own IP address!
    const response = await fetch("http://192.168.1.109:5001/api/repositories");
    const json = await response.json();

    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

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
