import { Content } from "@/lib/content";
import PostItem from "./Post";

type PostListProps = {
  posts: Content[];
};

const PostList: React.FC<PostListProps> = ({ posts }: PostListProps) => {
  // Group posts by year
  const postsByYear = posts.reduce<Record<string, Content[]>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years descending
  const sortedYears = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="my-6 py-2">
      {sortedYears.map(year => (
        <div key={year} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          <div className="flex flex-col">
            {postsByYear[year].map((note, idx, arr) => (
              <>
                <PostItem key={note.path} post={note} />
                {idx < arr.length - 1 && (
                  <div key={note.path + "-divider"} className="w-full border-b-2 border-dashed border-base-300 my-2" />
                )}
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
