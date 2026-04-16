import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

// Map routes to display titles
const PAGE_TITLES: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tools/csmip": "CSMIP Analysis",
    "/tools/slope-stability": "Slope Stability",
    "/profile": "Profile",
};

export default function Header() {
    const location = useLocation();
    const pageTitle = PAGE_TITLES[location.pathname] || "";
    const showBackButton = location.pathname !== "/dashboard";

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
            <div className="mx-auto flex h-14 items-center px-6 relative">

                {/* LEFT: Logo & Branding + Back Button */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Logo & Branding */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur text-white font-bold font-serif text-sm border border-white/10">
                            SGL
                        </div>
                        <div className="flex flex-col leading-tight">
                            <a
                                href="https://smartgeotechnics.iitd.ac.in/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold tracking-tight text-white hover:text-blue-300 transition-colors"
                            >
                                Smart Geotechnics Lab
                            </a>
                            <span className="text-[10px] text-slate-400 font-medium">IIT Delhi</span>
                        </div>
                    </div>

                    {/* Separator + Back Button */}
                    <SignedIn>
                        {showBackButton && (
                            <>
                                <div className="h-6 w-px bg-white/15 ml-1"></div>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                                    title="Back to Dashboard"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                            </>
                        )}
                    </SignedIn>
                </div>

                {/* CENTER: Page Title (absolutely centered) */}
                <SignedIn>
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
                        <h1 className="text-base font-semibold text-white/90 tracking-wide whitespace-nowrap">
                            {pageTitle}
                        </h1>
                    </div>
                </SignedIn>

                {/* RIGHT: Auth Buttons / Profile */}
                <div className="flex items-center gap-3 ml-auto shrink-0">
                    <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl="/tools/csmip">
                            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">Login</button>
                        </SignInButton>
                        <SignUpButton mode="modal" forceRedirectUrl="/tools/onboarding">
                            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-900/30 transition-all">
                                Get Access
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                        </Link>
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}