import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts()
      .then((fetchedPosts) => {
        if (fetchedPosts) {
          setPosts(fetchedPosts);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div className="w-full py-16 bg-gray-50 min-h-screen">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">✨ All Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore community posts, thoughts, and stories from our members.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">📭 No posts found yet.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
