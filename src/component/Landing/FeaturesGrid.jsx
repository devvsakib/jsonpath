import { images } from "../../config/images"
import FeaturesCard from "./FeaturesCard"

export default function FeaturesGrid() {
    const featureData = [
        {
            
            video: images.integrations_gif,
            title: 'Integrate with everything',
            description: "autobotAI provides flexibility to connect to any tools out there with API. It could be any security tools, cloud platforms, custom applications etc. State of the art HyperAutomation services can help you build any custom integration required.",
            button: { text: 'Explore all', link: '/integrations' }
        },
        {
            direction: "right",
            video: images.drag_n_drop_gif,
            title: "Streamline Automation with Drag-and-Drop Builder",
            description: "Create reusable building blocks for bots with autobotAI's intuitive GUI, and build bots with effortless drag-and-drop functionality."
        },
        {
            video: images.approval_gif,
            title: "Enhance Decision-Making with Contextual Approvals",
            description: "autobotAI ensures critical operations, like incident response and remediation, are supported by LLM-driven contextual summaries and notifications, enabling ITOps, SOC, and CloudOps teams to make swift, informed approval decisions.",
        },
        {
            direction: "right",
            video: images.data_visualization_gif,
            title: "Custom Dashboard for 360° view of cloud.",
            description: "autobotAI provides highly accurate and useful visualization. This provides you a birds view of how things are going and you can act quickly if anything does not seem right."
        },
        {
            video: images.inventory_gif,
            title: "Automation Insights",
            description: "Gain essential insights into compliance violations, incidents, and resource inventories. These insights support process and task mining, enabling the creation of targeted automation workflows with AI-driven assistance."
        }
    ]
    return (
        <div className="grid gap-52">
            {
                featureData.map((item, idx) => <FeaturesCard
                    id={idx + 1}
                    video={item.video}
                    title={item.title}
                    description={item.description}
                    button={item?.button}
                    direction={item?.direction}
                />)
            }
        </div>
    )
}