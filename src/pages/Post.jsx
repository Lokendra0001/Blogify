import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import postService from "../appwrite/postService";
import { Button, Container } from "../components/Index";
import { ArrowLeft, Trash2, Edit } from "lucide-react"; // optional icon lib like lucide or heroicons
import deleteIcon from "../assests/delete.png";
import { useSelector } from "react-redux";

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getPost(slug);
      setPost(data);
    };
    fetchData();
  }, [slug]);

  const deletePost = () => {
    postService.deletePost(post.$id).then((status) => {
      if (status) {
        postService.deleteImage(post.featuredImage);
        navigate("/");
      }
    });
  };
  return (
    <Container className="min-h-screen p-6 md:p-10 bg-gray-50">
      {post && (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl relative overflow-hidden">
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-1 text-sm px-3 py-1.5  rounded-full shadow transition duration-200"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          {/* Featured Image */}
          <img
            src={postService.getFile(post.featuredImage)}
            alt={post.title}
            className="w-full h-[600px]  object-cover object-[0_10%] rounded-t-xl"
          />

          <div className="p-6">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2  text-[#1c59ad]">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="text-sm text-gray-500 mb-4 flex flex-col md:flex-row md:justify-between">
              <p>Posted on {new Date(post.$createdAt).toLocaleDateString()}</p>
              <p>
                Author:{" "}
                <span className="font-medium text-gray-700">
                  {userData.name}
                </span>
              </p>
            </div>

            {/* Content */}
            <div
              className="text-gray-700 leading-7 prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Action Buttons */}
            {post.userId === userData.$id && (
              <div className="flex flex-wrap gap-5">
                <Link to={`/edit-post/${post.$id}`} state={{ post }}>
                  <Button className="flex gap-1 rounded items-center px-6 py-1.5 hover:bg-blue-600">
                    <Edit className=" w-4 h-4" /> Edit
                  </Button>
                </Link>
                <Button
                  className="flex gap-1 items-center rounded px-6 py-1.5 bg-red-500 hover:bg-red-600"
                  onClick={deletePost}
                >
                  <Trash2 className=" w-4 h-4" /> Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

export default Post;
