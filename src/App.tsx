import React, { useState } from "react";

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
} from "./utils/conversion";

type LanguageTest =
  | "none"
  | "toefl_ibt"
  | "ielts"
  | "toefl_itp"
  | "toeic"
  | "jlpt"
  | "hsk"
  | "delf"
  | "goethe"
  | "torfl"
  | "dele";

type UserInput = {
  id: number;
  languageTest: LanguageTest;
  languageScore: string;
  languageLevel: string; // JLPT N1/N2, HSK 급수, DELF 레벨용
  gradePercentage: string; // 학업 성적 백분율
  extracurricular: string; // 교과 외 활동실적 (0-10)
  bonus: string; // 특별 가산점 (0-10)
};

type CalculationResult = {
  id: number;
  languageScore: number;
  gradeScore: number;
  extracurricularScore: number;
  bonusScore: number;
  totalScore: number;
  details: {
    languageTest: LanguageTest;
    languageInput: string;
    gradePercentage: number;
  };
};

const App: React.FC = () => {
  const [users, setUsers] = useState<UserInput[]>([
    {
      id: Date.now(),
      languageTest: "none",
      languageScore: "",
      languageLevel: "",
      gradePercentage: "",
      extracurricular: "",
      bonus: "",
    },
  ]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addUser = () => {
    setUsers([
      ...users,
      {
        id: Date.now(),
        languageTest: "none",
        languageScore: "",
        languageLevel: "",
        gradePercentage: "",
        extracurricular: "",
        bonus: "",
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

      const totalScore =
        languageScore + gradeScore + extracurricularScore + bonusScore;

      return {
        id: u.id,
        languageScore,
        gradeScore,
        extracurricularScore,
        bonusScore,
        totalScore,
        details: {
          languageTest: u.languageTest,
          languageInput: u.languageLevel
            ? `${u.languageLevel} ${u.languageScore}`
            : u.languageScore,
          gradePercentage,
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

  const getLanguageTestName = (test: LanguageTest): string => {
    const names = {
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
    return names[test];
  };

  const renderLanguageInputs = (user: UserInput) => {
    switch (user.languageTest) {
      case "jlpt":
        return (
          <>
            <select
              value={user.languageLevel}
              onChange={(e) =>
                handleChange(user.id, "languageLevel", e.target.value)
              }
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
              onChange={(e) =>
                handleChange(user.id, "languageScore", e.target.value)
              }
              className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
            />
          </>
        );
      case "hsk":
        return (
          <>
            <select
              value={user.languageLevel}
              onChange={(e) =>
                handleChange(user.id, "languageLevel", e.target.value)
              }
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
              onChange={(e) =>
                handleChange(user.id, "languageScore", e.target.value)
              }
              className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
            />
          </>
        );
      case "delf":
        return (
          <select
            value={user.languageLevel}
            onChange={(e) =>
              handleChange(user.id, "languageLevel", e.target.value)
            }
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
            onChange={(e) =>
              handleChange(user.id, "languageLevel", e.target.value)
            }
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
            onChange={(e) =>
              handleChange(user.id, "languageLevel", e.target.value)
            }
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
            onChange={(e) =>
              handleChange(user.id, "languageLevel", e.target.value)
            }
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
            onChange={(e) =>
              handleChange(user.id, "languageScore", e.target.value)
            }
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
          />
        );
      default:
        return null;
    }
  };

  if (showResults) {
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
                  (60점)
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
                  총점
                  <br />
                  (110점)
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
                      {getLanguageTestName(result.details.languageTest)}
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
            onClick={handleRecalculate}
            className="bg-black text-white px-8 py-3 rounded-lg"
          >
            다시 계산하기
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-700">
          <p className="font-semibold mb-4">안내 사항:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>총점은 110점으로 하며, 평가학목 및 배점 등 다음과 같음.</li>
            <li>
              평가학목 및 배점: 외국어 준비도 60점, 학업성적 30점, 교과 외
              활동실적 10점, 특별 가산점 10점
            </li>
            <li>
              <strong>교과 외 활동실적 (최대 10점):</strong>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>PNU Buddy: 3점 (국제처 주관)</li>
                <li>i PNU 토플 특강, 한국어능보대사: 1점 (언어교육원 주관)</li>
                <li>한국어도우미, CLS 프로그램 클메이트 등 기타 활동</li>
              </ul>
            </li>
            <li>
              <strong>원어강의 이수 교과목 수:</strong> 이수한 원어강의 1
              교과목당 3점 (지원언어 무관, 최대 10점). 단, 실용영어 글로벌 영어,
              타 대학 취득 학점 제외
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        PNU 교환학생 점수 계산기
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u, idx) => (
          <div
            key={u.id}
            className="border-2 border-black rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">사용자 {idx + 1}</h2>

            {/* 외국어 시험 선택 */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                외국어 시험 (60점)
              </label>
              <select
                value={u.languageTest}
                onChange={(e) =>
                  handleChange(
                    u.id,
                    "languageTest",
                    e.target.value as LanguageTest
                  )
                }
                className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
              >
                <option value="none">선택 안함</option>
                <option value="toefl_ibt">TOEFL IBT</option>
                <option value="ielts">IELTS</option>
                <option value="toefl_itp">TOEFL ITP</option>
                <option value="toeic">TOEIC</option>
                <option value="jlpt">JLPT (일본어)</option>
                <option value="hsk">HSK (중국어)</option>
                <option value="delf">DELF (프랑스어)</option>
                <option value="goethe">Goethe (독일어)</option>
                <option value="torfl">TORFL (러시아어)</option>
                <option value="dele">DELE (스페인어)</option>
              </select>
              {renderLanguageInputs(u)}
            </div>

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
                value={u.gradePercentage}
                onChange={(e) =>
                  handleChange(u.id, "gradePercentage", e.target.value)
                }
                className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
              />
              <small className="text-gray-600">0%가 1등, 100%가 꼴등</small>
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
                value={u.extracurricular}
                onChange={(e) =>
                  handleChange(u.id, "extracurricular", e.target.value)
                }
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
                value={u.bonus}
                onChange={(e) => handleChange(u.id, "bonus", e.target.value)}
                className="w-full mb-3 border border-gray-400 rounded px-3 py-2"
              />
            </div>
          </div>
        ))}

        {/* 사용자 추가 카드 */}
        <div
          onClick={addUser}
          className="border-2 border-dashed border-black rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 min-h-[400px]"
        >
          <span className="text-5xl font-bold">+</span>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleCalculate}
          className="bg-black text-white px-8 py-3 rounded-lg"
        >
          계산하기
        </button>
      </div>
    </div>
  );
};

export default App;
