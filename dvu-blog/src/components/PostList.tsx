import Link from "next/link";

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin: 10px 0;
        }
        a {
          text-decoration: none;
          color: blue;
        }
      `}</style>
    </ul>
  );
};

export default PostList;
