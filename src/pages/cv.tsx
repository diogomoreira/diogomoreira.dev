import { Content } from "@/components/Layout/Content";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const CurriculumPage: NextPage = () => {
  return (
    <Content>
      <NextSeo title="CV" description="Curriculum" />
      <h1>CV</h1>
      <p>Work in progress...</p>
    </Content>
  );
};

export default CurriculumPage;
