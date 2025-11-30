import { FaSpaceShuttle } from "react-icons/fa";
import { FaLaptop} from "react-icons/fa";




export default function FutureTech() {

    return (
        <div>
            <div className="flex md:flex-row flex-col items-center justify-center md:p-7 p-2 w-full border border-[#404040]">
                <div className="md:w-1/2">
                    <div className="text-4xl m-3"><FaSpaceShuttle color="gold" size={40} /></div>
                    <h2 className="text-4xl m-3">Future Technology Blog</h2>
                    <h4 className="text-gray-400 m-3">Stay informed with our blog section dedicated to future technology.</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2  gap-3  p-5">

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Quantity</h4>
                        <h5 className="text-gray-400 m-3">Over 1,000  articles on emerging tech trends and breakthroughs. </h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Variety</h4>
                        <h5 className="text-gray-400 m-3">Articles cover firlds like AI, robotics, biotechnology, and more</h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Frequency</h4>
                        <h5 className="text-gray-400 m-3">Fresh content added daily to keep  you up to date </h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Authoritative</h4>
                        <h5 className="text-gray-400 m-3">Written by our team of tech experts and industry professionals </h5>
                    </div>

                </div>
            </div>




            <div className="flex md:flex-row flex-col items-center justify-center p-3 w-full border border-[#404040]">
                <div className="md:w-1/2 ">
                    <div className="text-4xl m-3"><FaLaptop color="gold" size={40} /></div>
                    <h2 className="text-4xl m-3">Research Insight Blog</h2>
                    <h4 className="text-gray-400 m-3">Dive Into Future Technology concepts with our Research section </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2  gap-3  p-5">

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Depth</h4>
                        <h5 className="text-gray-400 m-3">500+ research articles for In-depth understanding. </h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Graphics</h4>
                        <h5 className="text-gray-400 m-3">Visual aids and infographics to enhance comprehension.</h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Trends</h4>
                        <h5 className="text-gray-400 m-3">Emerging trends in future technology research.</h5>
                    </div>

                    <div className="px-5 py-5 bg-[#202020] border border-[#404040] rounded-xl">
                        <h4 className="text-2xl m-3">Contributions</h4>
                        <h5 className="text-gray-400 m-3">Over 1,000  articles on emerging tech trends and breakthroughs. </h5>
                    </div>

                </div>
            </div>
        </div>
    )
}