import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();

  // ✅ Submit function
  const submit = async (data) => {
    try {
      // 🔑 Always get fresh user directly from Appwrite
// ✅ Correct
const user = await appwriteService.account.get();
      const userId = user?.$id;

      if (!userId) {
        alert("❌ Error: User not logged in!");
        return;
      }

      if (post?.$id) {
        await appwriteService.updatePost(post.$id, { ...data, userId });
        alert("✅ Post updated successfully!");
      } else {
        await appwriteService.createPost({ ...data, userId });
        alert("✅ Post created successfully!");
      }

      navigate("/all-posts");
    } catch (error) {
      console.error("❌ Error in submit:", error);
      alert("❌ Error saving post: " + (error.message || JSON.stringify(error)));
    }
  };

  // ✅ Slug auto-generate
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Write a new post</h1>
            <p className="text-gray-500 mt-1">
              Add a clear title and a readable slug so readers can easily discover your post.
              Choose status to control whether it’s visible.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input
              placeholder="Enter your title"
              className="w-full"
              {...register("title", { required: true })}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <Input
              placeholder="slug-url"
              className="w-full"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
              }
            />
            <p className="text-xs text-gray-400 mt-1">
              Slug becomes part of the URL (letters, numbers, and dashes).
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <RTE name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select
              options={["active", "inactive"]}
              className="w-full"
              {...register("status", { required: true })}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}
              className="w-full py-2 text-white rounded-lg"
            >
              {post ? "Update Post" : "Publish"}
            </Button>
            <button
              type="reset"
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
