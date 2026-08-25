import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the landing page heading", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /The ConjuGator/i }),
  ).toBeInTheDocument();
});
