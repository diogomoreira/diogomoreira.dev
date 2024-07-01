import PageTitle from "@/components/PageTitle";
import { articleJsonLd, useAppConfig } from "@/config";
import { ContentPath } from "@/lib/content";
import { mdxToHtml } from "@/lib/content/markdown.api";
import { getPageByPath, getPagesSlugs } from "@/lib/content/pages.api";
import { InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";

type PageStaticProps = {
  locale: string | null;
  params: {
    page: string;
  };
};

export async function getStaticProps({ params, locale }: PageStaticProps) {
  const { page } = params;
  const pageDetails = await getPageByPath(page);
  const content = await mdxToHtml(pageDetails);
  const currentLocale = locale || "en";
  return {
    props: {
      page: pageDetails,
      content,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
  };
}

export async function getStaticPaths() {
  const pages = await getPagesSlugs();
  return {
    paths: pages.map(page => ({ params: { page } })),
    fallback: false,
  };
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ page, content }: PageProps) => {
  const { siteUrl } = useAppConfig();
  const postUrl = `${siteUrl}/${page.slug}`;

  return (
    <>
      <NextSeo title={page.title} description={page.description} />
      <ArticleJsonLd
        url={postUrl}
        title={page.title}
        description={page.description}
        datePublished={page.publishedAt}
        images={[`${siteUrl}/${page.coverImage || logo.src}`]}
        {...articleJsonLd}
      />
      <PageTitle>{page.title}</PageTitle>
      <p className="mx-auto md:px-0 mt-2 leading-loose mb-6">{page.description}</p>
      {page.coverImage && (
        <figure className="relative w-full h-96 shadow-lg">
          <Image
            className="object-cover rounded-md"
            fill
            src={`${ContentPath.PAGES_COVER_IMAGES}/${page.slug}/${page.coverImage}`}
            alt={page.title}
          />
        </figure>
      )}
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-semibold">
        <MDXRemote {...content} />
      </article>
    </>
  );
};

export default Page;
