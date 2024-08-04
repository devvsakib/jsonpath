import Header from "../component/MainNavigation";
import { useEffect, useState } from "react";
import FeaturesGrid from "../component/Landing/FeaturesGrid";
import PricingTable from "../component/Pricing/PricingTable";
import { BiCheck, BiCode } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Carousel from "../component/Landing/Carousel";

const LandingPage = () => {
    const [browserWidth, setBrowserWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            setBrowserWidth(window.innerWidth);
        };

        setBrowserWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //     return <section className="min-h-screen relative" id="pricing">
    //     <div className="pricing-overlay py-20  ">
    //         <div style={{
    //             zIndex: 1,
    //         }}>
    //             <div className={"text-center mb-10"}>
    //                 <h3 className='autobotGrad text-3xl md:text-4xl inline-block'>Pricing</h3>
    //             </div>
    //             <PricingTable />
    //         </div>
    //     </div>
    // </section>
    return (
        <div className="!bg-darkBg min-h-screen text-white">
            <Header />
            <div className="px-5 md:px-10">
                {/* Banner Section */}
                <section className="grid items-center justify-center text-center h-screen">
                    <div>
                        <div className='flex flex-col items-center text-center md:items-start'>
                            <p className={"text-2xl sm:text-3xl md:text-5xl font-bold autobotGrad lg:h-[60px] autobotGrad"}>
                                Making Automation Easy
                            </p>
                            <div className="mx-auto">Hyperautomate with NoCode, LowCode and FullCode flexibility.</div>
                        </div>
                        <a href='https://shunyeka.zohobookings.in/#/customer/182672000000028016?booknow=true' target='_blank' >
                            <button
                                className='w-fit mt-5 text-white rounded px-5 sm:px-6 py-2 bg-gradient-to-r from-ai-pink to-ai-orange hover:bg-gray-800 border-none cursor-pointer'
                                style={{
                                    background: 'linear-gradient(to right, orange, rgb(236 72 120))',
                                }}
                            >
                                Get a demo
                            </button>
                        </a>
                    </div>
                </section>

                {/* brand carousel */}
                <section className="h-screen">
                    <div className={"hidden md:block text-3xl md:text-4xl font-semibold mt-10 md:mt-0 text-center text-white "}>Popular <span className="autobotGrad">Integrations</span></div>
                    <Carousel />
                </section>

                {/* Video section */}
                <section className="h-screen">
                    <div className={"block md:hidden text-3xl md:text-4xl font-semibold mt-10 md:mt-0 text-center text-white"}>What is<span className="autobotGrad"> autobotAI</span>?</div>
                    <div className={"hidden md:block text-3xl md:text-4xl font-semibold mt-10 md:mt-0 text-center text-white "}>What is<span className="autobotGrad"> autobotAI</span>?</div>
                    <div className="md:w-2/4  mx-auto rounded-md mt-10 md:mt-20">
                        <video className='w-full rounded-lg border-black overflow-hidden' style={{ border: "1px solid" }} controls>
                            <source src="/videos/autobotAI_introductory.mp4" autoPlay={false} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>

                {/* why autobotAi */}
                <section className="min-h-screen">
                    <div className="text-center max-w-[900px] mx-auto ">
                        <h2 className="text-3xl md:text-4xl inline-block font-semibold">Why <span className="autobotGrad">autobotAI</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 justify-between mt-20">
                        <div>
                            {/* <h3 className="text-xl sm:text-3xl font-bold mb-2 bg-gradient-to-b from-white via-white/80 to-black bg-clip-text text-transparent">NoCode, LowCode & FullCode flexibility</h3> */}
                            <div className="text-sm sm:text-xl flex justify-between gap-2 mb-3"
                                style={{
                                    filter: " brightness(10)"
                                }}
                            >
                                <p className="flex items-center gap-2">
                                    <IoCloseSharp size={30} color='red' /> NoCode
                                </p>
                                <p className="flex items-center gap-2">
                                    <BiCode size={30} color='green' /> LowCode
                                </p>
                                <p className="flex items-center gap-2"
                                >
                                    <BiCheck size={30} color='green' /> FullCode flexibility
                                </p>
                            </div>
                            <div className="grid gap-5 text-base leading-9">
                                <p>Discover the new era of cloud management with autobotAI. Integrating Generative AI, autobotAI becomes an intelligent extension to your cloud and security teams, automating complex tasks with precision. </p>
                                <p>This advanced platform understands and acts on cloud events and security insights, offering tailored, context-aware automation. It's not just about doing tasks; it's about thinking ahead, ensuring your operations are always one step ahead with essential human oversight through its human approval system.</p>
                            </div>
                        </div>
                        <div>
                            <video className='w-full rounded-lg border-black' style={{ border: "1px solid" }} controls>
                                <source src="/videos/autobotAI_infographics.mp4" autoPlay={false} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <i className="text-sm text-gray">Watch this video to learn more.</i>
                        </div>
                    </div>
                </section>

                {/* Features section */}
                <section className="min-h-screen py-20 mt-20">
                    <div className={"text-center mb-20"}>
                        <h3 className='autobotGrad text-3xl md:text-4xl inline-block'>Features</h3>
                    </div>
                    <FeaturesGrid />
                </section>

            </div>
            {/* Pricing section */}
            <section className="min-h-screen relative" id="pricing">
                <div className="pricing-overlay py-20  ">
                    <div style={{
                        zIndex: 1,
                    }}>
                        <div className={"text-center mb-10"}>
                            <h3 className='text-white text-3xl pb-2 md:text-4xl inline-block autobotGrad'>Pricing</h3>
                            <p className="text-base font-semibold text-white/70 w-2/5 mx-auto">
                                Supercharge your Cloud & Security Operations with autobotAI. Choose the optimal plan tailored to your needs and experience the power of hyperautomation.
                            </p>
                        </div>
                        <PricingTable />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
