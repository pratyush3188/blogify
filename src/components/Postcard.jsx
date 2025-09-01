import { Link } from "react-router-dom";

function PostCard({ $id, title, featureImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featureImage ? (
            <img
              src={appwriteService.getFilePreview(featureImage)}
              alt={title}
              className="rounded-xl"
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-gray-600">No image</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
export default PostCard
