import { images } from "../../config/images";
const imageData = [
    { name: "aws", src: images.aws },
    { name: "google", src: images.gcp_notext },
    { name: "azure", src: images.azure },
    { name: "slack", src: images.slack },
    { name: "jira", src: images.jira },
    { name: "git", src: images.git },
    { name: "ms_teams", src: images.ms_teams },
    { name: "aws_ses", src: images.aws_ses },
    { name: "google_chat", src: images.google_chat },
];
const imageData1 = [
    { name: "linux", src: images.linux },
    { name: "zendesk", src: images.zendesk },
    { name: "datadog", src: images.datadog },
    { name: "amazon_security_lake", src: images.amazon_security_lake },
    { name: "hibp", src: images.hibp },
    { name: "urlscan", src: images.urlscan },
    { name: "newrelic", src: images.newrelic },
    { name: "webhook", src: images.webhook },
    { name: "jumpcloud", src: images.jumpcloud },
];
const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Carousel = () => {
    const shuffledImageData = shuffleArray(imageData);
    return (
        <div className="pt-20">
            <div class="wrapper">
                {imageData.map((image, index) => (
                    <div className={`itemLeft item${index + 1}`} key={index}>
                        <div>
                            <img
                                src={image.src}
                                alt={image.name}
                                className={`mx-auto p-5 object-contain ${image.name === "google" ? 'w-[220px] mt-6' : 'w-[90px]'} h-auto`}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div class="wrapper">
                {imageData1.map((image, index) => (
                    <div className={`itemRight item${index + 1}`} key={index}>
                        <div>
                            <img
                                src={image.src}
                                alt={image.name}
                                className={`mx-auto p-5 object-contain ${image.name === "google" ? 'w-[220px] mt-6' : 'w-[90px]'} h-auto`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel;