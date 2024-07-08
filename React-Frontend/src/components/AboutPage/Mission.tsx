// Mission.tsx
import React from "react";
import { Divider } from "@mui/material";

const Mission: React.FC = () => {
  return (
    <>
      <h1
        className="text-4xl font-bold mt-40"
        style={{ fontFamily: "Alegreya" }}
      >
        Our Mission
      </h1>
      <div className="w-4/5 mb-10"></div>
      <p className="w-4/5 mb-6 mt-30">
        At Anseo, our mission is to empower entrepreneurs and businesses with
        comprehensive, data-driven insights for optimal location selection in
        New York. We strive to transform the complex process of choosing a
        business location into a strategic, informed decision. By leveraging
        advanced analytics, real-time economic data, and predictive modeling, we
        aim to provide a clear, actionable picture of New York's diverse
        business landscape. Our platform is designed to help businesses of all
        sizes identify the most promising locations that align with their
        specific needs, target demographics, and growth objectives. We are
        committed to fostering economic growth and innovation across New York by
        connecting businesses with the right communities. Through our
        user-friendly tools and in-depth analysis, we seek to minimize risk,
        maximize potential, and contribute to the vibrant, ever-evolving
        business ecosystem of New York. Anseo is dedicated to continually
        refining our methodologies and expanding our data sources to ensure we
        provide the most accurate, up-to-date, and valuable information to our
        users. We believe that when businesses thrive in the right location,
        communities flourish, and the entire state prospers. Our ultimate goal
        is to be the trusted, go-to resource for location intelligence in New
        York, helping to shape a more prosperous and strategically positioned
        business community throughout the state.
      </p>
      <Divider className="w-4/5 my-6" />
    </>
  );
};

export default Mission;
