/**
 * TOEFL IBT 점수를 PNU 외국어 점수로 변환
 * @param ibtScore TOEFL IBT 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertIbtToPnuScore(ibtScore: number): number {
  if (ibtScore >= 96) return 50;
  if (ibtScore >= 91) return 45;
  if (ibtScore >= 86) return 40;
  if (ibtScore >= 81) return 35;
  if (ibtScore >= 76) return 30;
  if (ibtScore >= 71) return 25;
  if (ibtScore >= 66) return 20;
  if (ibtScore >= 61) return 15;
  if (ibtScore >= 0) return 10;
  return 0;
}

/**
 * IELTS 점수를 PNU 외국어 점수로 변환
 * @param ieltsScore IELTS 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertIeltsToPnuScore(ieltsScore: number): number {
  if (ieltsScore >= 7.5) return 50;
  if (ieltsScore >= 7.0) return 45;
  if (ieltsScore >= 6.5) return 40;
  if (ieltsScore >= 6.0) return 35;
  if (ieltsScore >= 5.5) return 30;
  if (ieltsScore >= 5.0) return 25;
  if (ieltsScore >= 4.5) return 20;
  if (ieltsScore >= 0) return 10;
  return 0;
}

/**
 * TOEFL ITP 점수를 PNU 외국어 점수로 변환
 * @param itpScore TOEFL ITP 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertItpToPnuScore(itpScore: number): number {
  if (itpScore >= 597) return 45;
  if (itpScore >= 580) return 40;
  if (itpScore >= 567) return 35;
  if (itpScore >= 553) return 30;
  if (itpScore >= 547) return 25;
  if (itpScore >= 533) return 20;
  if (itpScore >= 520) return 15;
  if (itpScore >= 503) return 10;
  return 0;
}

/**
 * TOEIC 점수를 PNU 외국어 점수로 변환
 * @param toeicScore TOEIC 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertToeicToPnuScore(toeicScore: number): number {
  if (toeicScore >= 950) return 40;
  if (toeicScore >= 900) return 35;
  if (toeicScore >= 850) return 30;
  if (toeicScore >= 800) return 25;
  if (toeicScore >= 750) return 20;
  if (toeicScore >= 700) return 15;
  if (toeicScore >= 650) return 10;
  return 0;
}

/**
 * JLPT 점수를 PNU 외국어 점수로 변환
 * @param level JLPT 급수 ("N1" | "N2")
 * @param score JLPT 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertJlptToPnuScore(level: string, score: number): number {
  if (level === "N1") {
    if (score >= 161) return 50;
    if (score >= 131) return 40;
    if (score >= 100) return 30;
  } else if (level === "N2") {
    if (score >= 146) return 20;
    if (score >= 90) return 10;
  }
  return 0;
}

/**
 * HSK 점수를 PNU 외국어 점수로 변환
 * @param level HSK 급수 (4, 5, 6)
 * @param score HSK 점수
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertHskToPnuScore(level: number, score: number): number {
  if (level === 6) return 50;
  if (level === 5) return 40;
  if (level === 4) {
    if (score >= 261) return 30;
    if (score >= 221) return 20;
    if (score >= 180) return 10;
  }
  return 0;
}

/**
 * DELF 점수를 PNU 외국어 점수로 변환
 * @param level DELF 레벨 ("A2" | "B1" | "B2" | "C1" | "C2")
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertDelfToPnuScore(level: string): number {
  const levelScores: { [key: string]: number } = {
    C2: 50,
    C1: 40,
    B2: 30,
    B1: 20,
    A2: 10,
  };
  return levelScores[level] || 0;
}

/**
 * 학업 성적 백분율을 PNU 학업 점수로 변환
 * @param percentage 백분율 (0-100, 0%가 1등, 100%가 꼴등)
 * @returns PNU 학업 점수 (0-30점)
 */
export function convertGradePercentageToPnuScore(percentage: number): number {
  if (percentage < 0 || percentage > 100) return 0;
  if (percentage >= 60) return 0; // 60% 이상은 모두 0점
  // 0%가 30점, 60%가 0점으로 선형 감소
  return Math.round(30 * (1 - percentage / 60));
}

/**
 * Goethe 점수를 PNU 외국어 점수로 변환
 * @param level Goethe 레벨 ("A2/SD2" | "B1/ZD" | "B2/ZDfB" | "C1/ZMef" | "C2/ZOef")
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertGoetheToPnuScore(level: string): number {
  const levelScores: { [key: string]: number } = {
    "C2/ZOef": 50,
    "C1/ZMef": 40,
    "B2/ZDfB": 30,
    "B1/ZD": 20,
    "A2/SD2": 10,
  };
  return levelScores[level] || 0;
}

/**
 * TORFL 점수를 PNU 외국어 점수로 변환
 * @param level TORFL 레벨 ("기초~기본" | "1단계" | "2단계" | "3단계" | "4단계")
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertTorflToPnuScore(level: string): number {
  const levelScores: { [key: string]: number } = {
    "4단계": 50,
    "3단계": 40,
    "2단계": 30,
    "1단계": 20,
    "기초~기본": 10,
  };
  return levelScores[level] || 0;
}

/**
 * DELE 점수를 PNU 외국어 점수로 변환
 * @param level DELE 레벨 ("A2" | "B1" | "B2" | "C1" | "C2")
 * @returns PNU 외국어 점수 (0-60점)
 */
export function convertDeleToPnuScore(level: string): number {
  const levelScores: { [key: string]: number } = {
    C2: 50,
    C1: 40,
    B2: 30,
    B1: 20,
    A2: 10,
  };
  return levelScores[level] || 0;
}
