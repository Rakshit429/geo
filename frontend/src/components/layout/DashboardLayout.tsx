import React from "react";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-base">
            <Header />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 min-w-0 mx-auto w-full px-6 py-4 md:px-12 lg:px-20 md:py-6">
                {children}
            </main>
        </div>
    );
}