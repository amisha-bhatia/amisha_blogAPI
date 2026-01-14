import { Link } from "react-router-dom";

export default function PostCard({ post }) {

  const BASE_URL = "http://localhost:5000/uploads";
  const imageUrl = post.image ? `${BASE_URL}/${encodeURIComponent(post.image)}` : null;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* IMAGE */}
      {imageUrl ? (
        <div className="w-full h-72 sm:h-96 md:h-96 lg:h-[28rem] overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-72 sm:h-96 md:h-96 lg:h-[28rem] bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}

      {/* CONTENT */}
      <div className="p-4 sm:p-6">
        <h2 className="font-extrabold text-xl sm:text-2xl text-gray-900">
          {post.title}
        </h2>
        <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
        <Link
          to={`/post/${post._id}`}
          className="inline-block mt-3 text-blue-500 font-semibold hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
