import React, { useEffect, useState } from "react";
import postService from "../../appwrite/postService";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Skeleton from "@mui/material/Skeleton"; // Using only MUI now

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function PostCard({ $id, title, featuredImage, $updatedAt, content }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = postService.getFile(featuredImage);
        setImageUrl(url);
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching image URL:", error);
        setLoading(false);
      }
    };

    if (featuredImage) {
      fetchImageUrl();
    }
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full h-[360px] bg-white shadow-md transition-transform transform duration-300 overflow-hidden">
        <div className="w-full h-[60%] overflow-hidden">
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          ) : (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover object-[0_25%]" />
          )}
        </div>
        <div className="p-4 flex flex-col justify-between h-[40%] bg-gray-50">
          {loading ? (
            <Skeleton variant="text" width="80%" height={24} animation="wave" />
          ) : (
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {title}
              </h2>
              <p className="text-xs text-gray-500">
                {$updatedAt && format(new Date($updatedAt), "dd MMM yyyy")}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-600 line-clamp-2 mt-1 w-full">
            {loading ? (
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                animation="wave"
              />
            ) : (
              stripHtml(content)?.slice(0, 120) + "..."
            )}
          </p>

          <div className="mt-2">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="40%"
                height={32}
                animation="wave"
              />
            ) : (
              <button className="bg-blue-600 text-white py-1 px-3 rounded-sm hover:bg-blue-700 transition duration-300">
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
