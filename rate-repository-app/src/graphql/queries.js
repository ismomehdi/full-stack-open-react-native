import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Edges(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
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
          cursor
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
