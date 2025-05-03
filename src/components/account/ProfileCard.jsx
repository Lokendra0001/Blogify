import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Settings,
  Bookmark,
  LogOut,
  PenTool,
  Heart,
  Users,
  Zap,
  LogOutIcon,
} from "lucide-react";
import postService from "../../appwrite/postService";
import { useSelector } from "react-redux";
import { Button, LogoutBtn } from "../Index";
import { Link } from "react-router-dom";

function ProfileComponent() {
  const [postsNo, setPostNo] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (!userData?.$id) return;
    const fetchData = async () => {
      const posts = await postService.getAllPosts();
      if (posts) {
        const userPosts = posts.documents.filter(
          (post) => post.userId === userData.$id
        );
        setPostNo(userPosts.length);
      }
    };

    fetchData();
  }, [userData, postService.getAllPosts]);

  return (
    <div className="h-full p-4 backdrop-blur-sm">
      {/* Profile Header with Glass Effect */}
      <div className="relative flex flex-col items-center mb-8 group">
        {/* Floating profile picture with ring animation */}
        <div className="relative mb-4">
          <div
            className="w-28 h-28 rounded-full bg-white/80 border-4 border-blue-200 flex items-center justify-center shadow-lg 
            transition-all duration-300 hover:border-blue-400 hover:shadow-xl"
          >
            <User className="w-12 h-12 text-blue-600 opacity-90" />
          </div>
          {/* Pulsing ring effect (CSS animation) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-ping opacity-0 group-hover:opacity-40 
            group-hover:border-blue-300 duration-1000"
            style={{ animationDuration: "2s" }}
          ></div>

          <button
            className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-blue-500 to-blue-600 p-2 rounded-full text-white 
            shadow-md hover:shadow-lg transition-transform hover:scale-110 hover:rotate-12"
          >
            <PenTool className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#1E53A2] mb-1">
          {userData?.name}
        </h2>
        <div className="flex items-center gap-1 text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full text-sm">
          <Zap className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
          <span>Blogify Member</span>
        </div>
      </div>

      {/* Stats with Animated Hover */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          {
            icon: <Bookmark className="w-5 h-5" />,
            value: postsNo,
            label: "Posts",
          },
          {
            icon: <Heart className="w-5 h-5" />,
            value: "3.4K",
            label: "Likes",
          },
          {
            icon: <Users className="w-5 h-5" />,
            value: "1.2K",
            label: "Followers",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm hover:shadow-md 
            hover:bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="mx-auto w-8 h-8 flex items-center justify-center bg-blue-100/50 rounded-full mb-1">
              {item.icon}
            </div>
            <p className="font-bold text-blue-700">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons with Gradient Hover */}
      <div className="space-y-3">
        <Link to={"/myAccount/message"}>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 hover:shadow-lg transition-all duration-300 group cursor-pointer
               hover:bg-gradient-to-r from-blue-500 to-blue-600  hover:text-white focus:outline-none`}
          >
            <span
              className={`p-2 rounded-full bg-white/20 group-hover:bg-white/30`}
            >
              <Mail className="w-5 h-5" />
            </span>
            <span className="font-medium">Messages</span>
          </button>
        </Link>
        <LogoutBtn
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 hover:shadow-lg transition-all duration-300 group 
              hover:bg-gradient-to-r from-red-400 to-red-500 hover:text-white focus:outline-none`}
        >
          <span
            className={`p-2 rounded-full bg-white/20 group-hover:bg-white/30`}
          >
            <LogOutIcon className="w-5 h-5" />
          </span>
          <span className="font-medium">LogOut</span>
        </LogoutBtn>
      </div>
    </div>
  );
}

export default ProfileComponent;
