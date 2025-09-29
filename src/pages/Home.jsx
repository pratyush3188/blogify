import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
function Home() {
  const [user, setUser] = useState(null);     // Logged-in user state
  const [posts, setPosts] = useState([]);     // Posts state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Check if user is logged in
    authService.getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);

        // Fetch posts only if user is logged in
        return appwriteService.getPosts();
      })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts || []);
      })
      .catch(() => {
        setUser(null);   // Not logged in
        setPosts([]);    // No posts
      })
      .finally(() => setLoading(false)); // Stop loading in any case
  }, []);

  // if (loading) {
  //   // Show while checking login/fetching posts
  //   return (
  //    null
  //   );
  // }

  if (!user) {
    // Show this if user is logged out
    return (
      <div className="w-full py-16 bg-white">
      {/* Container */}
      <div className="max-w-screen-2xl mx-auto px-6 text-center">
        {/* Heading + Subtext */}

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Share your stories with the world
        </h1>
        <div className="text-left">
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Aurora Blog is a community where anyone can write, read, and grow. 
          Create an account to start posting your blogs and connect with readers.
        </p>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Publish insights, travel diaries, tutorials, poetry, and everything in between. 
          Your voice matters — we make it easy to craft beautiful posts and reach your audience.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Link to='/signup' className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            Get started
          </Link>
          <Link to='/signup' className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Learn more
          </Link>
        </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Write freely</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Create posts with a clean, focused writing experience. Aurora keeps 
              your work safe while you focus on your ideas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Build community</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Engage with readers and other writers across topics. Follow authors, 
              bookmark posts, and grow together.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Start in seconds</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Sign up and publish your first post right away. No setup required — 
              just write, publish, and share.
            </p>
          </div>
        </div>
      </div>
       <div className="w-full py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Section */}
        <div className="text-left">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="text-purple-600 w-6 h-6" />
            Why writers choose Aurora
          </h2>
          <p className="mt-3 text-gray-600">
            Elegant design, fast loading pages, and an editor that lets your words shine. 
            You own your content and can export anytime.
          </p>
        </div>

        {/* Right Section */}
        <div className="text-left">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="text-purple-600 w-6 h-6" />
            How it works
          </h2>
          <ol className="mt-3 space-y-2 text-gray-600 list-decimal list-inside">
            <li>Create an account</li>
            <li>Write your post in our distraction-free editor</li>
            <li>Publish and share with your audience</li>
          </ol>
        </div>
      </div>
    </div>
    </div>
    
    );
  }

  // User is logged in → show posts
  return (
    
      <div className="w-full py-16 bg-white">
      {/* Container */}
      <div className="max-w-screen-2xl mx-auto px-6 text-center">
        {/* Heading + Subtext */}

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Share your stories with the world
        </h1>
        <div className="text-left">
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Aurora Blog is a community where anyone can write, read, and grow. 
          Create an account to start posting your blogs and connect with readers.
        </p>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Publish insights, travel diaries, tutorials, poetry, and everything in between. 
          Your voice matters — we make it easy to craft beautiful posts and reach your audience.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Link to='/add-post' className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            Get started
          </Link>
          <Link to='/aboutus' className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Learn more
          </Link>
        </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Write freely</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Create posts with a clean, focused writing experience. Aurora keeps 
              your work safe while you focus on your ideas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Build community</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Engage with readers and other writers across topics. Follow authors, 
              bookmark posts, and grow together.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border rounded-xl text-left shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Start in seconds</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Sign up and publish your first post right away. No setup required — 
              just write, publish, and share.
            </p>
          </div>
        </div>
      </div>
       <div className="w-full py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Section */}
        <div className="text-left">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="text-purple-600 w-6 h-6" />
            Why writers choose Aurora
          </h2>
          <p className="mt-3 text-gray-600">
            Elegant design, fast loading pages, and an editor that lets your words shine. 
            You own your content and can export anytime.
          </p>
        </div>

        {/* Right Section */}
        <div className="text-left">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="text-purple-600 w-6 h-6" />
            How it works
          </h2>
          <ol className="mt-3 space-y-2 text-gray-600 list-decimal list-inside">
            <li>Create an account</li>
            <li>Write your post in our distraction-free editor</li>
            <li>Publish and share with your audience</li>
          </ol>
        </div>
      </div>
    </div>
    </div>
    
    
  );
}

export default Home;
