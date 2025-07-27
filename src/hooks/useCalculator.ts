import { useState } from "react";
import type { UserInput, CalculationResult } from "../types";
import { DEFAULT_USER_INPUT } from "../constants";
import {
  convertIbtToPnuScore,
  convertIeltsToPnuScore,
  convertItpToPnuScore,
  convertToeicToPnuScore,
  convertJlptToPnuScore,
  convertHskToPnuScore,
  convertDelfToPnuScore,
  convertGoetheToPnuScore,
  convertTorflToPnuScore,
  convertDeleToPnuScore,
  convertGradePercentageToPnuScore,
} from "../utils/conversion";

export const useCalculator = () => {
  const [users, setUsers] = useState<UserInput[]>([
    {
      id: Date.now(),
      ...DEFAULT_USER_INPUT,
    },
  ]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addUser = () => {
    setUsers([
      ...users,
      {
        id: Date.now(),
        ...DEFAULT_USER_INPUT,
      },
    ]);
  };

  const handleChange = (
    id: number,
    field: keyof Omit<UserInput, "id">,
    value: string
  ) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const calculateLanguageScore = (user: UserInput): number => {
    const score = parseFloat(user.languageScore) || 0;

    switch (user.languageTest) {
      case "toefl_ibt":
        return convertIbtToPnuScore(score);
      case "ielts":
        return convertIeltsToPnuScore(score);
      case "toefl_itp":
        return convertItpToPnuScore(score);
      case "toeic":
        return convertToeicToPnuScore(score);
      case "jlpt":
        return convertJlptToPnuScore(user.languageLevel, score);
      case "hsk":
        return convertHskToPnuScore(parseInt(user.languageLevel) || 4, score);
      case "delf":
        return convertDelfToPnuScore(user.languageLevel);
      case "goethe":
        return convertGoetheToPnuScore(user.languageLevel);
      case "torfl":
        return convertTorflToPnuScore(user.languageLevel);
      case "dele":
        return convertDeleToPnuScore(user.languageLevel);
      default:
        return 0;
    }
  };

  const handleCalculate = () => {
    const calculationResults = users.map((u) => {
      const languageScore = calculateLanguageScore(u);
      const gradePercentage = parseFloat(u.gradePercentage) || 0;
      const gradeScore = convertGradePercentageToPnuScore(gradePercentage);
      const extracurricularScore = Math.min(
        Math.max(parseFloat(u.extracurricular) || 0, 0),
        10
      );
      const bonusScore = Math.min(Math.max(parseFloat(u.bonus) || 0, 0), 10);

      // 원어강의 점수 계산: 3점 * 교과목 수, 최대 10점
      const originalLanguageCourseCount =
        parseInt(u.originalLanguageCourses) || 0;
      const originalLanguageScore = Math.min(
        originalLanguageCourseCount * 3,
        10
      );

      const totalScore =
        languageScore +
        gradeScore +
        extracurricularScore +
        bonusScore +
        originalLanguageScore;

      return {
        id: u.id,
        languageScore,
        gradeScore,
        extracurricularScore,
        bonusScore,
        originalLanguageScore,
        totalScore,
        details: {
          languageTest: u.languageTest,
          languageInput: u.languageLevel
            ? `${u.languageLevel} ${u.languageScore}`
            : u.languageScore,
          gradePercentage,
          originalLanguageCourses: originalLanguageCourseCount,
        },
      };
    });

    setResults(calculationResults);
    setShowResults(true);
  };

  const handleRecalculate = () => {
    setShowResults(false);
    setResults([]);
  };

  return {
    users,
    results,
    showResults,
    addUser,
    handleChange,
    handleCalculate,
    handleRecalculate,
  };
};
