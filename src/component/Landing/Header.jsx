import { Dropdown } from "antd";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
    const links = {
        main: [
            { text: 'Bot Library', href: "/library" },
            { text: "Pricing", href: "/#pricing" },
            { text: "Documentation", href: "/docs" },
        ],
        resources: [
            { text: "Integrations", href: "/integrations" },
            { text: "Use Case", href: "/usecases" },
            { text: "Whitepaper", href: "/whitepaper" },
        ]
    };

    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isNavOpen]);

    const toggleNav = () => setIsNavOpen(!isNavOpen)

    return (
        <header className="flex justify-between items-center py-3 px-5 md:px-10 fixed w-full bg-darkBg">
            <div>
                <a href="/">
                    <img src="/images/landing/logo_for_dark.svg" className="w-1/2" />
                </a>
            </div>
            <div className="flex items-center  gap-4">
                {links.main.map((link, index) => {
                    return (
                        <a key={index} href={link.href} target={link?.target} legacyBehavior>
                            <div
                                onClick={toggleNav}
                                className={" " + link?.className + " cursor-pointer"}
                            >
                                {link.text}
                            </div>
                        </a>
                    );
                })}
                <Dropdown
                    menu={{
                        items: links.resources.map((link, index) => ({
                            key: index,
                            label: <a href={link.href} legacyBehavior>
                                <div onClick={toggleNav}>
                                    {link.text}
                                </div>
                            </a>

                        }))
                    }}
                >
                    <div className={" -mb-0 cursor-pointer"}>
                        Resources
                    </div>
                </Dropdown>
                <Dropdown
                    menu={{
                        items:
                            [
                                {
                                    key: 1,
                                    label: <a to="/mdr" legacyBehavior>
                                        <div onClick={toggleNav}>
                                            Managed Services Partner
                                        </div>
                                    </a>
                                },
                                {
                                    key: 2,
                                    label: <a href="/partner" legacyBehavior>
                                        <div onClick={toggleNav}>
                                            Become a Partner
                                        </div>
                                    </a>
                                }
                            ]
                    }}
                >
                    <div className={" -mb-0 cursor-pointer"}>
                        Partner Central
                    </div>
                </Dropdown>

                <a href={"#"} legacyBehavior>
                    <button
                        onClick={toggleNav}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            background: 'linear-gradient(to right, orange, rgb(236 72 120))',
                            color: "white",
                            padding: "0.4rem 1rem",
                        }}
                        className="rounded"
                    >
                        Login
                    </button>
                </a>
            </div>
        </header>
    );
};

export default Header;
