import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";

test("should render title and file input", () => {
  const { getByRole, getByLabelText } = render(<HomePage />);

  const heading = getByRole("heading", { level: 2 });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent("Log Parser");

  const form = getByRole("form", { name: /log-file-form/i });
  expect(form).toBeInTheDocument();

  const label = getByLabelText("Choose Log File");
  expect(label).toBeInTheDocument();
});
