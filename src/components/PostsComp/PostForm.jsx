import { Input, Container, Button, RTE, Select } from "../Index";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import postService from "../../appwrite/postService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PostForm() {
  const location = useLocation();
  const post = location.state?.post || null;
  const [loading, setLoading] = useState(false); // Loading state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.$id || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true); // Start loading
    try {
      let fileId = null;

      // If there's a new image file, upload it
      if (data.image[0]) {
        const file = await postService.uploadImage(data.image[0]);
        if (file) {
          fileId = file.$id; // Get the file ID after uploading
        }
      }

      // If the post exists (edit post scenario)
      if (post) {
        // If there's a new image, delete the old one
        if (fileId && post.featuredImage) {
          postService.deleteImage(post.featuredImage); // Delete old image
        }

        // Update post
        const dbPost = await postService.updatePost(data.slug, {
          ...data,
          featuredImage: fileId || post.featuredImage, // Use the new file ID or keep the old one
        });

        if (dbPost) {
          setAlertMessage("Post updated successfully!"); // Set success message
          setTimeout(() => {
            navigate(`/post/${dbPost.$id}`);
          }, 1500); // Wait 1.5 seconds before redirecting
        }
      } else {
        // If it's a new post, create it
        const newPost = await postService.createPost({
          ...data,
          featuredImage: fileId, // Use the file ID for new post
          userId: userData?.$id,
        });

        if (newPost) {
          setAlertMessage("Post created successfully!"); // Set success message
          setTimeout(() => {
            navigate(`/post/${newPost.$id}`);
          }, 1500); // Wait 1.5 seconds before redirecting
        }
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setAlertMessage("Error occurred! Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const slugTransform = (value) => {
    if (value && typeof value === "string") return value.replace(/\s+/g, "-");
    return "";
  };

  useEffect(() => {
    if (!post) {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [slugTransform, watch, setValue, post]);

  return (
    <Container className="bg-slate-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex flex-col gap-8 p-6  shadow-lg rounded-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Main Inputs */}
          <div className="w-full md:w-2/3 space-y-3">
            <Input
              label="Title :"
              type="text"
              className="w-full bg-white"
              {...register("title", {
                required: "Please Fill Title First!",
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <Input
              type="text"
              label="Slug :"
              readOnly={true}
              className="w-full bg-white"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              control={control}
              label="Content :"
              name={"Content"}
              defaultValue={getValues("content")}
              {...register("content", {
                required: "Please fill Content First!",
              })}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Right Side - File & Select */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4 bg-white"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", {
                required: !post && "Image is Required!",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
            {post && (
              <div className="w-full mb-4">
                <img
                  src={postService.getFile(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={["active", "Inactive"]}
              label="Status :"
              {...register("status", { required: true })}
              className="w-full bg-white"
            />
            <Button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition mt-3"
              name={post ? "Update" : "Create"}
            />
          </div>
        </div>
      </form>

      {/* Show Loading Spinner when submitting */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40  z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-600 text-lg font-semibold">
              Post is in process...
            </p>
          </div>
        </div>
      )}

      {/* Show Success/Error Alert */}
      {alertMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg z-50">
          <div className="flex items-center p-4 text-white bg-blue-500 rounded-lg shadow-lg">
            <svg
              className="w-6 h-6 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20.5c4.694 0 8.5-3.806 8.5-8.5S16.694 3.5 12 3.5 3.5 7.306 3.5 12s3.806 8.5 8.5 8.5z"
              />
            </svg>
            <span className="text-lg font-medium">{alertMessage}</span>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PostForm;
