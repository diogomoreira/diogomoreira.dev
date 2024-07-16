import { getAllPosts, getPostsSlugs } from "./api";

describe("first", () => {
  test("should first", async () => {
    const slugs = await getPostsSlugs();
    console.log(slugs);
    expect(slugs).toBeDefined();
  });
});
