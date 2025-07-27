import React from "react";
import type { UserInput } from "../types";

interface LanguageInputsProps {
  user: UserInput;
  onLanguageLevelChange: (value: string) => void;
  onLanguageScoreChange: (value: string) => void;
}

export const LanguageInputs: React.FC<LanguageInputsProps> = ({
  user,
  onLanguageLevelChange,
  onLanguageScoreChange,
}) => {
  switch (user.languageTest) {
    case "jlpt":
      return (
        <>
          <select
            value={user.languageLevel}
            onChange={(e) => onLanguageLevelChange(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
          >
            <option value="">급수 선택</option>
            <option value="N1">N1</option>
            <option value="N2">N2</option>
          </select>
          <input
            type="number"
            placeholder="점수 입력"
            value={user.languageScore}
            onChange={(e) => onLanguageScoreChange(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
          />
        </>
      );
    case "hsk":
      return (
        <>
          <select
            value={user.languageLevel}
            onChange={(e) => onLanguageLevelChange(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
          >
            <option value="">급수 선택</option>
            <option value="4">4급</option>
            <option value="5">5급</option>
            <option value="6">6급</option>
          </select>
          <input
            type="number"
            placeholder="점수 입력"
            value={user.languageScore}
            onChange={(e) => onLanguageScoreChange(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
          />
        </>
      );
    case "delf":
      return (
        <select
          value={user.languageLevel}
          onChange={(e) => onLanguageLevelChange(e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        >
          <option value="">레벨 선택</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      );
    case "goethe":
      return (
        <select
          value={user.languageLevel}
          onChange={(e) => onLanguageLevelChange(e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        >
          <option value="">레벨 선택</option>
          <option value="A2/SD2">A2/SD2</option>
          <option value="B1/ZD">B1/ZD</option>
          <option value="B2/ZDfB">B2/ZDfB</option>
          <option value="C1/ZMef">C1/ZMef</option>
          <option value="C2/ZOef">C2/ZOef</option>
        </select>
      );
    case "torfl":
      return (
        <select
          value={user.languageLevel}
          onChange={(e) => onLanguageLevelChange(e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        >
          <option value="">레벨 선택</option>
          <option value="기초~기본">기초~기본</option>
          <option value="1단계">1단계</option>
          <option value="2단계">2단계</option>
          <option value="3단계">3단계</option>
          <option value="4단계">4단계</option>
        </select>
      );
    case "dele":
      return (
        <select
          value={user.languageLevel}
          onChange={(e) => onLanguageLevelChange(e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        >
          <option value="">레벨 선택</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      );
    case "toefl_ibt":
    case "ielts":
    case "toefl_itp":
    case "toeic":
      return (
        <input
          type="number"
          step={user.languageTest === "ielts" ? "0.5" : "1"}
          placeholder="점수 입력"
          value={user.languageScore}
          onChange={(e) => onLanguageScoreChange(e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        />
      );
    default:
      return null;
  }
};
