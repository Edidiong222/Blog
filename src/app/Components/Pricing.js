export default function Pricing() {
  return (
    <div className="py-16 px-6 lg:px-20 bg-[#1b1b1b]">
      <h2 className="text-4xl font-bold mb-10">Pricing</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Least Important */}
        <div className="border border-gray-700 rounded-xl p-6 opacity-80 hover:border-yellow-300 transition">
          <h3 className="text-xl font-bold text-gray-300">Basic</h3>
          <p className="text-4xl font-bold mt-2">₦0</p>
          <ul className="text-gray-400 mt-4 space-y-2">
            <li>✓ Limited Articles</li>
            <li>✓ Standard Access</li>
            <li>✓ Weekly Newsletter</li>
          </ul>
          <button className="mt-6 bg-[#343434]  hover:bg-yellow-300 hover:text-white w-full p-3 rounded-lg">
            Choose Plan
          </button>
        </div>

        {/* Most Relevant — Highlighted */}
        <div className="border border-yellow-300 rounded-xl p-6 shadow-xl shadow-yellow-300/30 scale-105">
          <h3 className="text-xl font-bold text-yellow-300">Pro</h3>
          <p className="text-4xl font-bold mt-2">₦4,500/mo</p>
          <ul className="text-gray-300 mt-4 space-y-2">
            <li>✓ Full Article Access</li>
            <li>✓ AI Insights & Reports</li>
            <li>✓ Priority Tools & Features</li>
            <li>✓ Early Access to New Updates</li>
          </ul>
          <button className="mt-6 bg-yellow-300 hover:bg-[#101010] hover:text-white text-black w-full p-3 rounded-lg font-semibold">
            Best Value
          </button>
        </div>

        {/* Mid Tier */}
        <div className="border border-gray-600 rounded-xl p-6 hover:border-yellow-300 transition">
          <h3 className="text-xl font-bold">Plus</h3>
          <p className="text-4xl font-bold mt-2">₦2,000/mo</p>
          <ul className="text-gray-400 mt-4 space-y-2">
            <li>✓ More Articles</li>
            <li>✓ Monthly Insights</li>
            <li>✓ Access to Selected Tools</li>
          </ul>
          <button className="mt-6 bg-[#343434] hover:bg-yellow-300 hover:text-black w-full p-3 rounded-lg">
            Choose Plan
          </button>
        </div>

      </div>
    </div>
  );
}
