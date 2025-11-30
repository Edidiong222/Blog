export default function Newsletter() {
  return (
    <div className="py-16 px-6 lg:px-20 bg-[#232323]">
      <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          type="email" 
          placeholder="Enter your email"
          className="flex-1 p-3 bg-[#111] border border-gray-700 rounded-lg outline-none"
        />
        <button className="bg-yellow-300 border hover:bg-[#101010] hover:border-yellow-300 hover:text-white text-black px-6 py-3 rounded-lg">
          Subscribe
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-3">We respect your privacy.</p>
    </div>
  );
}
