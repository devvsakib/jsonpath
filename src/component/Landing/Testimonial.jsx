import { Carousel } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, EffectCreative, Autoplay } from 'swiper/modules';


const Testimonial = () => {
    const reviews = [
        {
            name: "Bharat Masimukku",
            ruleCompany: "Tech Head @ Grene Robotics",
            testimonial: `We as a company are leveraging on AI tech to drive autonomous decisions for our enterprise customers and it makes a lot of sensefor us to automate all our security and administrationrequirements of our infrastructure.This is where ${'process.env.NEXT_PUBLIC_PRODUCT_NAME'} stepsin and is doing a fantastic job for us.The entire Shunyeka teamis very supportive and are available for you any time of the dayor night.They help us focus on our product by addressing all oursecurity and infrastructure concerns.Thanks, Team Shunyeka andkeep up the good work.`

        },
        {
            name: "Natasha Remedios",
            ruleCompany: "Director @ Reynold’s Inc.",
            testimonial: `Being a traditional on-premises customer, moving to cloud wasdifficult for us. ShunyEka team has helped us migrate and automatemany of our security and operations tasks. We really appreciatetheir automation platform features ${'process.env.NEXT_PUBLIC_PRODUCT_NAME'} that is helping ourcloud services manage itself. We never have to call their CloudOpsteam for issue because their platform was managing the menialtasks. Kudos to ShunyEka for building such platform andservices!!!`

        }
    ]
    return (
        <>
            <div

                style={{
                    backgroundColor: '#fff !important',
                    padding: 0
                }}
            >
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    loop={true}
                    // autoplay={{
                    //     delay: 2000,
                    //     disableOnInteraction: false,
                    // }}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    modules={[EffectCreative, Autoplay]}
                    className="mySwiper"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center justify-center text-center p-5  backdrop-blur-xl md:p-10 rounded-[2rem]">
                                <div className="text-base mb-5">{review.testimonial}</div>
                                <div className="text-2xl font-semibold">{review.name}</div>
                                <div className="text-lg font-semibold">{review.ruleCompany}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Testimonial