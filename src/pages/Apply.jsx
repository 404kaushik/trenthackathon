import React from "react";
import pic from '../assets/apply_fox.svg'

const Apply = () => {
    return(
        <div className="">
            <div className="grid place-items-center">
                <h1 className='text-center font-potta-one text-8xl font-normal leading-none text-[#f9f5e3]'> Applications </h1>
                <p className='text-lg font-space-mono text-[#f9f5e3] w-3/5 text-center font-normal leading-loose mt-3 rounded-xl'>Apply as a Volunteer, Mentor or a Hacker!</p>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col items-center justify-center">
                    <button className='bg-[#36382E] my-3 w-96 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Hacker
                    </button>
                    <button className='bg-[#36382E] my-3 w-96 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Hacker
                    </button>
                    <button className='bg-[#36382E] my-3 w-96 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Hacker
                    </button>
                </div>
                <div className="w-[150px] h-[173.16px] md:w-[390px] md:h-[540.26px] mx-3 flex items-center justify-center">
                    <img src={pic} alt="" className="w-full h-full md:w-full md:h-full rounded-t-[245px] rounded-b-[245px] object-cover "/>
                </div>
            </div>
        </div>
    )
}

export default Apply;