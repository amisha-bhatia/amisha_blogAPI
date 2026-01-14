import { useEffect, useState } from "react";
import { getPosts } from "../api/post.api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        <div className="text-center animate-pulse text-lg">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {posts.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-12">
          No posts found.
        </p>
      )}

      {/* Instagram-style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-xl overflow-hidden bg-white shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
