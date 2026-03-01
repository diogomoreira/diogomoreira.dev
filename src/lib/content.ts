import matter from "gray-matter";
import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export interface Content {
  slug: string;
  title: string;
  date: string;
  content: string;
  cover: string;
  tags?: string[];
  [key: string]: any;
}

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentPath: string) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  if (fs.existsSync(dir)) {
    traverse(dir);
  }

  return files;
}

export function getContentFromDirectory(directory: string): Content[] {
  const contentDir = path.join(process.cwd(), "content", directory);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = getAllMarkdownFiles(contentDir);

  const posts = files
    .map(filePath => {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent, {
        engines: {
          yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });

      // Extract slug from the full path
      // e.g., content/blog/2024/11/my-post.md -> 2024/11/my-post
      const relativePath = path.relative(contentDir, filePath);
      const slug = relativePath.replace(/\.md$/, "");

      return {
        slug,
        content,
        ...data,
      } as Content;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getContentBySlug(directory: string, slug: string): Content | null {
  try {
    const filePath = path.join(process.cwd(), "content", directory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      content,
      ...data,
    } as Content;
  } catch {
    return null;
  }
}
