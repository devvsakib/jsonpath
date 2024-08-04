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
        "botExecution": "Up to 7000",
        "cloudPlatformAndKubernetesAccountIntegration": 2,
        "threatIntelligenceToolsIntegrationForEnrichment": "Unlimited",
        "threatDetectionToolsIntegration": "Unlimited",
        "externalAttackSurfaceToolIntegration": "Unlimited",
        "vulnerabilityDetectionToolsIntegration": "Unlimited",
        "siemIntegrations": "Unlimited",
        "observabilityToolIntegration": "Unlimited",
        "developerToolsIntegration": "Unlimited",
        "uptimeMonitoringToolsIntegration": "Unlimited",
        "notificationsAndCollaborationToolsIntegration": "Unlimited",
        "secretsDetectionAndCredentialsCompromiseDetectionToolIntegration": "Unlimited",
        "systemAdministrationToolIntegration": "Unlimited",
        "ticketingToolIntegration": "Unlimited",
        "workspaceDeploymentOption": "No",
        "complianceInsightForAutomationTaskMining": "Yes",
        "inventoryObservability": "Yes",
        "openAIIntegration": "Yes",
        "amazonBedrockIntegration": "Yes",
        "customLocalModels": "No",
        "autobotAiSupport": "Yes",
        "basicAutomationSupportAnnually": 3,
        "enterpriseAutomationSupport": "Unlimited",
        "price": "$500"
    },
    {
        "key": 3,
        "pricingModel": "Standard",
        "botExecution": "Up to 20000",
        "cloudPlatformAndKubernetesAccountIntegration": 5,
        "threatIntelligenceToolsIntegrationForEnrichment": "Unlimited",
        "threatDetectionToolsIntegration": "Unlimited",
        "externalAttackSurfaceToolIntegration": "Unlimited",
        "vulnerabilityDetectionToolsIntegration": "Unlimited",
        "siemIntegrations": "Unlimited",
        "observabilityToolIntegration": "Unlimited",
        "developerToolsIntegration": "Unlimited",
        "uptimeMonitoringToolsIntegration": "Unlimited",
        "notificationsAndCollaborationToolsIntegration": "Unlimited",
        "secretsDetectionAndCredentialsCompromiseDetectionToolIntegration": "Unlimited",
        "systemAdministrationToolIntegration": "Unlimited",
        "ticketingToolIntegration": "Unlimited",
        "workspaceDeploymentOption": "No",
        "complianceInsightForAutomationTaskMining": "Yes",
        "inventoryObservability": "Yes",
        "openAIIntegration": "Yes",
        "amazonBedrockIntegration": "Yes",
        "customLocalModels": "No",
        "autobotAiSupport": "Yes",
        "basicAutomationSupportAnnually": 5,
        "enterpriseAutomationSupport": "Unlimited",
        "price": "$1000"
    },
    {
        "key": 4,
        "pricingModel": "Enterprise",
        "botExecution": "Unlimited",
        "cloudPlatformAndKubernetesAccountIntegration": "Unlimited",
        "threatIntelligenceToolsIntegrationForEnrichment": "Unlimited",
        "threatDetectionToolsIntegration": "Unlimited",
        "externalAttackSurfaceToolIntegration": "Unlimited",
        "vulnerabilityDetectionToolsIntegration": "Unlimited",
        "siemIntegrations": "Unlimited",
        "observabilityToolIntegration": "Unlimited",
        "developerToolsIntegration": "Unlimited",
        "uptimeMonitoringToolsIntegration": "Unlimited",
        "notificationsAndCollaborationToolsIntegration": "Unlimited",
        "secretsDetectionAndCredentialsCompromiseDetectionToolIntegration": "Unlimited",
        "systemAdministrationToolIntegration": "Unlimited",
        "ticketingToolIntegration": "Unlimited",
        "workspaceDeploymentOption": "Yes",
        "complianceInsightForAutomationTaskMining": "Yes",
        "inventoryObservability": "Yes",
        "openAIIntegration": "Yes",
        "amazonBedrockIntegration": "Yes",
        "customLocalModels": "Yes",
        "autobotAiSupport": "Yes",
        "basicAutomationSupportAnnually": 24,
        "enterpriseAutomationSupport": "Unlimited",
        "price": "$1500"
    }
];


const PricingCard = ({ plan }) => {


    const renderFeature = (key, value) => {
        // const isCheckmark = value === 'Yes' || value === 'Unlimited' || key === 'cloudPlatformAndKubernetesAccountIntegration'
        const isCross = value === 'No';
        const isExecution = key === 'botExecution';

        let displayKey;
        if (key === 'autobotAiSupport') {
            displayKey = 'autobotAI Support';
        } else if (key === 'openAIIntegration') {
            displayKey = 'OpenAI Integration';
        } else if (key === 'enterpriseAutomationSupport') {
            displayKey = 'Automation Support (Contact us)';
        }
        else {
            displayKey = key.split(/(?=[A-Z])/).join(' ');
        }
        return (
            <li key={key} className="flex items-start">
                {isCross ? <BsFillXCircleFill className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                    : isExecution ? <BiBot className="text-yellow-400 mr-2 -ml-1 mt-1 text-lg flex-shrink-0" /> :
                    <BsFillCheckCircleFill className="text-green-500 mr-2 mt-1 flex-shrink-0" />}
                {}
                <span className="text-base capitalize">
                    {`${!["Yes", "No"].includes(value) ? value : ""} ${displayKey}`}
                </span>
            </li>
        );
    };
    return (
        <div className="bg-white dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-900/50 ring-gray-300/70 dark:ring-gray-700 max-w-lg ring-1 rounded-3xl p-8 xl:p-10 mb-8 pricing-contrast flex flex-col"  >
            {/* <div className="flex flex-col p-6 rounded-lg bg-gray-900/80 w-full max-w-sm mx-auto mb-8 backdrop-blur-md"> */}

            <h3 className="text-3xl font-bold text-center mb-5">{plan.pricingModel}</h3>
            {/* <h3 className="text-3xl font-bold text-center mb-5">{plan.price} <span className='dark:text-gray-400 text-gray-600 text-base font-semibold leading-6'>/month</span></h3> */}
            <Button className="w-full h-10 mb-2 bg-gradient-to-r from-ai-pink to-ai-orange border-none text-white hover:!text-white">
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