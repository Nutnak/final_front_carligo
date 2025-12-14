import React from "react";
import Image from "next/image";
import { Facebook, X, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    const companyLinks = [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#team" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
    ];

    const servicesLinks = [
        { name: "Buy Property", href: "#buy" },
        { name: "Sell Property", href: "#sell" },
        { name: "Rent Property", href: "#rent" },
        { name: "Property Management", href: "#management" },
    ];

    const resourcesLinks = [
        { name: "Blog", href: "#blog" },
        { name: "News", href: "#news" },
        { name: "Guides", href: "#guides" },
        { name: "FAQ", href: "#faq" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Disclaimer", href: "#disclaimer" },
    ];

    return (
        <footer className="bg-gray-900 text-white py-12" id="contact">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <p className="text-white font-bold text-xl">Bricklet</p>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner in finding the perfect
                            property. We make real estate simple and accessible.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-custom"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-custom"
                            >
                                <X size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-custom"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-custom"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-orange-500 transition-custom"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {servicesLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-orange-500 transition-custom"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {resourcesLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-orange-500 transition-custom"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Bricklet. All
                            rights reserved.
                        </div>
                        <div className="flex flex-wrap gap-4 md:justify-end">
                            {legalLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-gray-400 hover:text-orange-500 transition-custom text-sm"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
