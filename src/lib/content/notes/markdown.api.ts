import { serialize } from "next-mdx-remote/serialize";

import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { NoteItem } from "@/lib/content";

async function mdxToHtml(data: NoteItem) {
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
