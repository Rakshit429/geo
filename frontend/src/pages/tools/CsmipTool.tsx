import React from "react";
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { runCsmipCalculation } from "../../lib/api";

export default function CsmipTool() {
    const { isLoaded, isSignedIn } = useAuth();
    const [result, setResult] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <div>Unauthorized</div>;

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const res = await runCsmipCalculation({ "test": "data" });
            setResult(res);
        } catch (e) {
            console.error(e);
            setResult({ status: "error", message: "Failed to run calculation" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-primary-dark">CSMIP Tool</h1>
                <p className="text-sm text-text-muted mt-1">Site Response Analysis using authentic ground motion records.</p>
            </div>

            <div className="bg-white p-6 border border-border shadow-sm rounded-xl">
                <h2 className="text-lg font-medium text-primary-dark mb-4">Run Analysis</h2>
                <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    {loading ? "Running..." : "Test Dummy Calculation"}
                </button>

                {result && (
                    <div className="mt-8">
                        <h3 className="text-md font-medium text-primary-dark mb-2">Results</h3>
                        <pre className="bg-gray-50 p-4 rounded-md border border-border text-xs overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
