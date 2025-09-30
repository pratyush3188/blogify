import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components"; 
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
  if (slug) {
    appwriteService.getPost(slug).then((fetchedPost) => {
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        navigate("/");
      }
      setLoading(false);
    });
  } else {
    navigate("/");
    setLoading(false);
  }
}, [slug, navigate]);

if (loading || !userData) {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}

const isAuthor = post?.userId === userData?.$id;

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Gradient border wrapper */}
                <div className="max-w-4xl mx-auto p-0.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                    {/* Main post card */}
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        {/* Title and Subtitle */}
                        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
                        <p className="text-lg text-gray-500 mt-2">
                            Dive into your story below.
                        </p>

                        <hr className="my-6" />

                        {/* Post Content */}
                        <div className="prose max-w-none">
                            {post?.content ? parse(post.content) : "No content available"}
                        </div>

                        {/* Action buttons if the user is the author */}
                        {isAuthor && (
                            <div className="mt-8 flex items-center gap-4">
                                <Link
                                    to={`/edit-post/${post.$id}`}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
