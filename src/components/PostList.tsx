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
  }>;
}) => {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post._id} className="post-list-item">
          {post.primaryImage && (
            <Link href={`/posts/${post._id}`}>
              <Image
                src={post.primaryImage}
                alt={post.title}
                className="post-image"
                layout="responsive"
                width={500}
                height={300}
              />
            </Link>
          )}
          <Link href={`/posts/${post._id}`} className="post-link">
            {post.title}
          </Link>
          <p>{post.summary}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
