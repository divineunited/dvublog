const Post = ({ post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <style jsx>{`
        article {
          padding: 20px;
          border: 1px solid #ddd;
          margin: 20px 0;
        }
      `}</style>
    </article>
  );
};

export default Post;
