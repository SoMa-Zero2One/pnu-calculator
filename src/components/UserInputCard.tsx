import React from "react";
import type { UserInput, LanguageTest } from "../types";
import { LANGUAGE_TEST_OPTIONS } from "../constants";
import { LanguageInputs } from "./LanguageInputs";

interface UserInputCardProps {
  user: UserInput;
  index: number;
  onChange: (
    id: number,
    field: keyof Omit<UserInput, "id">,
    value: string
  ) => void;
}

export const UserInputCard: React.FC<UserInputCardProps> = ({
  user,
  index,
  onChange,
}) => {
  return (
    <div className="border-2 border-black rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">사용자 {index + 1}</h2>

      {/* 학업 성적 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          학업 성적 백분율 (30점)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="100"
          placeholder="상위 몇 % (예: 10)"
          value={user.gradePercentage}
          onChange={(e) => onChange(user.id, "gradePercentage", e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        />
        <small className="text-gray-600">0%가 1등, 100%가 꼴등</small>
      </div>

      {/* 외국어 시험 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          외국어 시험 (50점)
        </label>
        <select
          value={user.languageTest}
          onChange={(e) =>
            onChange(user.id, "languageTest", e.target.value as LanguageTest)
          }
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        >
          {LANGUAGE_TEST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <LanguageInputs
          user={user}
          onLanguageLevelChange={(value) =>
            onChange(user.id, "languageLevel", value)
          }
          onLanguageScoreChange={(value) =>
            onChange(user.id, "languageScore", value)
          }
        />
      </div>

      {/* 원어강의 이수 교과목 수 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          원어강의 이수 교과목 수 (10점)
        </label>
        <input
          type="number"
          min="0"
          max="10"
          placeholder="교과목 수"
          value={user.originalLanguageCourses}
          onChange={(e) =>
            onChange(user.id, "originalLanguageCourses", e.target.value)
          }
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        />
        <small className="text-gray-600">1교과목당 3점, 최대 10점</small>
      </div>

      {/* 교과 외 활동실적 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          교과 외 활동실적 (10점)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="0~10점"
          value={user.extracurricular}
          onChange={(e) => onChange(user.id, "extracurricular", e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        />
      </div>

      {/* 특별 가산점 */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          특별 가산점 (10점)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="0~10점"
          value={user.bonus}
          onChange={(e) => onChange(user.id, "bonus", e.target.value)}
          className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
        />
      </div>
    </div>
  );
};
