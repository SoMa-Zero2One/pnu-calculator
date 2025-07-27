export type LanguageTest =
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

export type UserInput = {
  id: number;
  languageTest: LanguageTest;
  languageScore: string;
  languageLevel: string; // JLPT N1/N2, HSK 급수, DELF 레벨용
  gradePercentage: string; // 학업 성적 백분율
  extracurricular: string; // 교과 외 활동실적 (0-10)
  bonus: string; // 특별 가산점 (0-10)
  originalLanguageCourses: string; // 원어강의 이수 교과목 수
};

export type CalculationResult = {
  id: number;
  languageScore: number;
  gradeScore: number;
  extracurricularScore: number;
  bonusScore: number;
  originalLanguageScore: number; // 원어강의 점수
  totalScore: number;
  details: {
    languageTest: LanguageTest;
    languageInput: string;
    gradePercentage: number;
    originalLanguageCourses: number;
  };
};
