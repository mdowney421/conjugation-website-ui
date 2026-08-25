import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the landing page heading", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: /The ConjuGator/i }),
  ).toBeInTheDocument();
});
