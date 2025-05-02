import React, { useEffect, useState } from "react";
import postService from "../../appwrite/postService";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Skeleton from "@mui/material/Skeleton"; // Using only MUI now
import { Button } from "../Index";
import { Heart, ArrowRight } from "lucide-react";
import authService from "../../appwrite/authService";

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function PostCard({ $id, title, featuredImage, $updatedAt, content, like }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    postService.getPost($id).then((post) => setLikes(post.like));

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

    const checkLikedStatus = async () => {
      const user = await authService.getCurrentuser();
      const likedUser = localStorage.getItem(`liked_${$id}`);

      if (likedUser === user.$id) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }

      // Also fetch likes count
      const post = await postService.getPost($id);
      setLikes(post.like);
    };

    checkLikedStatus();

    if (featuredImage) {
      fetchImageUrl();
    }
  }, [featuredImage]);

  const handleLike = async () => {
    const user = await authService.getCurrentuser(); // Get current user
    const userId = user.$id;

    const post = await postService.getPost($id);
    let likeCount = post.like;

    if (!isLike) {
      likeCount += 1;
      setIsLike(true);
      localStorage.setItem(`liked_${$id}`, userId);
    } else {
      likeCount = Math.max(0, likeCount - 1);
      setIsLike(false);
      localStorage.removeItem(`liked_${$id}`);
    }

    await postService.updateLikes(likeCount, post.$id);
    setLikes(likeCount);
  };

  return (
    <>
      <div className="w-full h-[360px] bg-white shadow-md transition-transform transform duration-300 overflow-hidden">
        <Link to={`/post/${$id}`} className="block h-[88%]">
          <div className="w-full h-[70%] overflow-hidden ">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover object-[0_25%]"
              />
            )}
          </div>
          <div className="p-4 flex flex-col justify-between  bg-gray-50">
            {loading ? (
              <Skeleton
                variant="text"
                width="80%"
                height={24}
                animation="wave"
              />
            ) : (
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-[#1E51A0] truncate">
                  {title}
                </h2>
                <p className="text-xs text-gray-500">
                  {$updatedAt && format(new Date($updatedAt), "dd MMM yyyy")}
                </p>
              </div>
            )}

            <p className="text-sm text-gray-600 line-clamp-2 w-full">
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
          </div>
        </Link>

        <div className="flex justify-between items-center mt-auto px-2 bg-gray-50">
          {loading ? (
            <Skeleton variant="rectangular" width={80} height={32} />
          ) : (
            <button
              onClick={handleLike}
              className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer "
            >
              <Heart
                size={18}
                className={`
                  ${isLike ? "text-red-500 fill-current" : "text-gray-400"}
                  hover:scale-110`}
              />
              <span className="text-sm text-blue-800 font-medium">{likes}</span>
            </button>
          )}

          {loading ? (
            <Skeleton variant="rectangular" width={100} height={36} />
          ) : (
            <Link
              to={`/post/${$id}`}
              className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors mb-1.5"
            >
              Read More
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default PostCard;
