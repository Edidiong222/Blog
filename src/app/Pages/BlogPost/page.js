"use client";
import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to post a blog!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        uid: auth.currentUser.uid,
        username: auth.currentUser.displayName || "Anonymous", // <-- added username
        photoURL: auth.currentUser.photoURL || null,           // <-- optional profile pic
        likes: 0,
        createdAt: serverTimestamp(),
      });
      alert("Blog posted!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-center">Create Blog</h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-700"
          required
        />
        <textarea
          placeholder="Write your blog here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 rounded bg-gray-700 h-40"
          required
        />
        <button
          type="submit"
          className="bg-yellow-300 text-black p-2 rounded font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
        {/* Optional: Show current user */}
        {auth.currentUser && (
          <p className="mt-2 text-gray-400 text-sm text-center">
            Posting as: <span className="font-bold">{auth.currentUser.displayName || "Anonymous"}</span>
          </p>
        )}
      </form>
    </div>
  );
}
