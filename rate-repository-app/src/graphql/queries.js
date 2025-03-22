import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Edges {
    repositories {
      edges {
        node {
          description
          fullName
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

// USAGE EXAMPLE
//
// import { useQuery } from '@apollo/client';

// import { GET_REPOSITORIES } from '../graphql/queries';

// const Component = () => {
//   const { data, error, loading } = useQuery(GET_REPOSITORIES);
//   // ...
// };
