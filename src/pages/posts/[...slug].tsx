import Comments from "@/components/Comments";
import { HashTag, Tags } from "@/components/Tag";
import { appConfig } from "@/config/app.config";
import { articleJsonLd } from "@/config/seo.config";
import { Content, getContentBySlug, getContentFromDirectory } from "@/lib/content";
import { parseMarkdown } from "@/lib/markdown.api";
import { differenceInDays } from "date-fns";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";
import { v4 as uuid } from "uuid";

export const getStaticPaths = async () => {
  const posts = getContentFromDirectory("posts");
  const paths = posts.map((post: Content) => ({
    params: { slug: post.slug.split("/") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params, locale = "en" } = context;
  const slug = Array.isArray(params?.slug) ? params?.slug.join("/") : (params?.slug as string);

  const article = getContentBySlug("posts", slug);

  if (!article) {
    return { notFound: true };
  }

  article.date = new Date(article.date).toISOString();
  const content = await parseMarkdown(article.content);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      article,
      content,
    },
  };
};

type ArticlePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ArticlePage: NextPage<ArticlePageProps> = ({ article, content }: ArticlePageProps) => {
  const { siteUrl, author } = appConfig;
  const { t } = useTranslation();
  const articleUrl = `${siteUrl}/blog/${article.path}`;
  const articleDate = new Date(article.date);
  const articleCover = article.cover;

  return (
    <>
      <NextSeo title={article.title} description={article.description} additionalMetaTags={author.metaTags} />
      <ArticleJsonLd
        url={articleUrl}
        title={article.title}
        description={article.description}
        datePublished={article.date}
        images={[`${siteUrl}/${article.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <h1 className="text-4xl text-center md:text-left mb-6 font-bold">{article.title}</h1>
      <p className="text-center italic text-spring-wood-500 mb-4 dark:text-gray-300">{article.description}</p>
      <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start mb-4 items-center text-sm text-spring-wood-700 dark:text-gray-200">
        <time className="flex gap-6">
          <span>
            {t("{{val, datetime}}", {
              val: articleDate,
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </span>
          <span>
            (
            {t("{{val, relativetime}}", {
              val: differenceInDays(articleDate, new Date()),
            })}
            )
          </span>
        </time>
        <Tags>
          {article.tags.map((tag: string) => (
            <HashTag key={uuid()}>{tag}</HashTag>
          ))}
        </Tags>
      </div>
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-semibold">
        {article.cover && (
          <figure className="relative w-full border-4 rounded-lg shadow-lg border-spring-wood-200/50 dark:border-neutral-800/50 overflow-hidden">
            <Image className="object-cover" width={1920} height={1080} src={articleCover} alt={article.title} />
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <aside className="mt-8">
          <Comments />
        </aside>
      </article>
    </>
  );
};

export default ArticlePage;
