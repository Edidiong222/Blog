import { Cpu, Shield, Zap } from "lucide-react";

export default function WhyChoose() {
  return (
    <div className="py-16 px-6 lg:px-20 bg-[#232323]">
      <h2 className="text-4xl font-bold mb-10">Why Choose FutureTech?</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-gray-700 rounded-xl p-6">
          <Cpu size={40} className="text-yellow-300 mb-4" />
          <h3 className="text-2xl mb-2">Cutting-Edge Insights</h3>
          <p className="text-gray-400">Stay ahead with the latest AI breakthroughs.</p>
        </div>

        <div className="border border-gray-700 rounded-xl p-6">
          <Shield size={40} className="text-yellow-300 mb-4" />
          <h3 className="text-2xl mb-2">Verified Information</h3>
          <p className="text-gray-400">Every article is fact-checked by experts.</p>
        </div>

        <div className="border border-gray-700 rounded-xl p-6">
          <Zap size={40} className="text-yellow-300 mb-4" />
          <h3 className="text-2xl mb-2">Fast & Reliable</h3>
          <p className="text-gray-400">Get news updates in real-time.</p>
        </div>
      </div>
    </div>
  );
}
