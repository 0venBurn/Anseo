import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react'
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { fetchMLPredictions, fetchUserResultsFromDB } from '../utils/apiFunctions';
import { PredictionResponse } from '../utils/types';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

const useSetQuestionnaireData = (
    setPredictions: React.Dispatch<React.SetStateAction<PredictionResponse>>,
    setSelectedBoroughs: React.Dispatch<React.SetStateAction<string[]>>, 
) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const { data, isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire();

  useEffect(() => {
    const fetchPredictions = async () => {
      if (isLoaded) {
        try {
          if (isQuestionnaireCompleted()) {
            setSelectedBoroughs(data.selectedBoroughs);
            const payload = { data };
            const predictions = await fetchMLPredictions(payload);
            setPredictions(predictions);
            setQuestionnaireDefault();
          }
          if (isSignedIn && user && !isQuestionnaireCompleted()) {
            const dbResults = await fetchUserResultsFromDB(user.id);
            setSelectedBoroughs(dbResults.results[0].results.data.selectedBoroughs);
            const predictions = await fetchMLPredictions(dbResults.results[0].results);
            setPredictions(predictions);
            setQuestionnaireDefault();
          }
        } catch (error) {
          console.error("Error fetching predictions:", error);
        }
      }
    };

    fetchPredictions();
  }, [isLoaded]);
};

export default useSetQuestionnaireData;
