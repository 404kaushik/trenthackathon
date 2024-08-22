import React from "react";
import pic from '../assets/apply_fox-cropped.svg'
import Team from "./Team";

const Apply = () => {
    return(
        <div id='applications' className="mb-20">
            <div className="grid place-items-center">
                <h1 className='sm:mt-10 lg:mt-20 text-5xl sm:text-8xl md:text-8xl text-center font-potta-one font-normal leading-none text-[#f9f5e3]'> Applications </h1>
                <p className='w-[100%] text-lg font-space-mono text-[#f9f5e3] text-center font-normal leading-loose mt-3 rounded-xl'>Apply as a Volunteer, Mentor or a Hacker!</p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap">
                <div className="md:w-1/2 flex flex-col justify-center mx-auto items-center md:items-end ">
                    <button className='w-[100%] md:w-[85%] lg:max-w-96 px-6 bg-[#36382E] my-3 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Volunteer
                    </button>
                    <button className='w-[100%] md:w-[85%] lg:max-w-96 px-6 bg-[#36382E] my-3 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Mentor
                    </button>
                    <button className='w-[100%] md:w-[85%] lg:max-w-96 px-6 bg-[#36382E] my-3 h-24 rounded-[16px] text-2xl font-space-mono text-[#F9F5E3] transition ease-in-out delay-100 hover:font-bold hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100'>
                        Apply as Hacker
                    </button>
                </div>
                <div className="sm:w-full md:w-1/2 md:mt-10">
                    <img src={pic} alt="" className="w-[70%] mt-10 md:mt-0 md:w-[80%] xl:w-[60%] mx-auto object-cover standing-fox "/>
                </div>
            </div>
            <Team />
        </div>
    )
}

export default Apply;