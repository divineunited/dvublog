interface PostProps {
  post: {
    title: string;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className="post-container">
      <h1>{post.title}</h1>
      <p className="post-content">{post.content}</p>
    </article>
  );
};

export default Post;
