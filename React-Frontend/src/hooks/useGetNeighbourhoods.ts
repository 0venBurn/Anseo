import { useEffect } from "react";
import { fetchAllPages } from "../utils/apiFunctions";
import { Neighbourhood, Predictions } from "../utils/types";

const useGetNeighbourhoods = (
    predictions: Predictions,
    selectedBoroughs: string[],
    setNeighbourhoods: React.Dispatch<React.SetStateAction<Neighbourhood[]>>,
) => {
    useEffect(() => {
        const fetchNeighbourhoods = async () => {
            try {
                const allNeighbourhoodsArray = await fetchAllPages("neighbourhoods");
                const allNeighbourhoods = allNeighbourhoodsArray.flat().map((location) => {
                    const neighbourhood_id = location._links.self.href.split("/").pop();
                    return {
                      name: location.name,
                      borough: location.borough,
                      description: location.description,
                      rating: 0,
                      coordinates: [-73.936, 40.686] as [number, number],
                      photoPath: `/img/neighbourhoods/${location.name}.jpg`,
                      zipcode: location.zipcode,
                      neighbourhood_id: parseInt(neighbourhood_id, 10),
                    };
                  }); 

                const filteredNeighbourhoods = selectedBoroughs.includes("No preference")
                ? allNeighbourhoods
                : allNeighbourhoods.filter((neighbourhood) =>
                    selectedBoroughs.includes(neighbourhood.borough),
                    );        
                // normalize the value
                const predictionValues: number[] = Object.values(predictions || {});
                const minPrediction = Math.min(...predictionValues);
                const maxPrediction = Math.max(...predictionValues);

                const neighbourhoodsWithPredictionScores = filteredNeighbourhoods
                    .map((neighbourhood) => {
                        const normalizedValue =
                            predictions[neighbourhood.zipcode] !== undefined
                            ? (predictions[neighbourhood.zipcode] - minPrediction) /
                                (maxPrediction - minPrediction)
                            : 0;
                        return { ...neighbourhood, rating: normalizedValue * 5 };
                    })
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 10);

                    
                setNeighbourhoods(neighbourhoodsWithPredictionScores);
            } catch(error) {
                console.error(error)
            }
        }
        if (predictions) {
            fetchNeighbourhoods();
        }
    }, [selectedBoroughs, predictions]);
}

export default useGetNeighbourhoods;