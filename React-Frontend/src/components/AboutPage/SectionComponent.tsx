// Section.tsx
import React from "react";
import { Divider } from "@mui/material";

interface SectionProps {
  title: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ title, content }) => {
  return (
    <>
      <h2 className="text-3xl font-bold mt-10 mb-10 font">{title}</h2>
      <p className="w-4/5 mb-10 font-commissioner">{content}</p>
      <Divider className="w-4/5 my-6" />
    </>
  );
};

export default Section;
