import fs from "fs";
import path from "path";
import { getTotalView, getUniqueView, validateRecord } from "./index";

const LOG_DIR = "./sample-log/";
const READ_OPTION = { encoding: "utf8" };

export const loadFile = (filePath: string) => {
  const twoLineFile = path.join(__dirname, LOG_DIR, filePath);
  return fs.readFileSync(twoLineFile, READ_OPTION);
};

//---------- validateRecord
describe("validateRecord", () => {
  it("should return false if given empty string", () => {
    expect(validateRecord("")).toBeFalsy();
  });

  it("should return false if give both string", () => {
    expect(validateRecord("path ip")).toBeFalsy();
  });

  it("should return false if contains more than 2 words", () => {
    expect(validateRecord("path ip ip")).toBeFalsy();
  });

  it("should return array if string is valid", () => {
    expect(validateRecord("/help_page/1 126.318.035.038")).toEqual([
      "/help_page/1",
      "126.318.035.038",
    ]);
  });
});

//---------- getTotalView
//string => PageViewCount
describe("getTotalView", () => {
  it("should accept empty string and return empty object", () => {
    expect(getTotalView("")).toEqual({});
  });

  it("should accept single line and return object", () => {
    expect(getTotalView("/help_page/1 126.318.035.038")).toEqual({
      "/help_page/1": 1,
    });
  });

  it("should be able to handle skipped lines", () => {
    const str = loadFile("skipped.log");
    expect(getTotalView(str)).toEqual({ "/help_page/1": 5 });
  });

  it("should be able to skip invalid lines", () => {
    const str = loadFile("invalid.log");
    expect(getTotalView(str)).toEqual({ "/help_page/1": 1 });
  });

  it("should count view correctly", () => {
    const str = loadFile("repeated.log");
    expect(getTotalView(str)).toEqual({
      "/help_page/1": 5,
      "/contact": 4,
      "/home": 2,
      "/about/2": 3,
    });
  });

  it("should count view correctly for longer string", () => {
    const str = loadFile("repeated.log");
    let next = "";
    const repeatTime = 100000;

    for (let i = 0; i < repeatTime; i++) {
      next += `${str}\n`;
    }

    expect(getTotalView(next)).toEqual({
      "/help_page/1": 5 * repeatTime,
      "/contact": 4 * repeatTime,
      "/home": 2 * repeatTime,
      "/about/2": 3 * repeatTime,
    });
  });
});

//---------- getUniqueView
//string => PageViewCount
describe("getUniqueView", () => {
  it("should accept empty string and return empty object", () => {
    expect(getUniqueView("")).toEqual({});
  });

  it("should accept single line and return object", () => {
    expect(getUniqueView("/help_page/1 126.318.035.038")).toEqual({
      "/help_page/1": 1,
    });
  });

  it("should be able to handle skipped lines", () => {
    const str = loadFile("skipped.log");
    expect(getUniqueView(str)).toEqual({ "/help_page/1": 1 });
  });

  it("should be able to skip invalid lines", () => {
    const str = loadFile("invalid.log");
    expect(getUniqueView(str)).toEqual({ "/help_page/1": 1 });
  });

  it("should count view correctly", () => {
    const str = loadFile("repeated.log");
    expect(getUniqueView(str)).toEqual({
      "/help_page/1": 2,
      "/contact": 4,
      "/home": 2,
      "/about/2": 1,
    });
  });

  it("should count view correctly for longer string", () => {
    const str = loadFile("repeated.log");
    let next = "";
    for (let i = 0; i < 10000; i++) {
      next += `${str}\n`;
    }

    expect(getUniqueView(next)).toEqual({
      "/help_page/1": 2,
      "/contact": 4,
      "/home": 2,
      "/about/2": 1,
    });
  });
});
