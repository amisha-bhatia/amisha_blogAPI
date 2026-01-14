import { useAuth } from "../context/AuthContext";

export default function Comment({ comment, onDelete }) {
  const { user } = useAuth();
  const canDelete = user && (user._id === comment.user._id || user.role === "admin");

  return (
    <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-start gap-4 shadow hover:shadow-md transition mt-4">
      <div>
        <p className="font-semibold text-gray-800">{comment.user.name}</p>
        <p className="text-gray-700 mt-1">{comment.content}</p>
      </div>

      {canDelete && (
        <button
          onClick={() => onDelete(comment._id)}
          className="text-red-500 hover:text-red-700 font-medium transition"
        >
          Delete
        </button>
      )}
    </div>
  );
}
