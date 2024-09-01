import Link from "next/link";

const PostList = ({
  posts,
}: {
  posts: Array<{ _id: string; title: string }>;
}) => {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post._id} className="post-list-item">
          <Link href={`/${post._id}`} className="post-link">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
