import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDebounce } from "use-debounce";
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
  search: {
    backgroundColor: theme.colors.white,
    padding: 8,
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 4,
    orderBy: orderBy,
    orderDirection: orderDirection,
    debouncedSearch: debouncedSearch,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      repositories={repositories}
      onEndReach={onEndReach}
      setSearch={setSearch}
      search={search}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  setOrderBy,
  setOrderDirection,
  setSearch,
  search,
}) => {
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
        <ListHeader
          pickerActive={pickerActive}
          setPickerActive={setPickerActive}
          pickerValue={pickerValue}
          setPickerValue={setPickerValue}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
          search={search}
          setSearch={setSearch}
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

const ListHeader = ({
  pickerActive,
  setPickerActive,
  pickerValue,
  setPickerValue,
  setOrderBy,
  setOrderDirection,
  search,
  setSearch,
}) => {
  return pickerActive ? (
    <Picker
      selectedValue={pickerValue}
      onValueChange={(value) => {
        setPickerActive(false);
        setPickerValue(value);
        setOrderBy(
          value === "CREATED_AT_DESC" ? "CREATED_AT" : "RATING_AVERAGE"
        );
        setOrderDirection(value === "RATING_AVERAGE_ASC" ? "ASC" : "DESC");
      }}
    >
      <Picker.Item label="Latest repositories" value={"CREATED_AT_DESC"} />
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
    <>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Pressable onPress={() => setPickerActive(true)}>
        <Text style={styles.order}>
          {pickerValue === "CREATED_AT_DESC"
            ? "> Latest repositories"
            : pickerValue === "RATING_AVERAGE_DESC"
            ? "> Highest rated repositories"
            : "> Lowest rated repositories"}
        </Text>
      </Pressable>
    </>
  );
};

export default RepositoryList;
