import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react'
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { fetchMLPredictions, fetchUserResultsFromDB } from '../utils/apiFunctions';
import { Predictions } from '../utils/types';
import { useNavigate } from 'react-router-dom';

const useSetQuestionnaireData = (
    setPredictions: React.Dispatch<React.SetStateAction<Predictions>>,
    setSelectedBoroughs: React.Dispatch<React.SetStateAction<string[]>>, 
) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const { data, isQuestionnaireCompleted } = useQuestionnaire();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      if (isLoaded) {
        try {
          if (isQuestionnaireCompleted()) {
            console.log("test: questionnaire completed");
            const payload = { data };
            console.log(payload)
            setSelectedBoroughs(data.selectedBoroughs);
            const predictions = await fetchMLPredictions(payload);
            console.log("predictions", predictions);
            console.log("predictions.predictions", predictions.predictions);
            setPredictions(predictions.predictions);
          }
          if (isLoaded && isSignedIn && user && !isQuestionnaireCompleted()) {
            console.log("test: signed in and questionnaire not completed");
            const dbResults = await fetchUserResultsFromDB(user.id);
            console.log("dbResults", dbResults);
            setSelectedBoroughs(dbResults.results[0].selectedBoroughs);
            setPredictions(dbResults.results[0].predictions);
          }
          if (isLoaded && !isSignedIn && !isQuestionnaireCompleted()) {
            console.log("test: not signed in and questionnaire not completed");
            navigate("/welcome");
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
