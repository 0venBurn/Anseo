import { createContext, useContext, useState, ReactNode } from "react";

interface Data {
  businessType: string;
  openHour: string;
  closeHour: string;
  budget: number;
  selectedAgeGroup: string;
  ageImportance: number;
  selectedIncomeLevel: string;
  incomeImportance: number;
  targetGroup: string;
  proximityImportance: number;
  footfallImportance: number;
  surroundingBusinessesImportance: number;
  rentBudget: number;
  genderRatio: string;
  employmentStatus: string;
  homeValue: number;
  populationDensity: number;
  selectedBoroughs: string[];
  areaType: string | null;
}

interface QuestionnaireProviderProps {
  children: ReactNode;
}

interface QuestionnaireContext {
  data: Data,
  answerQuestion: (question: string, answer: string | number | string[]) => void,
  isQuestionnaireCompleted: () => boolean,
  setQuestionnaireDefault: () => void
}
const QuestionnaireContext = createContext<QuestionnaireContext>(
  {
      data: {
        businessType: "",
        openHour: "",
        closeHour: "",
        budget: 0,
        selectedAgeGroup: "",
        ageImportance: 0,
        selectedIncomeLevel: "",
        incomeImportance: 0,
        targetGroup: "",
        proximityImportance: 0,
        footfallImportance: 0,
        surroundingBusinessesImportance: 0,
        rentBudget: 0,
        genderRatio: "",
        employmentStatus: "",
        homeValue: 0,
        populationDensity: 0,
        selectedBoroughs: [],
        areaType: null,
      },
      answerQuestion: () => {},
      isQuestionnaireCompleted: () => false,
      setQuestionnaireDefault: () => {}
  }
);

const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data>({ 
    businessType: "",
    openHour: "",
    closeHour: "",
    budget: 0,
    selectedAgeGroup: "",
    ageImportance: 0,
    selectedIncomeLevel: "",
    incomeImportance: 0,
    targetGroup: "",
    proximityImportance: 0,
    footfallImportance: 0,
    surroundingBusinessesImportance: 0,
    rentBudget: 0,
    genderRatio: "",
    employmentStatus: "",
    homeValue: 0,
    populationDensity: 0,
    selectedBoroughs: [],
    areaType: null,
  })

  const answerQuestion = (question: string, answer: string | number | string[]) => {
    setData((prev) => ({
      ...prev,
      [question]: answer
    }))
  } 

  const isQuestionnaireCompleted = () => {
    const answers = Object.values(data);
    answers.filter( ans => {
      if (Array.isArray(ans)) {
        return ans.length > 0;
      }
      return ans;
    })

    if (answers.length === 19) {
      console.log("Questionnaire completed")
      return true
    } else {
      console.log("Questionnaire not completed")
      return false 
    }    
  } 

  const setQuestionnaireDefault = () => {
    setData({ 
      businessType: "",
      openHour: "",
      closeHour: "",
      budget: 0,
      selectedAgeGroup: "",
      ageImportance: 0,
      selectedIncomeLevel: "",
      incomeImportance: 0,
      targetGroup: "",
      proximityImportance: 0,
      footfallImportance: 0,
      surroundingBusinessesImportance: 0,
      rentBudget: 0,
      genderRatio: "",
      employmentStatus: "",
      homeValue: 0,
      populationDensity: 0,
      selectedBoroughs: [],
      areaType: null,
    })
  }

  return (
  <QuestionnaireContext.Provider value={{ data, answerQuestion, isQuestionnaireCompleted, setQuestionnaireDefault }}>
    {children}
    </QuestionnaireContext.Provider>
    ); 
};

export default QuestionnaireProvider;

export const useQuestionnaire = () => {
  return useContext(QuestionnaireContext);
}