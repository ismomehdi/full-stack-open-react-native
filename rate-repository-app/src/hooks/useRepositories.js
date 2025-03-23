import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, search) => {
  console.log("here");
  console.log(orderBy, orderDirection, search);

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection, searchKeyword: search },
  });
  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
