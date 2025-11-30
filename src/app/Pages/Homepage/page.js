import { Navbar } from "../../Components/Navbar";
import { FaStar } from "react-icons/fa";
import { GiBee } from "react-icons/gi";
import { HiBookOpen } from "react-icons/hi";
import { ArrowUpRight } from "lucide-react";
import Dark from "../Assests/dark.jpg";

import Image from 'next/image';
import FutureTech from "../../Components/FutureTech";
import Cate from "../../Components/Cate";
import TrustedBy from "../../Components/TrustedBy";
import WhyChoose from "../../Components/WhyChoose";
import Pricing from "../../Components/Pricing";
import Newsletter from "../../Components/Newsletter";
import Footer from "../../Components/Footer";

export default function Homepage() {
  return (
    <div>
   

      {/* MAIN SECTION */}
      <div className=" px-4 md:px-10 py-4 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:min-h-[500px] gap-8">

          {/* LEFT TWIN */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between border-gray-800 p-5">
            <h3 className="text-gray-300 text-lg md:text-xl mb-4">Your Journey Tomorrow begins Here</h3>

            <div className="mb-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                Explore the Frontiers of Artificial Intelligence
              </h1>
            </div>

            <div className="mb-6">
              <h3 className="text-sm md:text-base text-gray-300">
                Welcome to the epicenter of AI innovation. FutureTech AI news is your passport
                to a world where machines think, learn and reshape the future. Join us on this
                visionary expedition into the heart of AI.
              </h3>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="py-4 px-3 flex-1 flex flex-col items-center justify-center border border-gray-800 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold">
                  300<span className="text-yellow-300">+</span>
                </h2>
                <h4>Resources available</h4>
              </div>

              <div className="py-4 px-3 flex-1 flex flex-col items-center justify-center border border-gray-800 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold">
                  12k<span className="text-yellow-300">+</span>
                </h2>
                <h4>Total Downloads</h4>
              </div>

              <div className="py-4 px-3 flex-1 flex flex-col items-center justify-center border border-gray-800 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold">
                  10k<span className="text-yellow-300">+</span>
                </h2>
                <h4>Active Users</h4>
              </div>
            </div>
          </div>

          {/* RIGHT TWIN WITH DIM BACKGROUND */}
          <div className="w-full lg:w-1/2 my-3 md:h-[550px] flex flex-col">
            <div className="relative h-64 sm:h-96 lg:h-full w-full overflow-hidden">

              {/* background image */}
              <Image
                src={Dark}
                alt="background"
                fill
                className="object-cover opacity-30"
                priority
              />

              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* content */}
              <div className="relative z-10 p-5 flex flex-col h-full justify-center">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
                  Explore 1000+ resources
                </h2>
                <h4 className="text-gray-200 text-sm sm:text-base mb-4">
                  Over 1000 articles on emerging tech trends and breakthroughs.
                </h4>

                <button className="py-3 px-4 border border-gray-500 text-white flex items-center gap-2 rounded-lg hover:bg-gray-800 transition">
                  Explore Resources
                  <ArrowUpRight color="gold" size={20} />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* FEATURES SECTION */}
        <div className="flex flex-col sm:flex-row min-w-full lg:mt-12 gap-6">
          <div className="w-full sm:w-1/3 py-8 flex flex-col items-center border border-gray-800 rounded-lg p-4">
            <FaStar size={50} color="gold" />
            <h2 className="text-2xl mt-2">Latest News Update</h2>
            <h3 className="text-sm text-gray-300 mt-1">Stay current</h3>
            <h4 className="text-lg mt-2 text-center">Over 1000 articles published monthly</h4>
          </div>

          <div className="w-full sm:w-1/3 py-8 flex flex-col items-center border border-gray-800 rounded-lg p-4">
            <GiBee size={40} color="gold" />
            <h2 className="text-2xl mt-2">Expert Contributions</h2>
            <h3 className="text-sm text-gray-300 mt-1">Trusted Insights</h3>
            <h4 className="text-lg mt-2 text-center">50+ renowned experts on our team</h4>
          </div>

          <div className="w-full sm:w-1/3 py-8 flex flex-col items-center border border-gray-800 rounded-lg p-4">
            <HiBookOpen size={40} color="gold" />
            <h2 className="text-2xl mt-2">Global Readership</h2>
            <h3 className="text-sm text-gray-300 mt-1">Worldwide Impact</h3>
            <h4 className="text-lg mt-2 text-center">2 million monthly readers</h4>
          </div>
        </div>

      </div>

      <div className=" lg:p-30 p-10  bg-[#232323]">

        <div>
          <button> <h4 className="bg-[#343434] my-3 p-3">  Unlock the power of</h4>
          </button>
        </div>
        <h3 className="text-5xl">FutureTech Features</h3>
      </div>
      <div>
        <FutureTech />
      </div>

      <div className="  lg:px-20 lg:py-10 p-5 flex lg:flex-row flex-col items-center justify-between bg-[#232323]">
      <div className="m-3">
        <div>
          <button> <h4 className="bg-[#343434] my-3 p-3">A Knowledge Treasure Trove</h4>
          </button>
        </div>
        <h3 className="text-4xl">Explore FutureTech's In-Depth Blog Posts</h3>
        </div>

        <button className="p-3 flex text-gray-400 rounded-xl m-3 bg-[#121212]">View All Blogs<ArrowUpRight className="mx-2" color="gold" size={20} />       </button>
 

      </div>
      <Cate/>
      <TrustedBy/>
      <WhyChoose/>
      <Pricing/>
      <Newsletter/>
      <Footer/>

    </div>
  );
}
