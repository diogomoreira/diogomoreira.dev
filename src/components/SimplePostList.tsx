import { Content } from "@/lib/content";
import PostItem from "./Post";

type PostListProps = {
  posts: Content[];
};

const SimplePostList: React.FC<PostListProps> = ({ posts }: PostListProps) => {
  return (
    <div className="my-6 py-2 flex flex-col">
      {posts.map((note, idx) => (
        <>
          <PostItem key={note.path} post={note} />
          {idx < posts.length - 1 && (
            <div key={note.path + "-divider"} className="w-full border-b-2 border-dashed border-base-300 my-2" />
          )}
        </>
      ))}
    </div>
  );
};

export default SimplePostList;
