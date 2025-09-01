import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // ✅ FIXED: Only one submit function
  const submit = async (data) => {
  try {
    // ✅ Get logged in userId from Redux
    const userId = userData?.$id;
    if (!userId) {
      alert("Error: User not logged in ❌");
      return;
    }

    // ✅ Upload image if new file selected
    let featuredImage = post?.featuredImage || null;
    if (data.image && data.image[0]) {
      const uploadedFile = await appwriteService.uploadFile(data.image[0]);
      featuredImage = uploadedFile.$id;
    }

    if (post) {
      // Update existing post
      await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage,
        userId,
      });
    } else {
      // Create new post
      await appwriteService.createPost({
        ...data,
        featuredImage,
        userId,
      });
    }

    alert("✅ Post saved successfully!");
    navigate("/all-posts");
  } catch (error) {
    console.error("Error in submit:", error.message || error);
    alert("❌ Error saving post: " + (error.message || JSON.stringify(error)));
  }
};

  // ✅ Slug generator
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // update slug when title changes
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left Side: Title + Slug + Content */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Side: Image + Status + Submit */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full cursor-pointer"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
