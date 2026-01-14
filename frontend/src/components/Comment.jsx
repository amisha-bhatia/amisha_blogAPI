import { useAuth } from "../context/AuthContext";

export default function Comment({ comment, onDelete }) {
  const { user } = useAuth();

  const canDelete =
    user &&
    (user._id === comment.user._id || user.role === "admin");

  return (
    <div className="bg-gray-100 p-3 rounded flex justify-between">
      <div>
        <p className="font-semibold">{comment.user.name}</p>
        <p className="text-gray-700">{comment.content}</p>
      </div>

      {canDelete && (
        <button
          onClick={() => onDelete(comment._id)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}