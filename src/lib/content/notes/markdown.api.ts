import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "@mapbox/rehype-prism";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

const unifiedProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeStringify);

async function markdownToHTML(data: string) {
  return unifiedProcessor.process(data).then(v => v.toString());
}

export { markdownToHTML };
