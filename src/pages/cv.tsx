import { Content } from "@/components/Layout/Content";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import styles from "@/styles/pages/cv.module.scss";

const CurriculumPage: NextPage = () => {
  return (
    <Content>
      <NextSeo title="CV" description="Curriculum" />
      <h1>Diogo D. Moreira</h1>
      <h2>Work experience</h2>
      <div className={styles.workItem}>
        <h3>Software Developer</h3>
        <div>
          <div>Translucent Computing (Toronto, Ontario - Canada) - Remote</div>
          <div>Jun/2021 - Present</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quae consectetur incidunt nihil quod
          dolore et eos autem ratione esse optio minima rem, amet maiores repellat possimus eum. Odio, architecto.
        </p>
      </div>
      <div className={styles.workItem}>
        <h3>Professor</h3>
        <div>
          <div>Instituto Federal da Paraíba (Cajazeiras, Paraiba - Brazil) - Onsite</div>
          <div>Oct/2014 - Present</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quae consectetur incidunt nihil quod
          dolore et eos autem ratione esse optio minima rem, amet maiores repellat possimus eum. Odio, architecto.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, tempore. Nulla provident labore asperiores
          id voluptate accusamus ducimus harum magnam error eos officiis, quis unde et reprehenderit cumque recusandae
          facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, dolore tempore labore hic sed nostrum
          esse ducimus nisi reprehenderit aliquam voluptatum qui ea neque sunt provident placeat voluptate veritatis
          rem.
        </p>
      </div>
    </Content>
  );
};

export default CurriculumPage;
