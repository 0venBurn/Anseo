import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Typography, Box, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

// Register all necessary Chart.js components at once
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
);
interface Listing {
  id: number;
  listingDetails: string;
  link: string;
  imageUrl: string;
  lat: string;
  lng: string;
  neighbourhoodId: number;
}

interface Rankings {
  neighbourhood_id: number;
  population_density_Rank: number;
  index_percPop_0_5_Rank: number;
  index_percPop_6_11_Rank: number;
  index_percPop_12_17_Rank: number;
  male_index_Rank: number;
  female_index_Rank: number;
  Normalized_Employment_Health_Index_Rank: number;
  Annual_Earnings_Index_Rank: number;
  Housing_Affordability_Index_Rank: number;
  Safety_Index_Rank: number;
  age_evenness_index_Rank: number;
  gender_diversity_index_Rank: number;
  business_index_Rank: number;
}

interface Indexes {
  neighbourhood_id: number;
  population_density: number;
  index_percPop_0_5: number;
  index_percPop_6_11: number;
  index_percPop_12_17: number;
  male_index: number;
  female_index: number;
  Normalized_Employment_Health_Index: number;
  Annual_Earnings_Index: number;
  Housing_Affordability_Index: number;
  Safety_Index: number;
  age_evenness_index: number;
  gender_diversity_index: number;
  business_index: number;
}

interface LocationDetailsProps {
  location: {
    name: string;
    borough: string;
    description: string;
    rating: number;
  };
  listings: Listing[];
  rankings: Rankings | undefined;
  indexes: Indexes | undefined;
  isMobile: boolean;
  isClosing: boolean;
  onClose: () => void;
  onListingClick: (listing: Listing) => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  location,
  listings,
  rankings,
  indexes,
  isMobile,
  isClosing,
  onClose,
  onListingClick,
}) => {
  // calculate rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FFD700" }} />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" style={{ color: "#FFD700" }} />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorderIcon key={`empty-${i}`} style={{ color: "#FFD700" }} />,
      );
    }

    return stars;
  };

  const demographicData = {
    labels: [
      "Population Density",
      "Young People",
      "Middle Aged People",
      "Older People",
      "Male Index",
      "Female Index",
      "Age Diversity",
      "Gender Diversity",
    ],
    datasets: [
      {
        label: "Demographic Rankings",
        data: rankings
          ? [
              rankings.population_density_Rank,
              rankings.index_percPop_0_5_Rank,
              rankings.index_percPop_6_11_Rank,
              rankings.index_percPop_12_17_Rank,
              rankings.male_index_Rank,
              rankings.female_index_Rank,
              rankings.age_evenness_index_Rank,
              rankings.gender_diversity_index_Rank,
            ]
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const economicData = {
    labels: [
      "Employment Health",
      "Annual Earnings",
      "Housing Affordability",
      "Safety",
      "Business Index",
    ],
    datasets: [
      {
        label: "Economic and Social Rankings",
        data: rankings
          ? [
              rankings.Normalized_Employment_Health_Index_Rank,
              rankings.Annual_Earnings_Index_Rank,
              rankings.Housing_Affordability_Index_Rank,
              rankings.Safety_Index_Rank,
              rankings.business_index_Rank,
            ]
          : [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const demographicRadarData = {
    labels: [
      "Population Density",
      "Young People",
      "Middle Aged People",
      "Older People",
      "Male Index",
      "Female Index",
      "Age Diversity",
      "Gender Diversity",
    ],
    datasets: [
      {
        label: "Demographic Indexes",
        data: indexes
          ? [
              indexes.population_density,
              indexes.index_percPop_0_5,
              indexes.index_percPop_6_11,
              indexes.index_percPop_12_17,
              indexes.male_index,
              indexes.female_index,
              indexes.age_evenness_index,
              indexes.gender_diversity_index,
            ]
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const economicRadarData = {
    labels: [
      "Employment Health",
      "Annual Earnings",
      "Housing Affordability",
      "Safety",
      "Business Index",
    ],
    datasets: [
      {
        label: "Economic and Social Indexes",
        data: indexes
          ? [
              indexes.Normalized_Employment_Health_Index,
              indexes.Annual_Earnings_Index,
              indexes.Housing_Affordability_Index,
              indexes.Safety_Index,
              indexes.business_index,
            ]
          : [],
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={isMobile ? { y: "100%" } : { x: "-100%" }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.5 }}
          className={`fixed ${isMobile ? "left-0 w-full h-1/2 bottom-0" : "top-[76px] left-0 w-1/2 h-[calc(100%-76px)]"} bg-white shadow-lg p-6 z-50 overflow-y-auto`}
        >
          <div className="flex justify-end">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h4" component="h2" gutterBottom>
            {location.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {location.borough}
          </Typography>
          <Box display="flex" alignItems="center" mt={1} mb={2}>
            <Typography variant="body2" style={{ marginRight: 4 }}>
              {location.rating.toFixed(2)}
            </Typography>
            {/* render rating */}
            {renderStars(location.rating)}
          </Box>
          <Typography variant="body1" paragraph>
            {location.description}
          </Typography>
          <Typography variant="body2" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
            ullamcorper morbi tincidunt ornare. Est placerat in egestas erat
            imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque
            viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed
            augue lacus viverra vitae congue. Consectetur lorem donec massa
            sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh
            sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at
            volutpat diam ut.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Why this location?
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Demographic Rankings
          </Typography>
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Bar
                data={demographicData}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <Radar
                data={demographicRadarData}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
          </Box>

          {/* Economic and Social Rankings with Radar Chart */}
          <Typography variant="h5" component="h3" gutterBottom>
            Economic and Social Rankings
          </Typography>
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Bar
                data={economicData}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <Radar
                data={economicRadarData}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
          </Box>

          <Typography variant="h5" component="h3" gutterBottom>
            Available listings
          </Typography>
          {listings.length > 0 ? (
            <Box display="flex" overflow="auto">
              <Grid
                container
                spacing={2}
                style={{ flexWrap: "nowrap", overflowX: "auto" }}
              >
                {listings.map((listing) => (
                  <Grid
                    item
                    key={listing.id}
                    style={{
                      minWidth: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <img
                        src={listing.imageUrl}
                        alt={listing.listingDetails}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                        onClick={() => onListingClick(listing)} // Add onClick callback
                      />
                      <Typography
                        variant="body2"
                        align="center"
                        style={{ marginTop: "8px" }}
                      >
                        {listing.listingDetails}
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => window.open(listing.link, "_blank")}
                      style={{ marginTop: "auto" }}
                    >
                      View Listing
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography variant="body2">
              {" "}
              Currently no listings available
            </Typography>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationDetails;

