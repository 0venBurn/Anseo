import { createContext, useContext, useState, ReactNode } from "react";
import { Data } from "../utils/types";

interface QuestionnaireProviderProps {
  children: ReactNode;
}

interface QuestionnaireContext {
  data: Data;
  answerQuestion: (
    question: string,
    answer: string | number | string[] | number[],
  ) => void;
  isQuestionnaireCompleted: () => boolean;
  setQuestionnaireDefault: () => void;
  dummyData: boolean;
  sendDummyData: () => boolean;
}
const QuestionnaireContext = createContext<QuestionnaireContext>({
  data: {
    businessType: "",
    openHour: "",
    closeHour: "",
    budget: 0,
    selectedAgeGroup: [4, 65],
    ageImportance: 0,
    selectedIncomeLevel: [10000, 100000],
    incomeImportance: 0,
    targetGroup: [],
    proximityImportance: 0,
    footfallImportance: 0,
    surroundingBusinessesImportance: 0,
    rentBudget: 0,
    genderRatio: "",
    employmentStatus: [],
    populationDensity: 1,
    selectedBoroughs: [],
    areaType: [],
  },
  answerQuestion: () => {},
  isQuestionnaireCompleted: () => false,
  setQuestionnaireDefault: () => {},
  dummyData: false,
  sendDummyData: () => false,
});

const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Data>({
    businessType: "",
    openHour: "",
    closeHour: "",
    budget: 0,
    selectedAgeGroup: [4, 65],
    ageImportance: 0,
    selectedIncomeLevel: [10000, 100000],
    incomeImportance: 0,
    targetGroup: [],
    proximityImportance: 0,
    footfallImportance: 0,
    surroundingBusinessesImportance: 0,
    rentBudget: 0,
    genderRatio: "",
    employmentStatus: ["Full Time"],
    populationDensity: 1,
    selectedBoroughs: [],
    areaType: [],
  });
  const [dummyData, setDummyData] = useState<boolean>(false);

  const answerQuestion = (
    question: string,
    answer: string | number | string[] | number[],
  ) => {
    setData((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const sendDummyData = () => {
    setDummyData(true);
    return dummyData;
  };

  const isQuestionnaireCompleted = () => {
    const answers = Object.values(data);
    const filteredAnswers = answers.filter((ans) => {
      if (Array.isArray(ans)) {
        return ans.length > 0;
      }
      return ans !== null && ans !== undefined && ans !== '';
    });

    console.log("filteredAnswers", filteredAnswers);

    if (filteredAnswers.length === 18) {
      console.log("Questionnaire completed");
      return true;
    } else {
      console.log("Questionnaire not completed");
      return false;
    }
  };

  const setQuestionnaireDefault = () => {
    setData({
      businessType: "",
      openHour: "",
      closeHour: "",
      budget: 0,
      selectedAgeGroup: [4, 65],
      ageImportance: 0,
      selectedIncomeLevel: [10000, 100000],
      incomeImportance: 0,
      targetGroup: [],
      proximityImportance: 0,
      footfallImportance: 0,
      surroundingBusinessesImportance: 0,
      rentBudget: 0,
      genderRatio: "",
      employmentStatus: ["Full Time"],
      populationDensity: 1,
      selectedBoroughs: [],
      areaType: [],
    });
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        data,
        answerQuestion,
        isQuestionnaireCompleted,
        setQuestionnaireDefault,
        dummyData,
        sendDummyData,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireProvider;

export const useQuestionnaire = () => {
  return useContext(QuestionnaireContext);
};
