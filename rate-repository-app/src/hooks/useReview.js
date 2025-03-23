import { useMutation } from "@apollo/client";
import { REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(REVIEW);

  const review = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: parseInt(rating),
          text,
        },
      },
    });

    return data;
  };

  return [review, result];
};

export default useReview;
