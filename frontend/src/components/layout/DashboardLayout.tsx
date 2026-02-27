import React, { useState } from "react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UserCircle, Calculator, X } from "lucide-react"; // Icons

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const NavLink = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
        const isActive = location.pathname.startsWith(to);
        return (
            <Link
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${
                    isActive 
                    ? 'bg-primary-50 text-primary border-r-4 border-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                } flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors`}
            >
                <Icon className="h-5 w-5" />
                {label}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-base">
            <Header onMenuClick={toggleMenu} />

            <div className="flex-1 container max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8">
                
                {/* SIDEBAR - Desktop: Always visible | Mobile: Toggled */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none md:bg-transparent md:block
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex flex-col h-full md:min-h-[calc(100vh-8rem)] md:border-r md:border-gray-200 md:pr-4">
                        
                        {/* Mobile Header in Sidebar */}
                        <div className="md:hidden p-4 flex justify-between items-center border-b">
                            <span className="font-bold text-primary">Menu</span>
                            <button onClick={toggleMenu}><X className="h-6 w-6" /></button>
                        </div>

                        {/* TOOLS SECTION (Top) */}
                        <div className="py-4">
                            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Analysis Tools
                            </h3>
                            <nav className="space-y-1">
                                <NavLink to="/tools/csmip" icon={Calculator} label="CSMIP Analysis" />
                                {/* Add more tools here later */}
                            </nav>
                        </div>

                        {/* PROFILE SECTION (Bottom) */}
                        <div className="mt-auto py-4 border-t md:border-t-0 border-gray-100">
                             <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Account
                            </h3>
                            <nav className="space-y-1">
                                <NavLink to="/profile" icon={UserCircle} label="Edit Profile" />
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile when menu is open */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={toggleMenu}
                    />
                )}

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}