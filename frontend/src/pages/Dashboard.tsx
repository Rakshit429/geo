import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight, Clock, Hammer } from "lucide-react";

export default function Dashboard() {
    const { user } = useUser();

    // Get user's first name or fallback
    const firstName = user?.firstName || user?.fullName?.split(' ')[0] || "User";

    // Use last signed in date from Clerk
    const lastSignIn = user?.lastSignInAt ? new Date(user.lastSignInAt) : new Date();

    // Format date nicely
    const formattedDate = lastSignIn.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = lastSignIn.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-8">
            {/* Header Greeting Section */}
            <div>
                <h1 className="text-2xl font-semibold text-primary-dark">
                    Good morning, {firstName}! <span className="text-xl">👋</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Last login: {formattedDate} at {formattedTime}
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-border shadow-sm rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Hammer className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Tools Used</p>
                        <h3 className="text-2xl font-bold text-primary-dark">2</h3>
                    </div>
                </div>

                <div className="bg-white p-6 border border-border shadow-sm rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full text-green-600">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                        <h3 className="text-2xl font-bold text-primary-dark">Today</h3>
                    </div>
                </div>
            </div>

            {/* Your Tools Section */}
            <div>
                <h2 className="text-sm font-bold tracking-tight mb-4 uppercase text-gray-400">
                    Your Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* CSMIP Tool Card */}
                    <div className="bg-white p-6 flex flex-col border border-border shadow-sm rounded-xl hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Calculator className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-medium text-primary-dark mb-1">CSMIP Tool</h3>
                            <p className="text-sm text-muted-foreground min-h-[40px]">Site Response Analysis using authentic ground motion records.</p>
                        </div>
                        <div className="flex-1 text-sm text-muted-foreground mb-4">
                            <p>Last used: Just recently</p>
                        </div>
                        <div>
                            <Link to="/tools/csmip" className="w-full inline-block">
                                <button className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
                                    ACCESS <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Slope Stability Tool Card */}
                    <div className="bg-white p-6 flex flex-col border border-border shadow-sm rounded-xl hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-600">
                                <Hammer className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-medium text-primary-dark mb-1">Slope Stability</h3>
                            <p className="text-sm text-muted-foreground min-h-[40px]">Probabilistic slope stability analysis with customizable soil layers and geometry.</p>
                        </div>
                        <div className="flex-1 text-sm text-muted-foreground mb-4">
                            <p>New tool</p>
                        </div>
                        <div>
                            <Link to="/tools/slope-stability" className="w-full inline-block">
                                <button className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
                                    ACCESS <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
