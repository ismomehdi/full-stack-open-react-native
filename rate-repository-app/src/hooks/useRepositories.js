import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      console.log("Data received:", data);
    }
  }, [data]);

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
