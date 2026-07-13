import React, { ReactNode } from "react";
import Link from "next/link";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-slate-900 text-white p-4 shadow-sm">
                <nav className="flex flex-wrap gap-4 text-sm font-medium">
                    <Link href="/" className="hover:text-blue-300 transition-colors">
                        Home
                    </Link>
                    <Link href="/sandbox" className="hover:text-blue-300 transition-colors">
                        Sandbox
                    </Link>
                    <Link href="/pl" className="hover:text-blue-300 transition-colors">
                        PL
                    </Link>
                </nav>
            </header>

            <main className="flex-grow container mx-auto p-4">{children}</main>

            <footer className="bg-slate-900 text-white p-4 text-center text-sm">
                &copy; {new Date().getFullYear()} TYPO3 Headless PWA Demo
            </footer>
        </div>
    );
};

export default DefaultLayout;
