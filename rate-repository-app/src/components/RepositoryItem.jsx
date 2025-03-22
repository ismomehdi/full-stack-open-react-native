import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  topTextContainer: {
    flex: 1,
    flexShrink: 1,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  chip: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: "flex-start",
    borderRadius: 5,
    color: theme.colors.white,
    marginTop: 5,
  },
});

const RepositoryItem = (item) => {
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item.item;
  const navigate = useNavigate();
  return (
    <Pressable
      onPress={() => navigate(`/repository/${id}`)}
      testID="repositoryItem"
      style={styles.container}
    >
      <View style={styles.top}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        <View style={styles.topTextContainer}>
          <Text fontWeight={"bold"}>{fullName}</Text>
          <Text color={"textSecondary"} numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Text>
          <Text style={styles.chip}>{language}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <InfoItem title="Stars" value={formatCount(stargazersCount)} />
        <InfoItem title="Forks" value={formatCount(forksCount)} />
        <InfoItem title="Reviews" value={formatCount(reviewCount)} />
        <InfoItem title="Rating" value={ratingAverage} />
      </View>
    </Pressable>
  );
};

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const InfoItem = ({ title, value }) => (
  <View>
    <Text fontWeight={"bold"}>{value}</Text>
    <Text color={"textSecondary"}>{title}</Text>
  </View>
);

export default RepositoryItem;
