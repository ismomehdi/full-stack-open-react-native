import { format } from "date-fns";
import * as Linking from "expo-linking";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import CustomText from "./Text";

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
  reviewTopContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  reviewRatingCircle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewRatingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  reviewTopTextContainer: {
    flex: 1,
    flexShrink: 1,
    gap: 2,
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 12,
    backgroundColor: "white",
    gap: 10,
  },
  separator: {
    height: 10,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
    margin: 10,
  },
});

const RepositoryInfo = ({ repository, openGitHub }) => (
  <View>
    <RepositoryItem item={repository} />
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={openGitHub}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  </View>
);

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewTopContainer}>
      <View style={styles.reviewRatingCircle}>
        <Text style={styles.reviewRatingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewTopTextContainer}>
        <CustomText fontWeight="bold">{review.user.username}</CustomText>
        <CustomText>{format(review.createdAt, "dd.MM.yyyy")}</CustomText>
      </View>
    </View>
    <CustomText>{review.text}</CustomText>
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  if (loading) return <Text>Loading...</Text>;

  const openGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <FlatList
      data={repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} openGitHub={openGitHub} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default SingleRepository;
