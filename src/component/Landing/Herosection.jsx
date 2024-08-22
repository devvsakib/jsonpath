import React from "react";

const Herosection = () => {
    return <section className="grid mx-auto w-[1380px] items-center px-5 md:px-10 text-center h-screen z-10 relative  mb-20">
        <div className="min-h-[80vh] grid place-content-center">
            <div className="w-fit mx-auto">
                <img src="/images/landing/autobot_border.png" alt="logo" className="ttt w-1/3 mx-auto" />
            </div>
            <h2 className="my-5 text-xl md:text-8xl">Making Automation Easy</h2>
            <p className="text-gray-500 text-xl">Hyperautomate with NoCode, LowCode and FullCode</p>
        </div>
        <div className="flex gap-3 items-center">
            <div className="grid gap-4">
                <img src="/images/landing/banner_left_top.svg" alt="hero1" className="w-full" />
                <img src="/images/landing/banner_left_bottom.svg" alt="hero1" className="w-full" />
            </div>
            <img src="/images/landing/banner_middle.svg" alt="hero1" className="w-3/6 mx-auto" />
            <div className="grid gap-4">
                <img src="/images/landing/banner_right_top.svg" alt="hero1" className="w-full" />
                <img src="/images/landing/banner_right_bottom.svg" alt="hero1" className="w-full" />
            </div>
        </div>
    </section>;
};

export default Herosection;
