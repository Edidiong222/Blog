"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Link from "next/link";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function BlogFeed() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const blogData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBlogs(blogData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-6 min-h-screen bg-black text-white">
            <h1 className="text-3xl font-bold mb-6 text-yellow-300">Blogs</h1>
            <div className="flex flex-col gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 bg-gray-900 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">{blog.title}</h2>
                        <p className="text-gray-300 mb-2 whitespace-pre-wrap">
                            {blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content}
                        </p>
                        <Link href={`/Pages/blog/${blog.id}`} className="text-yellow-300 hover:underline font-bold">
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
