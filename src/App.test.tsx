import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

test("renders the landing page heading", () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>,
  );
  expect(
    screen.getByRole("heading", { name: /The ConjuGator/i }),
  ).toBeInTheDocument();
});
