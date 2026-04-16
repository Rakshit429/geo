import React, { useState } from "react";
import { BookOpen, FileText, Info, ChevronLeft, X } from "lucide-react";

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

interface ToolLayoutProps {
    children: React.ReactNode;
    sidebarItems?: SidebarItem[];
}

// Default sidebar items (placeholder structure)
const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = [
    {
        id: "docs",
        label: "Documentation",
        icon: <BookOpen className="h-6 w-6" />,
        content: (
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">📖 Documentation</h3>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                    Tool documentation will appear here.
                </div>
            </div>
        ),
    },
    {
        id: "references",
        label: "References",
        icon: <FileText className="h-6 w-6" />,
        content: (
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">📄 References</h3>
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
                    Related papers and references will appear here.
                </div>
            </div>
        ),
    },
    {
        id: "about",
        label: "About",
        icon: <Info className="h-6 w-6" />,
        content: (
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">ℹ️ About this Tool</h3>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
                    Tool information and version details will appear here.
                </div>
            </div>
        ),
    },
];

export default function ToolLayout({ children, sidebarItems }: ToolLayoutProps) {
    const items = sidebarItems || DEFAULT_SIDEBAR_ITEMS;
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(items[0]?.id || "");

    const activeItem = items.find((item) => item.id === activeTab);

    return (
        <div className="flex h-full relative">

            {/* Sidebar Toggle Strip — LEFT side, visible when closed */}
            {!isOpen && (
                <div className="fixed left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-0 rounded-r-xl overflow-hidden shadow-lg border border-l-0 border-gray-200 bg-white">
                    {items.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsOpen(true);
                            }}
                            title={item.label}
                            className={`group relative flex items-center gap-2 px-3.5 py-4 text-gray-500 hover:text-primary hover:bg-primary/5 transition-all duration-200 ${
                                idx !== items.length - 1 ? "border-b border-gray-100" : ""
                            }`}
                        >
                            {item.icon}
                            {/* Tooltip on hover */}
                            <span className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Sidebar Panel — LEFT side */}
            <aside
                className={`fixed left-0 top-14 bottom-0 z-20 w-96 bg-white border-r border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    {/* Tabs */}
                    <div className="flex gap-1">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                title={item.label}
                                className={`p-2.5 rounded-lg transition-all duration-200 ${
                                    activeTab === item.id
                                        ? "text-primary bg-primary/10 shadow-sm"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="p-3 overflow-y-auto h-[calc(100%-3.5rem)]">
                    {activeItem?.content}
                </div>
            </aside>

            {/* Overlay when sidebar is open (mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/10 z-15 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Tool Content */}
            <div className={`flex-1 min-w-0 transition-all duration-300 ${isOpen ? "ml-96" : "ml-0"}`}>
                {children}
            </div>
        </div>
    );
}
