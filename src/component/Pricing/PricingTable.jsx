import { Button } from 'antd';
import { BsFillCheckCircleFill, BsFillXCircleFill, BsGearFill } from 'react-icons/bs';
import { GiExecutionerHood } from 'react-icons/gi';
import { images } from '../../config/images';
import { FaBots } from 'react-icons/fa6';
import { CgBot } from 'react-icons/cg';
import { BiBot } from 'react-icons/bi';

const pricingData = [
    {
        "key": 2,
        "pricingModel": "Starter",
        "Bot_Execution": "Up to 7000",
        "Cloud_Platform_And_Kubernetes_Account_Integration": 2,
        "Threat_Intelligence_Tools_Integration_For_Enrichment": "Unlimited",
        "Threat_Detection_Tools_Integration": "Unlimited",
        "External_Attack_Surface_Tool_Integration": "Unlimited",
        "Vulnerability_Detection_Tools_Integration": "Unlimited",
        "SIEM_Integrations": "Unlimited",
        "Observability_Tool_Integration": "Unlimited",
        "Developer_Tools_Integration": "Unlimited",
        "Uptime_Monitoring_Tools_Integration": "Unlimited",
        "Notifications_And_Collaboration_Tools_Integration": "Unlimited",
        "Secrets_Detection_And_Credentials_Compromise_Detection_Tool_Integration": "Unlimited",
        "System_Administration_Tool_Integration": "Unlimited",
        "Ticketing_Tool_Integration": "Unlimited",
        "Workspace_Deployment_Option": "No",
        "Compliance_Insight_For_Automation_Task_Mining": "Yes",
        "Inventory_Observability": "Yes",
        "OpenAI_Integration": "Yes",
        "Amazon_Bedrock_Integration": "Yes",
        "Custom_Local_Models": "No",
        "autobotAI_Support": "Yes",
        "Basic_Automation_Support_Annually": 3,
        "AutobotAI_Platform_Support": "Unlimited",
        "price": "$500"
    },
    {
        "key": 3,
        "pricingModel": "Standard",
        "Bot_Execution": "Up to 20000",
        "Cloud_Platform_And_Kubernetes_Account_Integration": 5,
        "Threat_Intelligence_Tools_Integration_For_Enrichment": "Unlimited",
        "Threat_Detection_Tools_Integration": "Unlimited",
        "External_Attack_Surface_Tool_Integration": "Unlimited",
        "Vulnerability_Detection_Tools_Integration": "Unlimited",
        "SIEM_Integrations": "Unlimited",
        "Observability_Tool_Integration": "Unlimited",
        "Developer_Tools_Integration": "Unlimited",
        "Uptime_Monitoring_Tools_Integration": "Unlimited",
        "Notifications_And_Collaboration_Tools_Integration": "Unlimited",
        "Secrets_Detection_And_Credentials_Compromise_Detection_Tool_Integration": "Unlimited",
        "System_Administration_Tool_Integration": "Unlimited",
        "Ticketing_Tool_Integration": "Unlimited",
        "Workspace_Deployment_Option": "No",
        "Compliance_Insight_For_Automation_Task_Mining": "Yes",
        "Inventory_Observability": "Yes",
        "OpenAI_Integration": "Yes",
        "Amazon_Bedrock_Integration": "Yes",
        "Custom_Local_Models": "No",
        "autobotAI_Support": "Yes",
        "Basic_Automation_Support_Annually": 5,
        "AutobotAI_Platform_Support": "Unlimited",
        "price": "$1000"
    },
    {
        "key": 4,
        "pricingModel": "Enterprise",
        "Bot_Execution": "Unlimited",
        "Cloud_Platform_And_Kubernetes_Account_Integration": "Unlimited",
        "Threat_Intelligence_Tools_Integration_For_Enrichment": "Unlimited",
        "Threat_Detection_Tools_Integration": "Unlimited",
        "External_Attack_Surface_Tool_Integration": "Unlimited",
        "Vulnerability_Detection_Tools_Integration": "Unlimited",
        "SIEM_Integrations": "Unlimited",
        "Observability_Tool_Integration": "Unlimited",
        "Developer_Tools_Integration": "Unlimited",
        "Uptime_Monitoring_Tools_Integration": "Unlimited",
        "Notifications_And_Collaboration_Tools_Integration": "Unlimited",
        "Secrets_Detection_And_Credentials_Compromise_Detection_Tool_Integration": "Unlimited",
        "System_Administration_Tool_Integration": "Unlimited",
        "Ticketing_Tool_Integration": "Unlimited",
        "Workspace_Deployment_Option": "Yes",
        "Compliance_Insight_For_Automation_Task_Mining": "Yes",
        "Inventory_Observability": "Yes",
        "OpenAI_Integration": "Yes",
        "Amazon_Bedrock_Integration": "Yes",
        "Custom_Local_Models": "Yes",
        "autobotAI_Support": "Yes",
        "Basic_Automation_Support_Annually": 24,
        "AutobotAI_Platform_Support": "Unlimited",
        "price": "$1500"
    }
];


const PricingCard = ({ plan }) => {


    const renderFeature = (key, value) => {
        const isCross = value === 'No';
        const isExecution = key === 'Bot_Execution';

        return (
            <li key={key} className="flex items-start">
                {isCross ? <BsFillXCircleFill className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                    : isExecution ? <BiBot className="text-yellow-400 mr-2 -ml-1 mt-1 text-lg flex-shrink-0" /> :
                    <BsFillCheckCircleFill className="text-green-500 mr-2 mt-1 flex-shrink-0" />}
                {}
                <span className="text-base capitalize">
                    {`${!["Yes", "No", "Unlimited"].includes(value) ? value : ""} ${key.split("_").join(' ')}`}
                </span>
            </li>
        );
    };
    return (
        <div className="bg-white dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-900/50 ring-gray-300/70 dark:ring-gray-700 max-w-lg ring-1 rounded-3xl p-5 md:p-8 mb-8 pricing-contrast flex flex-col"  >
            {/* <div className="flex flex-col p-6 rounded-lg bg-gray-900/80 w-full max-w-sm mx-auto mb-8 backdrop-blur-md"> */}

            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">{plan.pricingModel}</h3>
            {/* <h3 className="text-3xl font-bold text-center mb-5">{plan.price} <span className='dark:text-gray-400 text-gray-600 text-base font-semibold leading-6'>/month</span></h3> */}
            <Button className="h-auto text-lg mb-2 bg-gradient-to-l from-ai-pink/90 to-ai-orange border-none text-white hover:!text-white">
                Demo
            </Button>
            <a
                href="https://shunyeka.zohobookings.in/#/customer/182672000000028016?booknow=true"
                target="_blank"
                className="text-yellow-400 hover:text-blue-300 underline mb-6 text-center mx-auto"
            >
                14 day trial
            </a>
            <ul className="text-left w-full grid gap-4">
                {Object.entries(plan).map(([key, value]) => {
                    if (['key', 'pricingModel', 'price'].includes(key)) return null;
                    return renderFeature(key, value);
                })}
            </ul>
        </div>
    );
};

const PricingTable = () => {
    return (
        <div className="p-4 text-white">
            <div className="max-w-7xl relative mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.map((plan) => (
                        <PricingCard key={plan.key} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTable;