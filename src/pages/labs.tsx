import LabItemDisplay from "@/components/LabItemDisplay";
import { LabItem, getLabProjects } from "@/lib/content";
import { ColumnCountBreakpoints } from "@/utils/masonry.columns";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";

type LabsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LabsPage: NextPage<LabsPageProps> = ({ items }: LabsPageProps) => {
  return (
    <div>
      <NextSeo title="Labs" description="Some projects i've been working on" />
      <h1>💻 Labs</h1>
      <p>
        I wanted to share some of my side projects that I&apos;ve been working on as hobbies outside of my regular job.
        These projects allow me to explore my interests and learn new skills while also having fun and being creative.
      </p>
      <ResponsiveMasonry columnsCountBreakPoints={ColumnCountBreakpoints}>
        <Masonry gutter="1rem">
          {items.map(item => (
            <LabItemDisplay key={uuidv4()} item={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ items: LabItem[] }> = async ({ locale }) => {
  const items = getLabProjects();
  return {
    props: {
      items,
      ...(await serverSideTranslations(locale || "en", ["labs"])),
    },
  };
};

export default LabsPage;
