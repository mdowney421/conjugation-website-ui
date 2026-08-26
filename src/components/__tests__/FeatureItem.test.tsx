import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FeatureItem from "../FeatureItem";

test("renders a feature item's title and description", () => {
  render(<FeatureItem title="Quick lookups" description="Find verbs fast." />);
  expect(
    screen.getByRole("heading", { name: "Quick lookups" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Find verbs fast.")).toBeInTheDocument();
});
