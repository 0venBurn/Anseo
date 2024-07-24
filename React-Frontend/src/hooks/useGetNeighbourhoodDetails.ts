import { useEffect } from "react";
import { fetchAllPages } from "../utils/apiFunctions";
import { Listing, Indexes, Rankings } from "../utils/types";

const useGetNeighbourhoodDetails = (
    setIndexData: React.Dispatch<React.SetStateAction<Indexes[]>>,
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>,
    setRankingsData: React.Dispatch<React.SetStateAction<Rankings[]>>,
) => {
    const fetchIndexesData = async () => {
        try {
          const response = await fetch ("/final_index_data.json");
          const data = await response.json();
          console.log(data)
          if (Array.isArray(data)) {
            setIndexData(data);
          } else {
            throw new Error("Fetched data is not an array");
          }
        } catch (error) {
          console.error("Failed to fetch or parse indexes data:", error);
        }
      };

      const fetchRankingsData = async () => {
        try {
          const response = await fetch ("/final_index_data.json");
          const data = await response.json(); 
          console.log(data)
          // sortedRankings =
          console.log(Array.isArray(data))
          if (Array.isArray(data)) {
            setRankingsData(data);
          } else {
            throw new Error("Fetched data is not an array");
          }
        } catch (error) {
          console.error("Failed to fetch or parse rankings data:", error);
        }
      };

    useEffect(() => {
        const fetchNeighbourhoodDetails = async () => {
            try {
                const allListingsArray = await fetchAllPages("listings");
                const allListings = allListingsArray.flat().map((listing) => {
                    const id = parseInt(listing._links.self.href.split("/").pop(), 10);
                    return {
                      id,
                      listingDetails: listing.listingDetails,
                      link: listing.link,
                      imageUrl: listing.imageUrl,
                      lat: listing.lat,
                      lng: listing.lng,
                      neighbourhoodId: listing.neighbourhoodId,
                    } as Listing;
                  });
                await fetchIndexesData();
                setListings(allListings);
                await fetchRankingsData();
            } catch(error) {
                console.error(error)
            }
        }
        fetchNeighbourhoodDetails()
      }, []);
}

export default useGetNeighbourhoodDetails;