"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to safely hold redirect path
  const [redirectTo, setRedirectTo] = useState("/Pages/News");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Set redirectTo after component mounts (safe for client)
  useEffect(() => {
    const search = searchParams.get("redirectTo");
    const stored = sessionStorage.getItem("redirectTo");

    const target = search || stored || "/Pages/News";
    setRedirectTo(target);

    // Save in sessionStorage to persist through refresh
    if (search || stored) {
      sessionStorage.setItem("redirectTo", target);
    }
  }, [searchParams]);

  const finishLogin = () => {
    const target = sessionStorage.getItem("redirectTo") || "/Pages/News";
    sessionStorage.removeItem("redirectTo");
    router.push(target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        finishLogin();
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: username });
        finishLogin();
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      finishLogin();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black/80">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded bg-gray-700"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700"
          required
        />

        <button
          type="submit"
          className="bg-yellow-300 text-black p-2 rounded font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-[#101010] text-white p-2 rounded font-bold hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? (
            "Please wait..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign in with Google <FaGoogle />
            </span>
          )}
        </button>

        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-yellow-300 font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
