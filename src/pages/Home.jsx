import React, { useEffect, useState } from "react";
import postService from "../appwrite/postService";
import { Button, Container, PostCard } from "../components/Index";
import noPost from "../assests/NOPost.jpg";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const userStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getAllPosts();
        if (allPosts) {
          setPosts(allPosts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoader(false); // Ensure this runs no matter what
      }
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading UI
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

  // if (!userStatus) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-6 text-center bg-slate-50">
  //       <div className="bg-blue-50 p-6 rounded-full">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="48"
  //           height="48"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           stroke="#1e53a2"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         >
  //           <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
  //           <polyline points="10 17 15 12 10 7"></polyline>
  //           <line x1="15" z1="12" z2="3" y2="12"></line>
  //         </svg>
  //       </div>

  //       <div className="space-y-3">
  //         <h2 className="text-2xl font-bold text-gray-800">
  //           Please Login to Continue
  //         </h2>
  //         <p className="text-gray-600 max-w-md">
  //           You need to be logged in to view this content. Join our community of
  //           readers and writers!
  //         </p>
  //       </div>

  //       <div className="flex flex-col sm:flex-row gap-4">
  //         <NavLink
  //           to="/login"
  //           className="px-6 py-3 bg-[#1e53a2] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="20"
  //             height="20"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           >
  //             <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
  //             <polyline points="10 17 15 12 10 7"></polyline>
  //             <line x1="15" y1="12" x2="3" y2="12"></line>
  //           </svg>
  //           Login to Your Account
  //         </NavLink>

  //         <NavLink
  //           to="/signup"
  //           className="px-6 py-3 border-2 border-[#1e53a2] text-[#1e53a2] rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 justify-center"
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="20"
  //             height="20"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           >
  //             <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  //             <circle cx="8.5" cy="7" r="4"></circle>
  //             <line x1="20" y1="8" x2="20" z1="14"></line>
  //             <line x1="23" y1="11" x2="17" z1="11"></line>
  //           </svg>
  //           Create New Account
  //         </NavLink>
  //       </div>

  //       <p className="text-sm text-gray-500 mt-4">
  //         By logging in, you agree to our Terms of Service and Privacy Policy
  //       </p>
  //     </div>
  //   );
  // }

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
    <Container className="min-h-screen p-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <PostCard {...post} key={post.$id} />
        ))}
      </div>
    </Container>
  );
}

export default Home;
