import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useMe = () => {
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  return { user: data?.me, error, loading };
};

export default useMe;
