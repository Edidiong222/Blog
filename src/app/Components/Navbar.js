"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { auth } from "../Pages/firebase"; // your firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "News", href: "/Pages/News" },
    { label: "Podcasts", href: "/Pages/BlogPost" },
    { label: "Blogs", href: "/Pages/BlogFeed" },
  ];

  const isActive = (href) => pathname === href;

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <nav className="bg-[#202020] lg:mb-0 mb-20 text-white w-full">
      {/* MOBILE TOP BAR */}
      <div className="fixed top-0 left-0 md:hidden flex items-center justify-between w-full px-6 py-5 bg-[#121212] z-[100]">
        <h1 className="text-yellow-300 font-bold text-2xl">FutureTech</h1>
        <button
          className="text-yellow-300 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex items-center justify-between px-10 h-20">
        <h1 className="text-yellow-300 font-bold text-2xl">FutureTech</h1>

        <ul className="flex gap-6 text-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span
                  className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                    isActive(link.href)
                      ? "bg-[#101010] text-white font-bold border border-[#383838]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <p className="text-gray-300">{user.displayName}</p>
              <button
                onClick={handleLogout}
                className="bg-yellow-300 text-black px-3 py-1 rounded font-bold hover:bg-yellow-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/Pages/Login">
              <button className="bg-yellow-300 text-black px-3 py-1 rounded font-bold hover:bg-yellow-400 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`md:hidden fixed top-[70px] left-0 w-full bg-[#181818] z-[90] overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
          <ul className="flex flex-col gap-3 text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg cursor-pointer transition ${
                      isActive(link.href)
                        ? "bg-[#101010] text-yellow-300 font-bold border border-[#383838]"
                        : "bg-[#111111] hover:bg-gray-700"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="py-2 px-5 rounded-lg bg-yellow-300 font-bold text-black hover:bg-yellow-400 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/Pages/Login">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 px-5 rounded-lg bg-yellow-300 font-bold text-black hover:bg-yellow-400 transition"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
