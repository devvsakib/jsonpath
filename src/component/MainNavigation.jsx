import { Dropdown } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const MainNavigation = () => {
    const isLandingPage = useLocation().pathname.includes("landingpage");

    const links = {
        main: [
            { text: 'JSON Tree', href: "/jsontree" },
            { text: "Landing", href: "/landingpage" },
            { text: "QB", href: "/querybuilder" },
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
        <header className={`top-0 left-0 flex justify-between items-center py-3 px-5 md:px-10 fixed w-full ${isLandingPage && "bg-darkBg"}`}>
            <div>
                <Link to="/">
                    <img src="/images/landing/logo_for_dark.svg" className="w-1/2" />
                </Link>
            </div>
            <div className="flex items-center  gap-4">
                {links.main.map((link, index) => {
                    return (
                        <Link key={index} to={link.href} target={link?.target} legacyBehavior>
                            <div
                                onClick={toggleNav}
                                className={" " + link?.className + " cursor-pointer"}
                            >
                                {link.text}
                            </div>
                        </Link>
                    );
                })}
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

export default MainNavigation;
