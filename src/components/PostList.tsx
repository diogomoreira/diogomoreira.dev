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
          <h2 className="text-xl font-bold mb-4">{year}</h2>
          <div className="flex gap-6">
            {postsByYear[year].map(note => (
              <PostItem key={note.path} post={note} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
