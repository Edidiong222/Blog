"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, auth } from "../../firebase";
import {
    doc,
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
} from "firebase/firestore";
import { FaHeart, FaRegHeart, FaUserCircle, FaTrash } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

export default function BlogPage() {
    const { id: blogId } = useParams();
    const router = useRouter();

    const [blog, setBlog] = useState(null);
    const [commentsMap, setCommentsMap] = useState({});
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [showReplies, setShowReplies] = useState({});
    const [showOptions, setShowOptions] = useState({}); // For delete buttons

    // Fetch blog & comments
    useEffect(() => {
        const blogRef = doc(db, "blogs", blogId);
        const unsubscribeBlog = onSnapshot(blogRef, (docSnap) => {
            if (docSnap.exists()) setBlog({ id: docSnap.id, ...docSnap.data() });
        });

        const commentsQuery = query(
            collection(db, "blogs", blogId, "comments"),
            orderBy("createdAt", "asc")
        );
        const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
            snapshot.docs.forEach((cmt) => {
                const commentId = cmt.id;
                const commentData = { id: commentId, ...cmt.data(), replies: [] };

                const repliesQuery = query(
                    collection(db, "blogs", blogId, "comments", commentId, "replies"),
                    orderBy("createdAt", "asc")
                );
                onSnapshot(repliesQuery, (replySnap) => {
                    setCommentsMap((prev) => ({
                        ...prev,
                        [commentId]: { ...commentData, replies: replySnap.docs.map(r => ({ id: r.id, ...r.data() })) }
                    }));
                });
            });
        });

        return () => {
            unsubscribeBlog();
            unsubscribeComments();
        };
    }, [blogId]);

    if (!blog) return <div className="p-6 text-white">Loading...</div>;

    const liked = blog.likesArray?.includes(auth.currentUser?.uid);

    // Blog like
    const toggleLike = async () => {
        if (!auth.currentUser) return alert("Login to like");
        const blogRef = doc(db, "blogs", blogId);
        const uid = auth.currentUser.uid;
        if (blog.likesArray?.includes(uid)) await updateDoc(blogRef, { likesArray: arrayRemove(uid) });
        else await updateDoc(blogRef, { likesArray: arrayUnion(uid) });
    };

    // Comment like
    const toggleCommentLike = async (comment) => {
        if (!auth.currentUser) return alert("Login to like");
        const commentRef = doc(db, "blogs", blogId, "comments", comment.id);
        const uid = auth.currentUser.uid;
        if (comment.likesArray?.includes(uid)) await updateDoc(commentRef, { likesArray: arrayRemove(uid) });
        else await updateDoc(commentRef, { likesArray: arrayUnion(uid) });
    };

    // Reply like
    const toggleReplyLike = async (commentId, reply) => {
        if (!auth.currentUser) return alert("Login to like");
        const replyRef = doc(db, "blogs", blogId, "comments", commentId, "replies", reply.id);
        const uid = auth.currentUser.uid;
        if (reply.likesArray?.includes(uid)) await updateDoc(replyRef, { likesArray: arrayRemove(uid) });
        else await updateDoc(replyRef, { likesArray: arrayUnion(uid) });
    };

    // Post comment
    const postComment = async () => {
        if (!auth.currentUser) return alert("Login to comment");
        if (!commentText) return;
        const commentsRef = collection(db, "blogs", blogId, "comments");
        await addDoc(commentsRef, {
            text: commentText,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName || auth.currentUser.email,
            photoURL: auth.currentUser.photoURL || null,
            likesArray: [],
            createdAt: serverTimestamp(),
        });
        setCommentText("");
    };

    // Post reply
    const postReply = async (commentId) => {
        if (!auth.currentUser) return alert("Login to reply");
        if (!replyText[commentId]) return;
        const repliesRef = collection(db, "blogs", blogId, "comments", commentId, "replies");
        await addDoc(repliesRef, {
            text: replyText[commentId],
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName || auth.currentUser.email,
            photoURL: auth.currentUser.photoURL || null,
            likesArray: [],
            createdAt: serverTimestamp(),
        });
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
        setShowReplies((prev) => ({ ...prev, [commentId]: true }));
    };

    // Delete
    const deleteBlog = async () => {
        if (!confirm("Delete this blog?")) return;
        await deleteDoc(doc(db, "blogs", blogId));
        router.push("/"); // Redirect after deletion
    };
    const deleteComment = async (commentId) => {
        if (!confirm("Delete this comment?")) return;
        await deleteDoc(doc(db, "blogs", blogId, "comments", commentId));
    };
    const deleteReply = async (commentId, replyId) => {
        if (!confirm("Delete this reply?")) return;
        await deleteDoc(doc(db, "blogs", blogId, "comments", commentId, "replies", replyId));
    };

    const formatTimestamp = (ts) => ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString([], { dateStyle: "short", timeStyle: "short" }) : "";

    return (
        <div className="p-6 min-h-screen bg-black text-white">
            <h1 className="text-3xl font-bold text-yellow-300 mb-4">{blog.title}</h1>
            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{blog.content}</p>

            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={toggleLike}
                    className={`text-xl transition-colors ${liked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}`}
                >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <span>{blog.likesArray?.length || 0} Likes</span>

                {blog.uid === auth.currentUser?.uid && (
                    <div className="relative ml-4">
                        <button
                            onClick={() => setShowOptions(prev => ({ ...prev, blog: !prev.blog }))}
                            className="text-white"
                        ><FiMoreVertical /></button>
                        {showOptions.blog && (
                            <button
                                onClick={deleteBlog}
                                className="ml-2 text-red-500 hover:text-red-700 absolute bg-white p-2 rounded-lg"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <button
                onClick={() => setShowComments(prev => !prev)}
                className="text-sm text-yellow-300 mb-4 hover:underline"
            >
                {showComments ? "Hide Comments" : `View Comments (${Object.keys(commentsMap).length})`}
            </button>

            {showComments && (
                <div className="flex flex-col gap-4">
                    <textarea
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="p-2 rounded bg-gray-700 w-full"
                    />
                    <button
                        onClick={postComment}
                        className="self-end bg-yellow-300 text-black p-2 rounded font-bold hover:bg-yellow-400 transition"
                    >
                        Post Comment
                    </button>

                    {Object.values(commentsMap).map((cmt) => {
                        const commentLiked = cmt.likesArray?.includes(auth.currentUser?.uid);
                        return (
                            <div key={cmt.id} className="flex flex-col gap-2 bg-gray-800 p-3 rounded-xl shadow-md">
                                <div className="flex gap-3 items-start">
                                    <img src={cmt.photoURL || "/default-avatar.png"} alt={cmt.displayName} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{cmt.displayName}</span>
                                            <span className="text-gray-400 text-xs">{formatTimestamp(cmt.createdAt)}</span>
                                            {cmt.uid === auth.currentUser?.uid && (
                                                <div className="relative">
                                                    <button onClick={() => setShowOptions(prev => ({ ...prev, [`comment-${cmt.id}`]: !prev[`comment-${cmt.id}`] }))} className="ml-2 text-white"><FiMoreVertical /></button>
                                                    {showOptions[`comment-${cmt.id}`] && (
                                                        <button onClick={() => deleteComment(cmt.id)}       className="absolute right-0 top-6 z-50 bg-white p-2 rounded-lg text-red-500 hover:text-red-700"
><FaTrash /></button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-300 mt-1">{cmt.text}</p>

                                        <div className="flex items-center gap-4 mt-2">
                                            <button
                                                onClick={() => toggleCommentLike(cmt)}
                                                className={`text-sm transition-colors ${commentLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}`}
                                            >
                                                {commentLiked ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                            <span className="text-gray-400 text-sm">{cmt.likesArray?.length || 0}</span>
                                            <button onClick={() => setReplyText(prev => ({ ...prev, [cmt.id]: prev[cmt.id] || "" }))} className="text-sm text-yellow-300 hover:underline">
                                                Reply
                                            </button>
                                            {cmt.replies?.length > 0 && (
                                                <button onClick={() => setShowReplies(prev => ({ ...prev, [cmt.id]: !prev[cmt.id] }))} className="text-sm text-yellow-300 hover:underline">
                                                    {showReplies[cmt.id] ? `Hide Replies (${cmt.replies.length})` : `View Replies (${cmt.replies.length})`}
                                                </button>
                                            )}
                                        </div>

                                        {replyText[cmt.id] !== undefined && (
                                            <div className="flex flex-col gap-2 mt-2 ml-12">
                                                <textarea
                                                    placeholder="Write a reply..."
                                                    value={replyText[cmt.id]}
                                                    onChange={(e) => setReplyText(prev => ({ ...prev, [cmt.id]: e.target.value }))}
                                                    className="p-2 rounded bg-gray-700 w-full"
                                                />
                                                <button
                                                    onClick={() => postReply(cmt.id)}
                                                    className="self-end bg-yellow-300 text-black p-2 rounded font-bold hover:bg-yellow-400 transition"
                                                >
                                                    Post Reply
                                                </button>
                                            </div>
                                        )}

                                        {showReplies[cmt.id] && cmt.replies?.map((rep) => {
                                            const replyLiked = rep.likesArray?.includes(auth.currentUser?.uid);
                                            return (
                                                <div key={rep.id} className="flex gap-3 items-start ml-12 mt-2">
                                                    <img src={rep.photoURL || "/default-avatar.png"} alt={rep.displayName} className="w-8 h-8 rounded-full object-cover" />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">{rep.displayName}</span>
                                                            <span className="text-gray-400 text-xs">{formatTimestamp(rep.createdAt)}</span>
                                                            {rep.uid === auth.currentUser?.uid && (
                                                                <button onClick={() => deleteReply(cmt.id, rep.id)} className="ml-2 text-red-500 hover:text-red-700">
                                                                    <FaTrash />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-300">{rep.text}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <button onClick={() => toggleReplyLike(cmt.id, rep)} className={`text-sm transition-colors ${replyLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}`}>
                                                                {replyLiked ? <FaHeart /> : <FaRegHeart />}
                                                            </button>
                                                            <span className="text-gray-400 text-sm">{rep.likesArray?.length || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
