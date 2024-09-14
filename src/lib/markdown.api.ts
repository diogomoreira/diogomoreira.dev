import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { Marked } from "marked";
import { getSingletonHighlighter } from "shiki";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedShiki from "marked-shiki";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const highlighter = await getSingletonHighlighter({
  langs: ["md", "js", "java", "python", "typescript", "bash"],
  themes: ["vesper"],
});

const marked = new Marked()
  .use({ gfm: true })
  .use(
    gfmHeadingId({
      prefix: "h-",
    }),
  )
  .use(
    markedShiki({
      highlight(code, lang, props) {
        return highlighter.codeToHtml(code, {
          lang,
          theme: "vesper",
          meta: { __raw: props.join(" ") },
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerNotationFocus(),
            transformerNotationErrorLevel(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
          ],
        });
      },
    }),
  );

async function parse(data: string) {
  const parsedHtml = await marked.parse(data);
  const clean = DOMPurify.sanitize(parsedHtml);
  return clean;
}

export { parse as parseMarkdown };
