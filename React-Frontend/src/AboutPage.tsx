// AboutPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Mission from "./components/AboutPage/Mission";
import Section from "./components/AboutPage/SectionComponent";
import Footer from "./components/AboutPage/Footer";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/700.css";
import "./index.css";

const AboutPage: React.FC = () => {
  const sections = [
    {
      title: "Data Driven Solutions",
      content:
        "At Anseo, we harness the power of comprehensive, multi-faceted data to guide your business location decisions in New York. Our platform analyzes a rich tapestry of information, from foot traffic patterns and local demographics to consumer spending habits and competitive landscapes. Whether you're opening a boutique in Brooklyn, a tech startup in Manhattan, or a manufacturing facility in Buffalo, we tailor our insights to your specific industry and goals. We examine historical performance data of similar businesses, considering factors such as optimal opening hours, peak customer times, and seasonal trends. Our algorithm processes data on local income levels, age distributions, and lifestyle preferences to help you pinpoint your ideal target customers. We also factor in zoning regulations, tax incentives, and future development plans to give you a complete picture of each location's potential. By synthesizing this diverse array of data points, Anseo empowers you to make informed decisions that maximize your chances of success, regardless of your business type or scale.",
    },
    {
      title: "Algorithmic Results",
      content:
        "At Anseo, our cutting-edge algorithms form the backbone of our location intelligence platform. We employ advanced machine learning models and artificial intelligence to process vast amounts of data from diverse sources. Our algorithms analyze complex patterns in demographic trends, economic indicators, and business performance metrics across New York's varied landscape. By leveraging techniques such as predictive modeling, cluster analysis, and neural networks, we uncover hidden correlations and insights that might escape traditional analysis. Our system continuously learns and adapts, incorporating new data and refining its predictions to improve accuracy over time. Our proprietary scoring system weighs multiple factors simultaneously, providing a nuanced evaluation of each potential location. Through this sophisticated algorithmic approach, Anseo transforms raw data into actionable intelligence, enabling you to make location decisions with unprecedented precision and confidence.",
    },
    {
      title: "Streamlined User Experience",
      content:
        "At Anseo, we've designed our platform with a focus on simplicity and efficiency, ensuring a streamlined user experience that caters to businesses of all sizes and technical expertise. Our intuitive interface guides you seamlessly through the process of finding your ideal location in New York. With just a few clicks, you can input your business type, preferences, and requirements, allowing our powerful algorithms to work their magic behind the scenes. We present complex data analyses in clear, visually appealing formats, including interactive maps, easy-to-read charts, and concise reports. Our dynamic filtering options let you refine your search in real-time, while customizable dashboards allow you to focus on the metrics that matter most to your business. We've eliminated jargon and technical complexity, translating data-driven insights into actionable recommendations. Whether you're a seasoned entrepreneur or a first-time business owner, Anseo's user-friendly platform empowers you to make informed decisions quickly and confidently, turning the daunting task of location selection into a smooth, enlightening journey.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 text-black">
      <Header />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mt-24"
        style={{ marginTop: "0px" }}
      >
        <Mission />
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            content={section.content}
          />
        ))}
      </motion.div>
      <Footer />
    </div>
  );
};

export default AboutPage;
