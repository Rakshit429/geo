import React from "react";
import { useAuth } from "@clerk/clerk-react";
// @ts-ignore
import SlopeStabilityApp from "../../components/tools/slope-stability/SlopeStabilityApp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ToolLayout from "../../components/layout/ToolLayout";
import { BookOpen, FileText, Info } from "lucide-react";

const defaultTheme = createTheme();

const slopeSidebarItems = [
    {
        id: "docs",
        label: "Documentation",
        icon: <BookOpen className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">📖 Slope Stability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Probabilistic slope stability analysis using chart solutions based on Janbu's simplified method (1968). Supports multi-layer soils with Monte Carlo simulation for reliability analysis.
                </p>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Geometry Parameters</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li><strong>H</strong> — Height of slope above toe (m)</li>
                        <li><strong>D</strong> — Depth below the toe (m)</li>
                        <li><strong>β</strong> — Slope angle (degrees)</li>
                        <li><strong>q</strong> — Surcharge pressure on crest (kPa)</li>
                        <li><strong>H<sub>t</sub></strong> — Height of tension crack (m)</li>
                        <li><strong>H<sub>w</sub></strong> — External water level above toe (m)</li>
                        <li><strong>H'<sub>w</sub></strong> — Piezometric level within slope (m)</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Soil Parameters</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li><strong>c</strong> — Cohesion (kPa, or s<sub>u</sub> for φ=0 soils)</li>
                        <li><strong>Φ</strong> — Internal friction angle (degrees)</li>
                        <li><strong>γ</strong> — Unit weight of soil (kN/m³)</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                        Each parameter can be specified as constant, normal, or exponential distribution with mean and CoV for probabilistic analysis.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Analysis Workflow</h4>
                    <ol className="text-sm text-gray-600 space-y-1.5 list-decimal pl-4">
                        <li>Define slope geometry (H, D, β, q, H<sub>t</sub>, H<sub>w</sub>)</li>
                        <li>Specify number of soil layers and their properties</li>
                        <li>Set probabilistic parameters (number of realizations, target FoS)</li>
                        <li>Run Monte Carlo analysis</li>
                        <li>Review FoS distribution, CDF, and critical slip surfaces</li>
                    </ol>
                </div>
            </div>
        ),
    },
    {
        id: "references",
        label: "References",
        icon: <FileText className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">📄 Theory & Equations</h3>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Factor of Safety</h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono text-center space-y-2">
                        <p>F = N₀ · c / P<sub>d</sub></p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        where N₀ is the stability number (from charts), c is average cohesion, and P<sub>d</sub> is the dimensionless loading parameter.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">For Φ = 0 soils</h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono text-center space-y-2">
                        <p>P<sub>d</sub> = (γH + q − γ<sub>w</sub>H<sub>w</sub>) / (μ<sub>q</sub> · μ<sub>w</sub> · μ<sub>t</sub>)</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">For Φ &gt; 0 soils</h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono text-center space-y-2">
                        <p>P<sub>e</sub> = (γH + q − γ<sub>w</sub>H'<sub>w</sub>) / (μ<sub>q</sub> · μ'<sub>w</sub>)</p>
                        <p>λ<sub>cΦ</sub> = P<sub>e</sub> · tan Φ / c</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Weighted Averages</h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono text-center space-y-2">
                        <p>c<sub>av</sub> = Σ(δ<sub>i</sub>·c<sub>i</sub>) / Σδ<sub>i</sub></p>
                        <p>Φ<sub>av</sub> = Σ(δ<sub>i</sub>·Φ<sub>i</sub>) / Σδ<sub>i</sub></p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        where δ<sub>i</sub> = central angle of arc within zone i, c<sub>i</sub> = cohesion in zone i, Φ<sub>i</sub> = friction angle in zone i.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Adjustment Factors</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li><strong>μ<sub>q</sub></strong> — Surcharge adjustment (Fig A.2)</li>
                        <li><strong>μ<sub>w</sub></strong> — Submergence adjustment (Fig A.3)</li>
                        <li><strong>μ<sub>t</sub></strong> — Tension crack adjustment (Fig A.4)</li>
                        <li><strong>μ'<sub>w</sub></strong> — Seepage correction (Fig A.3)</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                        If no surcharge: μ<sub>q</sub> = 1; if no external water: μ<sub>w</sub> = 1; if no tension cracks: μ<sub>t</sub> = 1.
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">References</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="border-l-2 border-blue-300 pl-3">
                            Duncan, J.M., Wright, S.G., and Brandon, T.L. (2014). <em>Soil Strength and Slope Stability</em>, 2nd Edition, Chapter 4 & Appendix A. John Wiley & Sons.
                        </li>
                        <li className="border-l-2 border-blue-300 pl-3">
                            Janbu, N. (1968). <em>Slope Stability Computations.</em> Soil Mechanics and Foundation Engineering Report, Technical University of Norway, Trondheim.
                        </li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        id: "about",
        label: "About",
        icon: <Info className="h-6 w-6" />,
        content: (
            <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-800">ℹ️ About</h3>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Probabilistic Analysis</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This tool performs <strong>Monte Carlo simulation</strong> to account for uncertainty in soil properties. Each realization randomly samples cohesion (c) and friction angle (Φ) from their specified distributions and computes the Factor of Safety.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Results Dashboard</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li>• <strong>FoS Histogram</strong> — Distribution of computed Factors of Safety across all realizations</li>
                        <li>• <strong>CDF Curve</strong> — Cumulative probability of failure (P<sub>f</sub>)</li>
                        <li>• <strong>Slip Surfaces</strong> — Critical circles for minimum, average, and target FoS</li>
                        <li>• <strong>Parameter Histograms</strong> — Distribution of sampled c and Φ values per layer</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Depth Factor</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        The depth factor <strong>d = D/H</strong> controls whether the critical slip circle is a toe circle (d=0), slope circle, or deep circle (d&gt;0). The value of d=0 means the circle passes through the toe; d=∞ represents deep-seated failures.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Slope Types Supported</h4>
                    <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-4">
                        <li>Soils with Φ = 0 and uniform strength</li>
                        <li>Soils with Φ &gt; 0 and c &gt; 0</li>
                        <li>Infinite slopes with Φ &gt; 0 and c = 0</li>
                        <li>Soils with Φ = 0 and strength increasing with depth</li>
                    </ol>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-xs text-blue-700">
                        <strong>Note:</strong> Chart solutions are based on Janbu's simplified method (1968) as presented in Duncan, Wright & Brandon (2014). Results should be verified with detailed numerical methods for final design.
                    </p>
                </div>
            </div>
        ),
    },
];

export default function SlopeStabilityTool() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <div>Unauthorized</div>;

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToolLayout sidebarItems={slopeSidebarItems}>
                <div>
                    <SlopeStabilityApp />
                </div>
            </ToolLayout>
        </ThemeProvider>
    );
}
