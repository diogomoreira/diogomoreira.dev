import { useTheme } from "next-themes";
import Giscus, { GiscusProps, Repo } from "@giscus/react";
import React from "react";

const Comments = () => {
  const { theme } = useTheme();

  const giscusConfig: GiscusProps = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO as Repo,
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID as string,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY as string,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string,
    mapping: "url",
    term: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    lang: "en",
    loading: "lazy",
  };

  return (
    <>
      <Giscus {...giscusConfig} theme={theme} />
    </>
  );
};

export default Comments;
