import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
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

interface AppStateContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const initialState: AppState = {
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
};

const AppStateContext = createContext<AppStateContextProps | undefined>(
  undefined,
);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextProps => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
