import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold text-xl">{post.title}</h2>
      <p className="text-gray-600">{post.content}</p>
      <Link
        to={`/post/${post._id}`}
        className="text-primary mt-2 inline-block"
      >
        Read more →
      </Link>
    </div>
  );
}