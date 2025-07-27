import type { LanguageTest } from "../types";

export const LANGUAGE_TEST_NAMES: Record<LanguageTest, string> = {
  none: "선택 안함",
  toefl_ibt: "TOEFL IBT",
  ielts: "IELTS",
  toefl_itp: "TOEFL ITP",
  toeic: "TOEIC",
  jlpt: "JLPT",
  hsk: "HSK",
  delf: "DELF",
  goethe: "Goethe",
  torfl: "TORFL",
  dele: "DELE",
};

export const LANGUAGE_TEST_OPTIONS = [
  { value: "none", label: "선택 안함" },
  { value: "toefl_ibt", label: "TOEFL IBT" },
  { value: "ielts", label: "IELTS" },
  { value: "toefl_itp", label: "TOEFL ITP" },
  { value: "toeic", label: "TOEIC" },
  { value: "jlpt", label: "JLPT (일본어)" },
  { value: "hsk", label: "HSK (중국어)" },
  { value: "delf", label: "DELF (프랑스어)" },
  { value: "goethe", label: "Goethe (독일어)" },
  { value: "torfl", label: "TORFL (러시아어)" },
  { value: "dele", label: "DELE (스페인어)" },
];

export const DEFAULT_USER_INPUT = {
  languageTest: "none" as LanguageTest,
  languageScore: "",
  languageLevel: "",
  gradePercentage: "",
  extracurricular: "",
  bonus: "",
  originalLanguageCourses: "",
};
