import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Edges(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
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

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      description
      fullName
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query Me {
    me {
      id
      username
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
