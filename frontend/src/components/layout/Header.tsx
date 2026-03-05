import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react"; // Make sure you have lucide-react installed

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button (Only visible when logged in on small screens) */}
                    <SignedIn>
                        <button onClick={onMenuClick} className="md:hidden p-2 text-primary">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SignedIn>

                    {/* Logo & Branding */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground font-bold font-serif text-lg">
                            SGL
                        </div>
                        <div className="flex flex-col">
                            <a
                                href="https://smartgeotechnics.iitd.ac.in/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-lg font-bold tracking-tight text-primary-dark hover:underline"
                            >
                                Smart Geotechnics Lab
                            </a>
                            <span className="text-xs text-muted-foreground font-medium">IIT Delhi</span>
                        </div>
                    </div>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl="/tools/csmip">
                            <Button variant="ghost" className="text-primary hover:bg-primary-50 text-base">Login</Button>
                        </SignInButton>
                        <SignUpButton mode="modal" forceRedirectUrl="/tools/onboarding">
                            <Button className="bg-primary hover:bg-primary-dark shadow-md text-primary-foreground text-base">
                                Get Access
                            </Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary-dark transition-colors font-semibold text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                        </Link>
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}