"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase"; // make sure firebase is properly configured
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const API_KEY = "pub_53856217ba9104eff0cc34880b2cfc40c18af";

  const categories = [
    { key: "top", label: "Top Headlines" },
    { key: "technology", label: "Technology" },
    { key: "business", label: "Business" },
    { key: "sports", label: "Sports" },
    { key: "entertainment", label: "Entertainment" },
    { key: "science", label: "Science" },
    { key: "health", label: "Health" },
  ];

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/Pages/Login"); // redirect to login if not signed in
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return; // only fetch news if user is signed in

    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=${category}`
        );
        const data = await res.json();
        setArticles(data.results || []);
      } catch (err) {
        console.error(err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category, user]);

  // Top 2 headlines
  const topHeadlines = articles.slice(0, 2);
  const restArticles = articles.slice(2);

  return (
    <div className="relative min-h-screen text-white bg-black/90">
      {loading && <p className="text-gray-400 text-center mt-10">Loading news...</p>}
      {!loading && user && (
        <div className="relative z-10 p-6 lg:p-20">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  category === cat.key
                    ? "bg-yellow-300 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Top Headlines */}
          {topHeadlines.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {topHeadlines.map((article, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-yellow-300 transition"
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  )}
                  <div className="p-6 h-full bg-black/70 absolute bottom-0 w-full">
                    <h2 className="text-xl md:text-2xl font-bold">{article.title}</h2>
                    <a
                      href={article.link}
                      target="_blank"
                      className="text-yellow-300 mt-2 inline-block text-sm font-semibold hover:underline"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rest of the articles */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restArticles.map((article, index) => (
              <div
                key={index}
                className="bg-[#1f1f1f] rounded-2xl border border-gray-700 overflow-hidden hover:border-yellow-300 transition shadow-lg shadow-black/50"
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{article.title}</h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    className="text-yellow-300 mt-2 inline-block text-sm font-semibold hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
