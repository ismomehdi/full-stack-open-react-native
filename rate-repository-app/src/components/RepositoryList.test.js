import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react-native";
import { RepositoryListContainer } from "./RepositoryList";

describe("RepositoryListContainer", () => {
  const repositories = {
    totalCount: 8,
    pageInfo: {
      hasNextPage: true,
      endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
      startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    edges: [
      {
        node: {
          id: "jaredpalmer.formik",
          fullName: "jaredpalmer/formik",
          description: "Build forms in React, without the tears",
          language: "TypeScript",
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            "https://avatars2.githubusercontent.com/u/4060187?v=4",
        },
        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
      {
        node: {
          id: "async-library.react-async",
          fullName: "async-library/react-async",
          description: "Flexible promise-based React data loader",
          language: "JavaScript",
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            "https://avatars1.githubusercontent.com/u/54310907?v=4",
        },
        cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
      },
    ],
  };

  it("renders repository's name, description, language, forks count, stargazers count, rating average, and review count", () => {
    render(
      <RepositoryListContainer repositories={repositories} loading={false} />
    );

    const repositoryItems = screen.getAllByTestId("repositoryItem");
    const firstRepo = within(repositoryItems[0]);

    expect(firstRepo.getByText("jaredpalmer/formik")).toBeDefined();
    expect(
      firstRepo.getByText("Build forms in React, without the tears")
    ).toBeDefined();
    expect(firstRepo.getByText("TypeScript")).toBeDefined();
    expect(firstRepo.getByText("1.6k")).toBeDefined();
    expect(firstRepo.getByText("21.9k")).toBeDefined();
    expect(firstRepo.getByText("88")).toBeDefined();
    expect(firstRepo.getByText("3")).toBeDefined();

    const secondRepo = within(repositoryItems[1]);

    expect(secondRepo.getByText("async-library/react-async")).toBeDefined();
    expect(
      secondRepo.getByText("Flexible promise-based React data loader")
    ).toBeDefined();
    expect(secondRepo.getByText("JavaScript")).toBeDefined();
    expect(secondRepo.getByText("69")).toBeDefined();
    expect(secondRepo.getByText("1.8k")).toBeDefined();
    expect(secondRepo.getByText("72")).toBeDefined();
    expect(secondRepo.getByText("3")).toBeDefined();
  });
});
