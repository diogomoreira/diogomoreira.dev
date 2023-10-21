import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "@mapbox/rehype-prism";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const remarkProcessor = unified()
  .use(remarkGfm)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypePrism)
  .use(rehypeStringify);

async function markdownToHTML(data: string) {
  return remarkProcessor.process(data).then(v => v.toString());
}

export { markdownToHTML };
