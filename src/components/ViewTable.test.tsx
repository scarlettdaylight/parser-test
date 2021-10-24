import React from "react";
import { render, screen } from "@testing-library/react";
import ViewTable from "./ViewTable";
import { getTotalView } from "../log-parser";
import { loadFile } from "../log-parser/index.test";

test("should not render if not empty data is given", () => {
  const { container } = render(<ViewTable title={"Table"} data={{}} />);
  expect(container.firstChild).toBeNull();
});

test("should render one table if data is given", () => {
  const data = { "/a": 1 };
  const { container, getByText, getByRole, getAllByRole } = render(
    <ViewTable title={"Table"} data={data} />
  );
  expect(getByText(/Table/i)).toBeInTheDocument();
  expect(getByRole("table")).toBeInTheDocument();
  expect(getByRole("heading", { level: 4 })).toBeInTheDocument();
  expect(getAllByRole("row")).toHaveLength(2);
  expect(getByText("/a")).toBeInTheDocument();
});

test("should render correct rows", () => {
  const str = loadFile("repeated.log");
  expect(getTotalView(str)).toEqual({
    "/help_page/1": 5,
    "/contact": 4,
    "/home": 2,
    "/about/2": 3,
  });

  const { container, getByText, getByRole, getAllByRole } = render(
    <ViewTable title={"Total View"} data={getTotalView(str)} />
  );
  expect(getByText(/Total View/i)).toBeInTheDocument();
  expect(getByRole("table")).toBeInTheDocument();
  expect(getByRole("heading", { level: 4 })).toBeInTheDocument();
  expect(getAllByRole("row")).toHaveLength(5);

  expect(getAllByRole("row")[1]?.firstChild?.textContent).toEqual(
    "/help_page/1"
  );
  expect(getAllByRole("row")[2]?.firstChild?.textContent).toEqual("/contact");
});
