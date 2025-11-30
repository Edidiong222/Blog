export default function Cate(){
    return(
        <div  className="p-10  lg:flex-row flex-col flex items-center  justify-between">
          
                <button className="px-5 w-full  text-sm m-3 py-5 border border-[#3f3f3f] rounded-xl ">All</button>
                <button className="px-5 w-full  text-sm m-3 py-5 border border-[#3f3f3f] rounded-xl "> <h2>Quantum Computing</h2></button>
                <button className="px-5 w-full text-sm m-3 py-5 border border-[#3f3f3f] rounded-xl "> AI Ethics</button>
                <button className="px-5 w-full text-sm m-3 py-5 border border-[#3f3f3f] rounded-xl ">Space Exploration</button>
                <button className="px-5 w-full text-sm  m-3 py-5 border border-[#3f3f3f] rounded-xl ">Biotechnology</button>
                <button className="px-5 w-full text-sm m-3 py-5 border border-[#3f3f3f] rounded-xl ">Renewable Energy</button>
       
        </div>
    )
}