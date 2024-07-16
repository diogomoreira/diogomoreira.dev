import { serialize } from "next-mdx-remote/serialize";

import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { PageItem } from "@/lib/content";
import { Post } from "@/models/post.model";

async function mdxToHtml(data: Post | PageItem) {
  return serialize(data.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeCodeTitles, rehypePrism],
      format: "mdx",
    },
    scope: data,
  });
}

export { mdxToHtml };
