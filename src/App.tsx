import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import { UserInputCard } from "./components/UserInputCard";
import { ResultsTable } from "./components/ResultsTable";
import { InfoSection } from "./components/InfoSection";

const App: React.FC = () => {
  const {
    users,
    results,
    showResults,
    addUser,
    handleChange,
    handleCalculate,
    handleRecalculate,
  } = useCalculator();

  if (showResults) {
    return (
      <>
        <ResultsTable results={results} onRecalculate={handleRecalculate} />
        <InfoSection />
      </>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        PNU 교환학생 점수 계산기
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <UserInputCard
            key={user.id}
            user={user}
            index={index}
            onChange={handleChange}
          />
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
