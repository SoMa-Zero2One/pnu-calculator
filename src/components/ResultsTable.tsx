import React from "react";
import type { CalculationResult } from "../types";
import { LANGUAGE_TEST_NAMES } from "../constants";

interface ResultsTableProps {
  results: CalculationResult[];
  onRecalculate: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  onRecalculate,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">계산 결과</h1>
      <div className="border-b-4 border-black w-32 mx-auto mb-8"></div>

      <div className="overflow-x-auto">
        <table className="w-full border-2 border-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="border border-black px-4 py-3">사용자</th>
              <th className="border border-black px-4 py-3">
                외국어
                <br />
                (50점)
              </th>
              <th className="border border-black px-4 py-3">
                학업성적
                <br />
                (30점)
              </th>
              <th className="border border-black px-4 py-3">
                교과외활동
                <br />
                (10점)
              </th>
              <th className="border border-black px-4 py-3">
                특별가산점
                <br />
                (10점)
              </th>
              <th className="border border-black px-4 py-3">
                원어강의
                <br />
                (10점)
              </th>
              <th className="border border-black px-4 py-3">
                총점
                <br />
                (120점)
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.id} className="bg-white">
                <td className="border border-black px-4 py-3 text-center">
                  사용자 {index + 1}
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <div>{result.languageScore}점</div>
                  <div className="text-xs text-gray-600">
                    {LANGUAGE_TEST_NAMES[result.details.languageTest]}
                    {result.details.languageInput &&
                      `: ${result.details.languageInput}`}
                  </div>
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <div>{result.gradeScore}점</div>
                  <div className="text-xs text-gray-600">
                    상위 {result.details.gradePercentage}%
                  </div>
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  {result.extracurricularScore}점
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  {result.bonusScore}점
                </td>
                <td className="border border-black px-4 py-3 text-center">
                  <div>{result.originalLanguageScore}점</div>
                  <div className="text-xs text-gray-600">
                    {result.details.originalLanguageCourses}교과목
                  </div>
                </td>
                <td className="border border-black px-4 py-3 text-center font-bold">
                  {result.totalScore}점
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onRecalculate}
          className="bg-black text-white px-8 py-3 rounded-lg"
        >
          다시 계산하기
        </button>
      </div>
    </div>
  );
};
