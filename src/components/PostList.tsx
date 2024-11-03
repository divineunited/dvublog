import Image from "next/image";
import Link from "next/link";

const PostList = ({
  posts,
}: {
  posts: Array<{
    _id: string;
    title: string;
    summary: string;
    primaryImage?: string;
    author: {
      username: string;
    };
  }>;
}) => {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post._id} className="post-list-item">
          {post.primaryImage && (
            <Link href={`/${post.author.username}/posts/${post._id}`}>
              <div className="post-image-container">
                <Image
                  src={post.primaryImage}
                  alt={post.title}
                  className="post-image"
                  layout="fill"
                />
              </div>
            </Link>
          )}
          <Link
            href={`/${post.author.username}/posts/${post._id}`}
            className="post-link"
          >
            {post.title}
          </Link>
          <p className="post-summary">{post.summary}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
