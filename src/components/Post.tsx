import Image from "next/image";

interface PostProps {
  post: {
    title: string;
    content: string;
    primaryImage?: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className="post-container">
      <h1>{post.title}</h1>
      {post.primaryImage && (
        <Image
          src={post.primaryImage}
          alt={post.title}
          className="post-image"
          layout="responsive"
          width={800}
          height={450}
        />
      )}
      <p className="post-content">{post.content}</p>
    </article>
  );
};

export default Post;
