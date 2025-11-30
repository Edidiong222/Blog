export default function TrustedBy() {
  return (
    <div className="bg-[#1a1a1a] py-12 px-6 lg:px-20">
      <h2 className="text-center text-3xl font-bold mb-8">Trusted By</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 opacity-70">
        <div className="text-center text-gray-400">Google</div>
        <div className="text-center text-gray-400">Microsoft</div>
        <div className="text-center text-gray-400">Nvidia</div>
        <div className="text-center text-gray-400">OpenAI</div>
        <div className="text-center text-gray-400">Meta</div>
        <div className="text-center text-gray-400">DeepMind</div>
      </div>
    </div>
  );
}
