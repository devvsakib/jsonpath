import Header from "../component/MainNavigation";
import { useEffect, useState } from "react";
import FeaturesGrid from "../component/Landing/FeaturesGrid";
import PricingTable from "../component/Pricing/PricingTable";
import { BiCheck, BiCode } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Carousel from "../component/Landing/Carousel";
import Testimonial from "../component/Landing/Testimonial";
import { Button } from "antd";
import Herosection from "../component/Landing/Herosection";

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

    const footerMenus = [
        {
            heading: "WHY autobotAI",
            menu: [{ title: "Use Case", link: "usecases" }]
        },
        {
            heading: "Rersources",
            menu: [
                { title: "Documentation", link: "doc" },
                { title: "Integrations", link: "integrations" },
                { title: "Whitepaper", link: "whitepaper" },
            ]
        },
        {
            heading: "Company",
            menu: [
                { title: "Contact Us", link: "mailto:hello@shunyeka.com" },
                { title: "FAQs", link: "faq" }
            ]
        },
        {
            heading: "Social",
            menu: [
                { title: "LinkedIn", link: "https://www.linkedin.com/company/shunyeka" }
            ]
        }
    ]

    return (
        <div className="!bg-darkBg min-h-screen text-white overflow-hidden">
            {/* <div className="fixed w-full">
                <Header />
            </div> */}
                <Herosection />
            <div className=" max-w-[1280px] mx-auto">
                {/* Banner Section */}
                <div className="grid-background"></div>

                {/* brand carousel */}
                <section className="h-screen mt-52 carouselBg mb-20 block">
                    <div className={"text-3xl md:text-4xl font-semibold mt-10 md:mt-0 text-center text-white mb-20 pt-24"}>Popular <span className="autobotGrad">Integrations</span></div>
                    <Carousel />
                </section>

                {/* Video section */}
                <section className="h-screen my-44">
                    <div className={"block md:hidden text-3xl md:text-5xl font-semibold mt-10 md:mt-0 text-center text-white autobotGrad"}>Why Automate?</div>
                    <div className={"hidden md:block text-3xl md:text-5xl font-semibold mt-10 md:mt-0 text-center text-white autobotGrad"}>Why Automate??</div>
                    <div className="md:w-2/4  mx-auto rounded-md mt-10 md:mt-20">
                        <video className='w-full rounded-lg border-black overflow-hidden' style={{ border: "1px solid" }} controls>
                            <source src="/videos/autobotAI 2024 new full.mp4" autoPlay={false} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>

                {/* How its work */}
                <section className="min-h-screen px-5 md:px-10 my-44 relative z-10">
                    <div className="home-header-light-pink"></div>
                    <div className="text-center max-w-[900px] mx-auto ">
                        <h2 className="text-3xl md:text-5xl inline-block font-semibold"> <span className="autobotGrad">How it works</span></h2>
                    </div>
                    <div className="grid justify-center mt-20">
                        <img src="/images/landing/howitworks.svg" className="w-3/4 mx-auto" />
                    </div>
                </section>

                {/* why autobotAi */}
                <section className="min-h-screen px-5 md:px-10">
                    <div className="text-center max-w-[900px] mx-auto ">
                        <h2 className="text-3xl md:text-5xl inline-block font-semibold">Why <span className="autobotGrad">autobotAI</span></h2>
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
                        <h3 className='autobotGrad text-3xl md:text-5xl inline-block'>Features</h3>
                    </div>
                    <FeaturesGrid />
                </section>

                {/* Testimonial */}
                <section className="min-h-screen py-20 mt-20 px-5 md:px-10">
                    <div className={"text-center mb-20"}>
                        <h3 className='autobotGrad text-3xl md:text-5xl inline-block'>Customer Review</h3>
                    </div>
                    <div className="w-2/3 mx-auto">
                        <Testimonial />
                    </div>
                </section>
            </div>

            {/* Pricing section */}
            <section className="min-h-screen relative" id="pricing">
                <div className="pricing-overlay py-20  ">
                    <div style={{
                        zIndex: 1,
                    }}>
                        <div className={"text-center mb-10 px-5 md:px-20"}>
                            <h3 className='text-white text-3xl pb-2 md:text-5xl inline-block autobotGrad'>Pricing</h3>
                            <p className="text-base text-white/70 md:w-3/5 mx-auto">
                                Supercharge your Cloud & Security Operations with autobotAI. Choose the optimal plan tailored to your needs and experience the power of hyperautomation.
                            </p>
                        </div>
                        <PricingTable />
                    </div>
                </div>
            </section>

            <section className=" relative py-20" id="footer">
                <div className="max-w-[1280px] mx-auto">
                    {/* #36A4F5 */}
                    <div className="mb-20 bg-gradient-to-r  to-[#16161650] from-[#DF638F50] p-20 rounded-lg relative flex justify-between items-center max-w-4xl mx-auto">
                        <div>
                            <h3 className="font-bol text-3xl mb-1">Try <span className="autobotGrad">autobotAI</span> today!</h3>
                            <p className="text-xl">Streamline tasks with AI-powered <br /> automation.</p>
                        </div>
                        <a href="#" className="border-none rounded-md text-white text-2xl p-2 bg-gradient-to-r from-ai-orange to-ai-pink px-4">Contact Us</a>
                    </div>
                    <div>
                        <img src="/images/landing/logo_for_dark.svg" className="w-1/5" />
                    </div>
                    <div>
                        <div className="grid md:grid-cols-4 gap-10 mt-10 justify-center">
                            {
                                footerMenus.map((menu, index) => (
                                    <div key={index}>
                                        <h4 className="text-gray-400 text-lg font-semibold mb-3">{menu.heading}</h4>
                                        <ul className="text-white text-base">
                                            {
                                                menu.menu.map((item, i) => (
                                                    <li key={i} className="cursor-pointer hover:text-ai-pink">
                                                        <a href={`#${item.link}`}>{item.title}</a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default LandingPage;
