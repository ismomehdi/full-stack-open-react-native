import { Picker } from "@react-native-picker/picker";
import { use, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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
  order: {
    backgroundColor: theme.colors.light,
    color: theme.colors.textPrimary,
    padding: 10,
    paddingLeft: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const { repositories, loading } = useRepositories(orderBy, orderDirection);
  return (
    <RepositoryListContainer
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      repositories={repositories}
      loading={loading}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  loading,
  setOrderBy,
  setOrderDirection,
}) => {
  if (loading) return <Text>Loading...</Text>;
  const [pickerActive, setPickerActive] = useState(false);
  const [pickerValue, setPickerValue] = useState("CREATED_AT_DESC");

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
      ListHeaderComponent={
        pickerActive ? (
          <Picker
            selectedValue={"CREATED_AT_DESC"}
            onValueChange={(value) => {
              setPickerActive(false);
              setPickerValue(value);
              setOrderBy(
                value === "CREATED_AT_DESC" ? "CREATED_AT" : "RATING_AVERAGE"
              );
              setOrderDirection(
                value === "RATING_AVERAGE_ASC" ? "ASC" : "DESC"
              );
            }}
          >
            <Picker.Item
              label="Latest repositories"
              value={"CREATED_AT_DESC"}
            />
            <Picker.Item
              label="Highest rated repositories"
              value={"RATING_AVERAGE_DESC"}
            />
            <Picker.Item
              label="Lowest rated repositories"
              value={"RATING_AVERAGE_ASC"}
            />
          </Picker>
        ) : (
          <Pressable onPress={() => setPickerActive(true)}>
            <Text style={styles.order}>
              {pickerValue === "CREATED_AT_DESC"
                ? "> Latest repositories"
                : pickerValue === "RATING_AVERAGE_DESC"
                ? "> Highest rated repositories"
                : "> Lowest rated repositories"}
            </Text>
          </Pressable>
        )
      }
    />
  );
};

export default RepositoryList;
