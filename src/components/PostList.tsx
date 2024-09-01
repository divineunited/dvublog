import Link from "next/link";

const PostList = ({
  posts,
}: {
  posts: Array<{ _id: string; title: string }>;
}) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link href={`/${post._id}`}>{post.title}</Link>
        </li>
      ))}
      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
          max-width: 600px;
          margin: 0 auto;
        }
        li {
          margin: 16px 0;
          transition: transform 0.2s ease-in-out;
        }
        li:hover {
          transform: translateX(5px);
        }
        a {
          text-decoration: none;
          color: #3498db;
          font-size: 18px;
          font-weight: 500;
          display: block;
          padding: 12px;
          border-radius: 8px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease-in-out,
            box-shadow 0.2s ease-in-out;
        }
        a:hover {
          background-color: #e9ecef;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </ul>
  );
};

export default PostList;
