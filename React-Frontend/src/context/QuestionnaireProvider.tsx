import { createContext, useContext, useState, ReactNode } from "react";

interface Data {
  businessType: string;
  openHour: string;
  closeHour: string;
  budget: number;
  selectedAgeGroup: number[];
  ageImportance: number;
  selectedIncomeLevel: number[];
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
  answerQuestion: (question: string, answer: string | number | string[] | number[]) => void,
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
        selectedAgeGroup: [4, 65],
        ageImportance: 0,
        selectedIncomeLevel: [10000, 100000],
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
    selectedAgeGroup: [4, 65],
    ageImportance: 0,
    selectedIncomeLevel: [10000, 100000],
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

  const answerQuestion = (question: string, answer: string | number | string[] | number[]) => {
    setData((prev) => ({
      ...prev,
      [question]: answer
    }))
  } 

  const isQuestionnaireCompleted = () => {
    const answers = Object.values(data);
    const filteredAnswers = answers.filter( ans => {
      if (Array.isArray(ans)) {
        return ans.length > 0;
      }
      return ans;
    })

    
    if (filteredAnswers.length === 19) {
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
      selectedAgeGroup: [4, 65],
      ageImportance: 0,
      selectedIncomeLevel: [10000, 100000],
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
