import React from "react";

export const InfoSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mt-12 text-sm text-gray-700">
        <p className="font-semibold mb-4">안내 사항:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>총점은 120점으로 하며, 평가학목 및 배점 등 다음과 같음.</li>
          <li>
            평가학목 및 배점: 외국어 준비도 50점, 학업성적 30점, 교과 외
            활동실적 10점, 특별 가산점 10점, 원어강의 이수 10점
          </li>
          <li>
            <strong>교과 외 활동실적 (최대 10점):</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>PNU Buddy: 3점 (국제처 주관)</li>
              <li>i PNU 토플 특강, 한국어능보대사: 1점 (언어교육원 주관)</li>
              <li>한국어도우미, CLS 프로그램 클메이트 등 기타 활동: 1점</li>
            </ul>
          </li>
          <li>
            <strong>원어강의 이수 교과목 수 (최대 10점):</strong> 이수한
            원어강의 1 교과목당 3점 (지원언어 무관, 최대 10점). 단, 실용영어
            글로벌 영어, 타 대학 취득 학점 제외
          </li>
        </ol>
      </div>
    </div>
  );
};
