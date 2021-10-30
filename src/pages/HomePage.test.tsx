import React from "react";
import { queryAllByRole, render } from "@testing-library/react";
import HomePage from "./HomePage";
import { Simulate } from "react-dom/test-utils";

test("should render title and file input", () => {
  const { getByRole, getByLabelText, getAllByRole, queryAllByRole } = render(
    <HomePage />
  );

  const heading = getByRole("heading", { level: 2 });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent("Log Parser");

  const form = getByRole("form", { name: /log-file-form/i });
  expect(form).toBeInTheDocument();
  expect(form).toHaveLength(1);

  const label = getByLabelText("Choose Log File");
  expect(label).toBeInTheDocument();

  //TODO: how to test form onchange with useRef?
  const file = new File(["/help_page/1 126.318.035.038"], "line.log", {
    type: "text/plain",
  });

  Simulate.change(label, { target: { files: [file] } });
  expect(queryAllByRole("row")).toHaveLength(0);
});
