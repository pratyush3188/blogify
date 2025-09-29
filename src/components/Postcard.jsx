import { Link } from "react-router-dom";

function PostCard({ $id, title, content }) {
  const generatePreview = (htmlContent = "") => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;
  };

  return (
    <Link to={`/post/${$id}`} className="h-full">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm 
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1">
          {title}
        </h2>
        
        {/* Content Preview */}
        <p className="text-sm text-gray-600 flex-grow line-clamp-3">
          {generatePreview(content)}
        </p>

        {/* Read More Button */}
        <div className="mt-4">
          <span className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
