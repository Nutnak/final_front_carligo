import { Lexend } from "next/font/google";
import "./globals.css";
import UseSmoothScroll from "./_config/LenisScroll";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});


export const metadata = {
    title: "Carligo - Reservation",
    description:
        "Discover your dream home with our curated selection of luxury properties. Expert real estate services tailored to your lifestyle needs.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth overflow-x-hidden">
            <body
                cz-shortcut-listen="true"
                className={`${lexend.variable} font-lexend antialiased`}
            >
                <UseSmoothScroll>{children}</UseSmoothScroll>
            </body>
        </html>
    );
}
