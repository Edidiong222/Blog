import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="py-16 px-6 lg:px-20 bg-black">
      <div className="flex flex-col lg:flex-row justify-between gap-8">

        <div>
          <h2 className="text-3xl font-bold">FutureTech</h2>
          <p className="text-gray-400 mt-2 max-w-sm">
            Your trusted gateway to AI news, trends and insights.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Quick Links</h4>
          <p className="text-gray-400">Home</p>
          <p className="text-gray-400">Blogs</p>
          <p className="text-gray-400">Features</p>
          <p className="text-gray-400">Contact</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex gap-3">
            <Facebook size={20} className="text-gray-400 hover:text-yellow-500" />
            <Twitter size={20} className="text-gray-400 hover:text-yellow-500"  />
            <Instagram size={20} className="text-gray-400  hover:text-yellow-500" />
          </div>
        </div>

      </div>

      <p className="text-center text-gray-500 mt-10">
        © {new Date().getFullYear()} FutureTech. All rights reserved.
      </p>
    </div>
  );
}
