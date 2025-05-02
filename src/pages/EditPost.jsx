import React, { useState, useEffect } from "react";
import postService from "../appwrite/postService";
import { Button, Container, PostCard } from "../components/Index";
import noPost from "../assests/NoPost.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.$id) return;

    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getAllPosts();
        if (allPosts) {
          const arr = allPosts.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(arr);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchPosts();
  }, [userData]);

  if (loader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold tracking-wide">
          Loading posts, please wait...
        </p>
      </div>
    );
  }

  // No Posts UI
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center px-4">
        <img src={noPost} alt="No Post" className="w-72 object-contain mb-6" />
        <h2 className="text-2xl font-bold text-blue-600 mb-3">
          No Posts Available
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t created any posts yet.
        </p>
        <Link to="/addPost">
          <Button
            name="Create Your First Blog"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          />
        </Link>
      </div>
    );
  }

  // Posts UI
  return (
    <Container className="min-h-screen p-8 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <PostCard {...post} key={post.$id} />
        ))}
      </div>
    </Container>
  );
}

export default EditPost;
