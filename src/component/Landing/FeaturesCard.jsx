import { useMemo } from 'react';
import useWindowSize from '../../cHook/useWindowSize';

const FeaturesCard = ({ image, title, description, direction, video, button, id }) => {
    const { screenSize } = useWindowSize();
    let flexDirection = useMemo(() => {
        switch (direction) {
            case 'right':
                return 'row-reverse'
            default:
                return 'row'
        }
    }, [direction])

    return (
        <div
            className='flex gap-16'
            style={{
                // padding: "10vh 15vw",
                flexDirection: flexDirection,
                justifyContent: "space-between"
            }}
        >
            <div className='flex flex-col items-center'>
                <img
                    src={video}
                    className="lg:w-8/12 rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-xl"
                />
                <div className='relative flex flex-col mt-6 md:w-2/3 gap-2'
                    style={{
                        zIndex: 0,
                        textAlign: direction === 'right' && screenSize > 1024 ? 'right' : 'left',
                    }}
                >
                    <div className="text-xl text-white sm:text-2xl font-semibold">
                        {title}
                    </div>
                    <div className="text-base text-gray-300">
                        {description}
                    </div>

                    {
                        button &&
                        <div className="flex mt-1">
                            <a href={button.link} legacyBehavior>
                                <span className="text-white cursor-pointer !bg-ai-pink !to-ai-orange px-6 py-2 rounded-full text-sm font-">
                                    {button.text}
                                </span>
                            </a>
                        </div>
                    }
                </div>
            </div>
            <div className='text-[5rem] md:text-[13rem] flex items-center justify-center w-full'><span className='featureCount'>{id}</span></div>

        </div>
    );
}

export default FeaturesCard;
