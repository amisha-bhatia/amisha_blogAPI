import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostComments, likePost, addComment, getPostById } from "../api/post.api";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [liked, setLiked] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch post details
  const fetchPost = async () => {
    try {
      setLoadingPost(true);
      const res = await getPostById(id);
      setPost(res.data.post);
      setLiked(res.data.post.likes.includes(userId));
    } catch (err) {
      console.error("Failed to fetch post", err);
    } finally {
      setLoadingPost(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await getPostComments(id);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Failed to load comments", err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  // Like/unlike post
  const handleLike = async () => {
    if (!token) return alert("You must be logged in to like a post");
    try {
      const res = await likePost(id);
      setLiked(!liked);
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
    } catch (err) {
      console.error(err);
      alert("Failed to like post");
    }
  };

  // Add comment
  const handleComment = async () => {
    if (!commentText.trim()) return;
    if (!token) return alert("You must be logged in to comment");
    try {
      await addComment(id, { content: commentText });
      setCommentText("");
      fetchComments(); // reload comments
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  if (loadingPost) return <div className="text-center mt-10 text-gray-500">Loading post...</div>;
  if (!post) return <div className="text-center mt-10 text-red-500">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow rounded">
      {/* Post header */}
      <div className="flex items-center p-4 border-b">
        <div className="font-bold">{post.author?.name || "Unknown"}</div>
      </div>

      {/* Post content */}
      <div className="p-4">
        <p className="mb-2">{post.content}</p>
        {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" className="w-full rounded" />}
      </div>

      {/* Actions: like */}
      <div className="flex items-center px-4 space-x-4">
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded font-semibold ${liked ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {liked ? "Liked" : "Like"} ({post.likes.length})
        </button>
      </div>

      {/* Comment input */}
      <div className="flex items-center gap-2 p-4 border-t">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleComment}
          className="bg-black text-white p-2 rounded flex items-center justify-center"
        >
          <span className="material-icons">send</span>
        </button>
      </div>

      {/* Comments */}
      <div className="p-4 space-y-2">
        {loadingComments && <p className="text-gray-500">Loading comments...</p>}
        {!loadingComments && comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-100 p-2 rounded">
            <b>{c.user?.name || "Anonymous"}</b>: {c.content}
          </div>
        ))}
      </div>
    </div>
  );
}
